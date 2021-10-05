import { node } from 'rosnodejs/dist/lib/ThisNode';
import Emitter from 'socket.io-emitter'
import config from '../config'
import {createVideoRoom, createVideoStream, deleteVideoRoom, deleteVideoStream} from './services/janus'
import Copter from './services/aviot'

import Logger from './services/log'
const rosnodejs = require('./services/rosnodejs/dist');
const Promise = require('bluebird')
const Redis = require('ioredis')
const uuidv1 = require('uuid/v1');

// main publisher subscriber
let redis
let sub
let pub

// redis key names
const NODE_COUNT_KEY = 'rosListeners'
const NODES_INFO_KEY = 'nodes'

// generate redis / ros node id
let nodeId = uuidv1()
let rosNode

// configure logger
const logger = Logger.child({ service: `ros-node`, uuid: nodeId})


// handled signals
let signals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
]

// redis node informations
const nodeInfo = {
  uuid: nodeId,
  copters: []
}

const onRedisConnect = async () => {
  logger.debug(`Connecting to redis with instance id: ${nodeId}`);
  
  // set nodecount to 1 (single instance mode)
  await redis.incr(NODE_COUNT_KEY)
  await redis.set(NODE_COUNT_KEY, 1)
  
  let nodes = await redis.get(NODES_INFO_KEY).then(n => n ? JSON.parse(n) : [])
  
  logger.debug(`Online nodes: ${JSON.stringify(nodes, null, 2)}`);
  

  // (single instance mode)
  // If there is a node in the nodes list, it must be a previous
  // crashed instance of rosnodejs.
  // Then we have to retrieve the copter list and connect
  // to each copter of the list.
  if (nodes.length>0) {
    logger.debug(`Found a node of a previous instance of rosnodejs: ${nodes[0].uuid}`)
    for (const copterId of nodes[0].copters) {
      // connecting to copter
      logger.debug(`Connecting to copter: ${copterId}`)
      let res = await connetToCopter(copterId)
      if(!res)
        logger.error(`Unable to connect to copter with id: ${copterId}`)
      else
        nodeInfo.copters.push(copterId)
    }
  }


  // overwrite nodes (single instance mode)
  //nodes = nodes.concat([nodeInfo])
  nodes = [ nodeInfo ]

  await redis.set(NODES_INFO_KEY, JSON.stringify(nodes))
  logger.debug(`Connected to redis with instance id: ${nodeId}`)
  sub.subscribe('copters', 'keepalive')
  
}

const cleanup = async() => {


  logger.debug(`Closing redis connection for node: ${nodeId}`);

  const nodeCount = await redis.get(NODE_COUNT_KEY).then(n => Number(n) || 0)
  await redis.set(NODE_COUNT_KEY, nodeCount ?  nodeCount - 1 : 0)

  const nodes = await redis.get(NODES_INFO_KEY).then((n) => n ? JSON.parse(n) : [])
  logger.debug("Nodes - redis value ", nodes);
  
  let node = nodes.findIndex(n => n.uuid === nodeId)
  if(!!~node){
    nodes.splice(node, 1)
  }
  logger.debug("Nodes - inserting value: ", nodes)
  
  await redis.set(NODES_INFO_KEY, JSON.stringify(nodes))
  logger.debug("Redis cleaned, quitting")
  
}

const onRedisMessage = async (channel, _msg) => {

  try{
    const { copterId, action, uuid } = JSON.parse(_msg)
    
    if(uuid !== nodeId){
      return null
    }

    logger.debug(`NodeId: ${nodeId}, Received message:  ${_msg}`);

    // case: keep alive message
    if(channel === 'keepalive' && action === 'ack'){
      pub.publish(NODES_INFO_KEY, JSON.stringify(nodeInfo))
    }

    // case: connect
    if(channel === 'copters' && action === 'connect'){
      // connecting to copter
      let res = await connetToCopter(copterId)
      if(!res){
        throw new Error(`Unable to connect to copter with id: ${copterId}`)
      }
      
      nodeInfo.copters.push(copterId)
      // add copter to node's copter list
      let nodes = await redis.get(NODES_INFO_KEY).then(JSON.parse)
      !!~nodes.findIndex(n => n.uuid === nodeId) ? nodes.splice(node, 1, nodeInfo) : nodes.push(nodeInfo)
      await redis.set(NODES_INFO_KEY, JSON.stringify(nodes))
      
    }
    
    // case: disconnect
    if(channel === 'copters' && action === 'disconnect'){
      //disconnect from copter
      let res = await disconnetFromCopter(copterId)
      if(!res){
        throw new Error(`Unable to disconnect from copter with id: ${copterId}`)
      }
      let cop = nodeInfo.copters.findIndex(c => c === copterId)
      if(!!~cop){
        nodeInfo.copters.splice(cop, 1)
      }
      // remove copter from node's copter list
      let nodes = await redis.get(NODES_INFO_KEY).then(JSON.parse)
      nodes.find(n => n.uuid === nodeId) ? nodes.splice(node, 1, nodeInfo) : nodes.push(nodeInfo)
      await redis.set(NODES_INFO_KEY, JSON.stringify(nodes))
      
      
    }
  }catch(err){
    console.error(`An error occurred in redis message handler: ${err.message}`, err)
  }
}

const onBatteryUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/battery`, data)
  //debugMessage(`/${copterId}/battery`, data)
}

const onGlobalPositionGlobalUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/global`, data)
  //debugMessage(`/${copterId}/global_position/global`, data)
}
const onMissionWaypointsUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/mission/waypoints`, data)
}
const onMissionWaypointsRealUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/mission/waypoints_real`, data)
}
const onGlobalPositionLocalUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/local`, data)
  //debugMessage(`/${copterId}/global_position/local`, data)
}
const onRelativeAltitudeUpdate = (copterId) => ({data}) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/rel_alt`, data)
  //debugMessage(`/${copterId}/global_position/rel_alt`, data)
}
const onCompassUpdate = (copterId) => ({data}) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/compass_hdg`, data)
  //debugMessage(`/${copterId}/global_position/compass_hdg`, data)
}
const onVolumeUpdate = (copterId) => ({data}) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/volume`, data)
}
const onStateUpdate = (copterId) => ({ connected, armed, guided, mode, system_status }) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/state`, { connected, armed, guided, mode, system_status })
}
const onGpsVelUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/gps_vel`, data)
  //debugMessage(`/${copterId}/global_position/raw/gps_vel`, data)
}
const debugMessage = (topic, data) => {
  logger.debug('Topic: ' + topic, JSON.stringify(data, null, 2))
}

const onCmdReceived = (copterId) => (topic, message) => {
  let data = JSON.parse(message)
  const copter = copters[copterId]
  logger.debug(data);
  switch (data.cmd) {
    case 'ARM':
      copter.armThrottle()
      break;
    case 'TAKEOFF':
      copter.armAndTakeoff(data.latitude, data.longitude, data.altitude)
      break;
    case 'LAND':
      copter.land(data.latitude, data.longitude, data.altitude)
      break;
    default:

  }
}

const onCmdVelReceived = (copterId) => (topic, message) => {
  let data = JSON.parse(message)
  copters[copterId].sendCmdVel(data.linear, data.angular);
}

const onStreamingCmd = (copterId) => async (topic, message) => {

  let { action } = JSON.parse(message)
  const copter = copters[copterId]
  
  if(action === 'start'){

    let { data } = await createVideoStream(copterId)
    copter.startStreaming(data)
    emitter.to(`copter_${copterId}`).emit(`/${copterId}/streaming`, {...data, action })
    
  } else if (action === 'stop') {
    
    let feedId = copters[copterId].streamingFeed
    copter.stopStreaming()
    emitter.to(`copter_${copterId}`).emit(`/${copterId}/streaming`, { action })
    deleteVideoStream(feedId)
  
  } else {
    logger.debug('Action not found')
  }

}

const onVideoRoomCmd = (copterId) => async (topic, message) => {
  
  const { action } = JSON.parse(message)
  const copter = copters[copterId]

  if(action === 'start'){
    let { data } = await createVideoRoom(copterId)
    await copter.startVideoRoom(data)
    emitter.to(`copter_${copterId}`).emit(`/${copterId}/video_room`, { ...data, action })
    
  } else if (action === 'stop') {
    await copter.stopVideoRoom()
    emitter.to(`copter_${copterId}`).emit(`/${copterId}/video_room`, { action: 'stop' })
  
  } else {
    logger.debug('Action not found')
  }
}

const onModeCmd = (copterId) => async (topic, message) => {
  let { data } = JSON.parse(message)
  copters[copterId].setMode(data.base_mode, data.custom_mode);

}
const onStreamRateCmd = (copterId) => async (topic, message) => {
  let { data } = JSON.parse(message)
  copters[copterId].setStreamRate(data.stream_id, data.message_rate, data.on_off);
}


const onGeoFence = (copterId) => async (topic, message) => {
  const { action, data } = JSON.parse(message)
  const copter = copters[copterId]
  let res = undefined
  
  if(action === 'set'){
    // data: { mode: 'ALLOW' | 'DENY', geometry: [{ x, y, z}]}
    const { mode, points, frame } = data
    res = await copter.setFence(mode, points, frame)
    
  } else if ( action === 'delete'){
    // data: { fenceId }
    let { fenceId } = data
    res = await copter.deleteFence(fenceId)

  } else if (action === 'reset'){
    res = await copter.resetFence()
  
  } else if ( action === 'get'){
    let { fenceId, frame } = data
    res = await copter.getFence(fenceId,frame)

  } else if (action === 'list'){
    res = await copter.listFence()
  
  }
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/fence`, { action, data, res })
}

const onMission = (copterId) => async (topic, message) => {
  const { action, data } = JSON.parse(message)
  const copter = copters[copterId]
  let res = undefined
  
  if(action === 'pull'){
    res = await copter.missionPull()
  } else if ( action === 'push'){
    let { waypoints } = data
    res = await copter.missionPush(waypoints)
  } else if (action === 'clear'){
    res = await copter.missionClear()
  } else if ( action === 'set_current'){
    res = await copter.missionSetCurrent()
  }
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/mission`, { action, data, res })
}

const onServo = (copterId) => async (topic, message) => {
  const { action, data } = JSON.parse(message)
  const copter = copters[copterId]
  let res = undefined
  
  if(action === 'open'){
    const { number } = data
    res = await copter.servoOpen(number)
  } else if ( action === 'close'){
    const { number } = data
    res = await copter.servoClose(number)
  }
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/servo`, { action, data, res })
}

const onVolume = (copterId) => async (topic, message) => {
  let { data } = JSON.parse(message)
  copters[copterId].setVolume(data.volume);

}

const onRttTestCmd = (copterId) => (topic, message) => {
  let data = JSON.parse(message)
  logger.debug(`rtt_test: ${data.frontendId} ${Date.now()}`)
  const copter = copters[copterId]
  copter.rttTest(data)
}
const onRttRespUpdate = (copterId) => (message) => {
  let data;
  try {
    data = JSON.parse(message.data)
  }
  catch (error) {
    logger.error('rtt_resp: Failed to parse payload.')
  }
  if (data) {
    logger.debug(`rtt_resp: ${data.frontendId} ${Date.now()}`)
    emitter.to(`copter_${copterId}`).emit(`/${copterId}/rtt_resp`, data)
  }
}


logger.debug(config.redis)
const emitter = Emitter(config.redis)

const copters = {}
const coptersList = []

const disconnetFromCopter = () => Promise.resolve()
const connetToCopter = (copterId) => {

  if(copters[copterId]){
    return Promise.resolve()
  }

  let cmdVelSub = new Redis(config.redis)
  let copterSub = new Redis(config.redis)
  let streamingSub = new Redis(config.redis)
  let videoRoomSub = new Redis(config.redis)
  let modeSub = new Redis(config.redis)
  let streamRateSub = new Redis(config.redis)
  let geoFenceSub = new Redis(config.redis)
  let missionSub = new Redis(config.redis)
  let servoSub = new Redis(config.redis)
  let volumeSub = new Redis(config.redis)
  let rttTestSub = new Redis(config.redis)

  
  let copter = new Copter(rosNode, copterId)
  copters[copterId] = copter
  coptersList.push(copterId)
  
  copter.addListener('state', onStateUpdate(copterId))
  copter.addListener('battery', onBatteryUpdate(copterId))
  copter.addListener('global_position/global', onGlobalPositionGlobalUpdate(copterId))
  copter.addListener('global_position/rel_alt', onRelativeAltitudeUpdate(copterId))
  copter.addListener('global_position/compass_hdg', onCompassUpdate(copterId))
  copter.addListener('volume', onVolumeUpdate(copterId))
  copter.addListener('mission/waypoints', onMissionWaypointsUpdate(copterId))
  copter.addListener('mission/waypoints_real', onMissionWaypointsRealUpdate(copterId))
  copter.addListener(`rtt_resp`, onRttRespUpdate(copterId));

  // copter commands
  const setVelPub = rosNode.advertise(`/${copterId}/setpoint_attitude/cmd_vel`, 'geometry_msgs/TwistStamped')
  cmdVelSub.subscribe(`/${copterId}/cmd_vel`)
  cmdVelSub.on('message', onCmdVelReceived(copterId, setVelPub))

  // arm - takeoff - land
  copterSub.subscribe(`/${copterId}`)
  copterSub.on('message', onCmdReceived(copterId))

  // streaming
  streamingSub.subscribe(`/${copterId}/streaming`)
  streamingSub.on('message', onStreamingCmd(copterId))

  // video room
  videoRoomSub.subscribe(`/${copterId}/video_room`)
  videoRoomSub.on('message', onVideoRoomCmd(copterId))

  // set mode
  modeSub.subscribe(`/${copterId}/mode`)
  modeSub.on('message', onModeCmd(copterId))

  // set stream rate
  streamRateSub.subscribe(`/${copterId}/stream_rate`)
  streamRateSub.on('message', onStreamRateCmd(copterId))

  // rtt test
  rttTestSub.subscribe(`/${copterId}/rtt_test`)
  rttTestSub.on('message', onRttTestCmd(copterId))

  //goe fence
  geoFenceSub.subscribe(`/${copterId}/fence`)
  geoFenceSub.on('message', onGeoFence(copterId))

  //mission
  missionSub.subscribe(`/${copterId}/mission`)
  missionSub.on('message', onMission(copterId))

  //servo
  servoSub.subscribe(`/${copterId}/servo`)
  servoSub.on('message', onServo(copterId))

  //volume
  volumeSub.subscribe(`/${copterId}/volume`)
  volumeSub.on('message', onVolume(copterId))

  return true

}

// configure signals handler
signals.forEach(function(sig){process.on(sig, cleanup)});


(async () => {
  // init ros
  rosNode = await rosnodejs.initNode(`/${nodeId.replace(/-/g, '_')}`, {})
  
  // configure main publisher subscriber
  redis = new Redis(config.redis)
  sub = new Redis(config.redis)
  pub = new Redis(config.redis)

  redis.on('connect', onRedisConnect)

  // subscribe to redis
  sub.on('message', onRedisMessage)
})()

