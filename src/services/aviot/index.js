import events from 'events'
import Logger from '../log'

const rosnodejs = require('rosnodejs');

const std_msgs = rosnodejs.require('std_msgs');
const sensors_msgs = rosnodejs.require('sensor_msgs');
const geometry_msg = rosnodejs.require('geometry_msgs');
const mavros_msgs = rosnodejs.require('mavros_msgs');
const nav_msgs = rosnodejs.require('nav_msgs');
const aviot_srvs = rosnodejs.require('aviot_srvs')

const Promise = require('bluebird')

const MAV_MODE_FLAG_CUSTOM_MODE_ENABLED = 1
const MAV_MODE_FLAG_GUIDED_ENABLED = 8
const MAV_MODE_FLAG_STABILIZE_ENABLED = 16
const MAV_MODE_FLAG_MANUAL_INPUT_ENABLED = 64

// geofence

const MODE_DENY = 0
const MODE_ALLOW = 1
const FRAME_GLOBAL = 0
const FRAME_LOCAL_NED = 1
const FRAME_LOCAL_ENU = 4
const FRAME_GLOBAL_INT = 5
const FRAME_LOCAL_OFFSET_NED = 7
const E_INVALID_POLYGON = -1
const E_INVALID_MODE = -2
const E_INVALID_FRAME = -3


let seq = 0

class Copter {
  evntEmitter
  rosnode

  // copter infos
  copterId
  armed = false
  connected = false
  guided = false
  manual_input = true
  mode = 'STABILIZE'
  system_status = 0
  
  // service clients
  modeClient;
  armClient;
  landClient;
  setVelPub;
  startStreamingPub;
  stopStreamingPub;
  startVideoRoomPub;
  stopVideoRoomPub;
  rttTestPub;
  takeoffClient;
  setFenceClient;
  delFenceClient;
  resetFenceClient;
  logger;
  videoroom = undefined
  streamingFeed = undefined
  constructor(rosnode, copterId, coonnectionOptions) {
    
    this.logger = Logger.child({ service: `copter:${copterId}`})
    this.logger.info('Init new copter - copterId: ' + copterId)
    
    let options = coonnectionOptions || {
      transports: ["UDPROS"],
      dgramSize: 1500,
      udpFirst: true
    }
    this.eventEmitter = new events.EventEmitter();

    this.rosnode = rosnode
    this.copterId = copterId

    // mavros services 
    this.modeClient = rosnode.serviceClient(`/${copterId}/set_mode`, 'mavros_msgs/SetMode')
    this.armClient = rosnode.serviceClient(`/${copterId}/cmd/arming`, 'mavros_msgs/CommandBool');
    this.landClient = rosnode.serviceClient(`/${copterId}/cmd/land`, 'mavros_msgs/CommandTOL')
    this.takeoffClient = rosnode.serviceClient(`/${copterId}/cmd/takeoff`, 'mavros_msgs/CommandTOL');
    this.setFenceClient = rosnode.serviceClient(`/${copterId}/fence/set`, 'aviot_srvs/SetFence');
    this.delFenceClient = rosnode.serviceClient(`/${copterId}/fence/delete`, 'aviot_srvs/DeleteFence');
    this.resetFenceClient = rosnode.serviceClient(`/${copterId}/fence/reset`, 'aviot_srvs/ResetFence')
    this.getFenceClient = rosnode.serviceClient(`/${copterId}/fence/get`, 'aviot_srvs/GetFence');
    this.listFenceClient = rosnode.serviceClient(`/${copterId}/fence/list`, 'aviot_srvs/ListFence');
    // copter information
    rosnode.subscribe(`/${copterId}/battery`, sensors_msgs.msg.BatteryState, this.emit('battery'), options);
    rosnode.subscribe(`/${copterId}/state`, mavros_msgs.msg.State, this.emit('state'));
    rosnode.subscribe(`/${copterId}/global_position/global`, sensors_msgs.msg.NavSatFix, this.emit('global_position/global'), options);
    rosnode.subscribe(`/${copterId}/global_position/local`, nav_msgs.msg.Odometry,  this.emit('global_position/local'), options);
    rosnode.subscribe(`/${copterId}/global_position/rel_alt`, std_msgs.msg.Float64,  this.emit('global_position/rel_alt'), options);
    rosnode.subscribe(`/${copterId}/rtt_resp`, 'std_msgs/String',  this.emit('rtt_resp'), options);
    
    // copter commands
    this.setVelPub = rosnode.advertise(`/${copterId}/setpoint_attitude/cmd_vel`, 'geometry_msgs/TwistStamped')
    
    // streaming
    this.startStreamingPub = rosnode.advertise(`/${copterId}/start_video_streaming`, 'std_msgs/String')
    this.stopStreamingPub = rosnode.advertise(`/${copterId}/stop_video_streaming`, 'std_msgs/String')
    
    // video room
    this.startVideoRoomPub = rosnode.advertise(`/${copterId}/start_video_room`, 'std_msgs/String')
    this.stopVideoRoomPub = rosnode.advertise(`/${copterId}/stop_video_room`, 'std_msgs/String')

    // rtt test
    this.rttTestPub = rosnode.advertise(`/${copterId}/rtt_test`, 'std_msgs/String')

    return true
  }

  emit = (event) => (data) => {
    //this.logger.debug(`event: ${event}, data:${JSON.stringify(data, null, 2)}`)
    this.eventEmitter.emit(event, data)
  }

  onStateUpdate(state){
    this.connected = state.connected
    this.armed = state.armed
    this.guided = state.guided
    this.mode = state.mode
    this.manual_input = state.manual_input
    this.system_status = state.system_status
    // emitting event
    this.emit('state')(state)
  }
  addListener(event, fn){
    this.logger.debug(`Adding listener for event: ${event}`)
    this.eventEmitter.addListener(event, fn)
  }
  removeListener(event, fn){
    this.logger.debug(`Removing listener for event: ${event}`)
    this.eventEmitter.removeListener(event, fn)
  }
  setGuidedMode() {
    this.logger.debug(`Setting guided mode`)
    return this.modeClient.call({
      base_mode:
        MAV_MODE_FLAG_CUSTOM_MODE_ENABLED | MAV_MODE_FLAG_GUIDED_ENABLED | MAV_MODE_FLAG_STABILIZE_ENABLED | MAV_MODE_FLAG_MANUAL_INPUT_ENABLED,
      custom_mode: 'GUIDED'
    })
  }

  async armThrottle(force) {
    this.logger.debug(`Arming throttle`)
    await this.setGuidedMode()
    if(!this.armed || force){
      await this.armClient.call({ value: true })
    }
    return true
  }

  getHeader = () => ({
    "seq": ++seq,
    "stamp": {
      "secs": Math.round(new Date().getTime() / 1000),
      "nsecs": process.hrtime()[1]
    },
    "frame_id": ""
  })

  async armAndTakeoff (latitude, longitude, altitude){
    this.logger.debug(`Arm and take off - moving to ${JSON.stringify({ latitude, longitude, altitude }, null, 2)}`,)
    if(!this.armed){
      await this.armThrottle()
    }
    await Promise.delay(1000)
    await this.setGuidedMode()
    await this.takeoffClient.call({ min_pitch: 1, yaw: 1, latitude, longitude, altitude })
    return true
  }

  async land(latitude, longitude, altitude){
    this.logger.debug(`Landing: ${JSON.stringify({ latitude, longitude, altitude }, null, 2)}`,)
    await this.landClient.call({  min_pitch: 1, yaw: 1, latitude, longitude, altitude })
    return true
  }
  
  sendCmdVel(linear = { x: 0, y: 0, z: 0 }, angular = { x: 0, y: 0, z: 0 }){
    this.setVelPub.publish({
      header: this.getHeader(),
      twist: { linear, angular }
    })
  }

  startVideoRoom(data){
    this.videoroom = data.videoroom_name
    this.logger.debug(`Staring video room - video room name: ${this.videoroom}`,)
    this.startVideoRoomPub.publish({
      header: this.getHeader(),
      data: JSON.stringify(data)
    })
  }

  stopVideoRoom(){
    this.logger.debug(`Stopping video room - video room name: ${this.videoroom}`,)
    if(!this.videoroom){
      return
    }
    this.stopVideoRoomPub.publish({
      header: this.getHeader(),
      data: JSON.stringify({videoroom_name: this.videoroom})
    })
    this.videoroom = undefined
  }

  startStreaming(data){

    this.streamingFeed = data.janus_feed_id
    this.logger.debug(`Staring streaming - feed id: ${this.streamingFeed}`,)
    this.startStreamingPub.publish({
      header: this.getHeader(),
      data: JSON.stringify(data)
    })
  }

  stopStreaming(){
    if(!this.streamingFeed){
      return
    }
    this.logger.debug(`Stopping streaming - feed id: ${this.streamingFeed}`,)
    this.stopStreamingPub.publish({
      header: this.getHeader(),
      data: JSON.stringify({ janus_feed_id: this.streamingFeed })
    })
    this.streamingFeed = undefined
  }

  rttTest(data){
    this.rttTestPub.publish({
      header: this.getHeader(),
      data: JSON.stringify(data)
    })
  }

  /**
   * 
   * @param {enum} mode 
   * @param {Array} points
   * @param {number} points.x 
   */
  setFence(mode, points, frame){
    this.logger.debug(`Setting fence - mode: ${mode}, Geometry: ${JSON.stringify(points, null, 2)}`)
    return this.setFenceClient.call({
      mode: (mode === 'ALLOW' ? MODE_ALLOW : MODE_DENY) | FRAME_GLOBAL,
      points,
      frame
    })
  }

  deleteFence(fenceId){
    this.logger.debug(`Deleting fence - fence id: ${fenceId}`)
    return this.delFenceClient.call({
      polygon_id: fenceId
    })
  }
  resetFence(){
    this.logger.debug(`Reset fence`)
    return this.resetFenceClient.call({})
  }
  getFence(fenceId, frame){
    this.logger.debug(`Getting fence - fence id: ${fenceId}`)
    return this.getFenceClient.call({
      polygon_id: fenceId,
      frame
    })
  }
  listFence(){
    this.logger.debug(`List fence`)
    return this.listFenceClient.call({})
  }
}

export default Copter
