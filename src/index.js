import Emitter from 'socket.io-emitter'
import config from '../config'
//const rosnodejs = require('rosnodejs');
const rosnodejs = require('./services/rosnodejs');

const std_msgs = rosnodejs.require('std_msgs');
const sensors_msgs = rosnodejs.require('sensor_msgs');
const geometry_msg = rosnodejs.require('geometry_msgs');
const mavros_msgs = rosnodejs.require('mavros_msgs');
const nav_msgs = rosnodejs.require('nav_msgs');

const Promise = require('bluebird')
const Redis = require('ioredis')
const uuidv1 = require('uuid/v1');

const redis = new Redis(config.redis)
const sub = new Redis(config.redis)
const pub = new Redis(config.redis)

const NODE_COUNT_KEY = 'rosListeners'
const NODES_INFO_KEY = 'nodes'


const FRAME_GLOBAL_REL_ALT = 3
const MAV_CMD_TAKEOFF = 22
const MAV_CMD_WAYPOINT = 16
const MAV_CMD_NAV_RETURN_TO_LAUNCH = 20
const FRAME_MISSION = 2

const MAV_MODE_FLAG_CUSTOM_MODE_ENABLED	= 1
const MAV_MODE_FLAG_GUIDED_ENABLED = 8
const MAV_MODE_FLAG_STABILIZE_ENABLED = 16
const MAV_MODE_FLAG_MANUAL_INPUT_ENABLED = 64


let nodeId = uuidv1()
let rosNode
let signals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
]

let args = process.argv.slice(2);
let nodeName
if(args[0] === '--publish'){
  nodeName = 'publisher'
} else nodeName = 'subscriber'

signals.forEach(function(sig){process.on(sig, cleanup)});

const nodeInfo = {
  uuid: nodeId,
  copters: []
}


redis.on('connect', function(){
  console.log('Connected to redis, registering with id: ', nodeId);
  redis.get(NODE_COUNT_KEY)
  .then(nodeCount => nodeCount ? Number(nodeCount) : 0)
  .then(nodeCount => {
    console.log('Node count: ' + (nodeCount +1));
    return nodeCount
  })
  .then(nodeCount => redis.set(NODE_COUNT_KEY, nodeCount + 1))
  .then(()=> redis.get(NODES_INFO_KEY))
  .then(nodes => nodes ? JSON.parse(nodes) : [])
  .then(nodes => {
    console.log("Node ID: ", nodeId)
    console.log("Nodes - redis value ", nodes);
    let n = nodes.concat([nodeInfo])
    console.log("Nodes - inserting value ", n);
    return n
  })
  .then(nodes => redis.set(NODES_INFO_KEY, JSON.stringify(nodes)))
  .then(() => {
    console.log('Connected to redis with instance id: ' + nodeId)
    sub.subscribe('copters', 'keepalive')
  })

})

function cleanup(){
  console.log("Closing redis connection for nodeID: ", nodeId);
  redis.get(NODE_COUNT_KEY)
  .then(nodeCount => Number(nodeCount) || 0)
  .then((nodeCount) => {
    console.log("Node Count: " + (nodeCount - 1));
    return nodeCount
  })
  .then((nodeCount) => redis.set(NODE_COUNT_KEY, nodeCount ?  nodeCount - 1 : 0))
  .then(() => redis.get(NODES_INFO_KEY))
  .then((nodes) => {
    console.log(nodes);
    return nodes
  })
  .then((nodes) => nodes ? JSON.parse(nodes) : [])
  .then(nodes => {
    console.log("Node ID: ", nodeId)
    console.log("Nodes - redis value ", nodes);
    let node = nodes.findIndex(n => n.uuid === nodeId)
    console.log(node)
    if(!!~node){
      nodes.splice(node, 1)
    }
    console.log("Nodes - inserting value: ", nodes);
    return nodes
  })
  .then(nodes => redis.set(NODES_INFO_KEY, JSON.stringify(nodes)))
  .then(() => console.log("Redis cleaned, quitting"))
  .catch((err) => {
    console.log(err)
    throw err
  })
}

function onRedisMessage(channel, _msg){
  let msg = JSON.parse(_msg)
  console.log('Received message: ', msg);
  console.log('Node Id: ', nodeId)
  if(channel === 'keepalive' && msg === 'ack'){
    pub.publish(NODES_INFO_KEY, JSON.stringify(nodeInfo))
  }
  if(channel === 'copters' && msg.uuid === nodeId && msg.action === 'connect'){
    connetToCopter(msg.copterId)
    .then(() => {
      nodeInfo.copters.push(msg.copterId)
    })
    .then(()=> redis.get(NODES_INFO_KEY))
    .then(JSON.parse)
    .then((nodes) => {
      let node = nodes.findIndex(n => n.uuid === nodeId)
      if(!!~node){
        nodes.splice(node, 1, nodeInfo)
      } else {
        nodes.push(nodeInfo)
      }
      return nodes
    })
    .then((nodes) => redis.set(NODES_INFO_KEY, JSON.stringify(nodes)))
  }
  if(channel === 'copters' && msg.uuid === nodeId && msg.action === 'disconnect'){
    disconnetFromCopter(msg.copterId)
    .then(() => {
      let cop = nodeInfo.copters.findIndex(c => c === msg.copterId)
      if(!!~cop){
        nodeInfo.copters.splice(cop, 1)
      }
    })
    .then(()=> redis.get(NODES_INFO_KEY))
    .then((list) => list ? JSON.parse(list) : [])
    .then((list) => {
      node = nodes.find(n => n.uuid === nodeId)
      if(node){
        nodes.splice(node, 1, nodeInfo)
      } else {
        nodes.push(nodeInfo)
      }
      return nodes
    })
    .then((list) => redis.set(NODES_INFO_KEY, JSON.stringify(list)))
    .then((list) => copterList.length && !!~copterList.indexOf(copterId) ? [] : copterList.splice(copterList.indexOf(copterId), 1))
  }
}

const onBatteryUpdate = (copterId) => (data) => {
  battPercentage = data.percentage
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/battery`, data)
  //debugMessage(`/${copterId}/battery`, data)
}

const onGlobalPositionGlobalUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/global`, data)
  //debugMessage(`/${copterId}/global_position/global`, data)
  //update()
}
const onGlobalPositionLocalUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/local`, data)
  //debugMessage(`/${copterId}/global_position/local`, data)
}
const onRelativeAltitudeUpdate = (copterId) => ({data}) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/rel_alt`, data)
  copters[copterId].info.altitude = data
  //debugMessage(`/${copterId}/global_position/rel_alt`, data)
}
const onStateUpdate = (copterId) => ({ connected, armed, guided, mode, system_status }) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/state`, { connected, armed, guided, mode, system_status })
  const info = copters[copterId].info
  copters[copterId].info = { ...info, connected, armed, guided, mode, system_status }
  //debugMessage(`/${copterId}/state`, { connected, armed, guided, mode, system_status })
}
const onGpsVelUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/gps_vel`, data)
  //debugMessage(`/${copterId}/global_position/raw/gps_vel`, data)
}
const debugMessage = (topic, data) => {
  console.log('Topic: ' + topic, JSON.stringify(data, null, 2))
}
const onWaypointList = (copterId) => (data) => {
  debugMessage(`/${copterId}/mission/waypoints`, data)
}
const onWaypointReached = (copterId) => (data) => {
  debugMessage(`/${copterId}/mission/reached`, data)
}
const seGuidedMode = (copterId) => {
  const node = getRosNode(copterId)
  const modeClient = node.serviceClient(`/${copterId}/set_mode`, 'mavros_msgs/SetMode');
  return modeClient.call({
    base_mode:
      MAV_MODE_FLAG_CUSTOM_MODE_ENABLED | MAV_MODE_FLAG_GUIDED_ENABLED | MAV_MODE_FLAG_STABILIZE_ENABLED | MAV_MODE_FLAG_MANUAL_INPUT_ENABLED,
    custom_mode: 'GUIDED'
  })
}
const armThrottle = (copterId) => {
  const node = getRosNode(copterId)
  const armClient = node.serviceClient(`/${copterId}/cmd/arming`, 'mavros_msgs/CommandBool');
  seGuidedMode(copterId).then(() => copters[copterId].info.armed ? Promise.resolve() : armClient.call({value: true}))
}

const landCopter = (copterId) => {
  const node = getRosNode(copterId)
  const landClient = node.serviceClient(`/${copterId}/cmd/land`, 'mavros_msgs/CommandTOL');
  const {latitude, longitude} = copters[copterId].info
  return landClient.call({min_pitch: 1, yaw: 1, latitude, longitude, altitude: 0})
}
const getHeader = () => ({
  "seq": 387999,
  "stamp": {
    "secs": Math.round(new Date().getTime() / 1000),
    "nsecs": 562934408
  },
  "frame_id": ""
})
const getRosNode = (copterId) => {
  return rosNode
}
const armAndTakeoff = (copterId, latitude, longitude, altitude) => {
  const node = getRosNode(copterId)
  const takeoffClient = node.serviceClient(`/${copterId}/cmd/takeoff`, 'mavros_msgs/CommandTOL');
  return new Promise((resolve, reject) =>
    // arming throttle
    copters[copterId].info.armed ? resolve({success: true}) : armThrottle(copterId)
  )
  .then((res) => {
    if(res.success){
      // wait 1 sec
      console.log('Copter armed, taking off');
      return Promise.delay(1000).then(()=> seGuidedMode(copterId))
    }
    throw new Error('Arm failed')
  })
  .then(() =>  takeoffClient.call({min_pitch: 1, yaw: 1, latitude, longitude, altitude}))
}


const land = (copterId, latitude, longitude, altitude) => {
  const node = getRosNode()
  if(!node){
    throw new Error('Ros not connected')
  }
  const landClient = node.serviceClient(`/${copterId}/cmd/land`, 'mavros_msgs/CommandTOL');
  landClient.call({min_pitch: 1, yaw: 1, latitude, longitude, altitude})

}

const sendCmdVel = (copterId, setVelPub, linear={x:0, y:0, z:0}, angular={x:0, y:0, z:0}) => {

  
  //const setAngPub = node.advertise(`/${copterId}/setpoint_attitude/cmd_vel`, 'geometry_msgs/TwistStamped');
  //console.log('Publishing', {twist: { linear: { x, y, z }, angular: { x: 60, y: 0, z: 0} }});
  console.log(setVelPub)
  setVelPub.publish({
    header: getHeader(),
    twist: { linear, angular }
  })
  /*
  setAngPub.publish({
    header: getHeader(),
    twist: { linear: { x, y, z }, angular: { x, y, z} }
  })
  */

}


const onCmdVelReceived = (copterId, setVelPub) => (topic, message) => {
  let data = JSON.parse(message)
  sendCmdVel(copterId, setVelPub, data.linear, data.angular)
}
const onCmdReceived = (copterId) => (topic, message) => {
  let data = JSON.parse(message)
  console.log(data);
  switch (data.cmd) {
    case 'ARM':
      armThrottle(copterId)
      break;
    case 'TAKEOFF':
      armAndTakeoff(copterId, data.latitude, data.longitude, data.altitude)
      break;
    case 'LAND':
      land(copterId, data.latitude, data.longitude, data.altitude)
      break;
    default:

  }
}
console.log(config.redis)
const emitter = Emitter(config.redis)

const copters = {}
const coptersList = []

const disconnetFromCopter = () => Promise.resolve()
const connetToCopter = (copterId) => {
  let cmdVelSub = new Redis(config.redis)
  let copterSub = new Redis(config.redis)
  let geoFenceSub = new Redis(config.redis)
  
  if(copters[copterId]){
    return Promise.resolve()
  }
  copters[copterId] = {
    info: {
        connected: true,
        guided: true,
        armed: true,
        system_status: -1,
        altitude: 0,
        latitude: 0,
        longitude: 0
    }
  }
  coptersList.push(copterId)
  let options = {
    udp: true,
    tcp: false,
    dgramSize: 1500,
    udpFirst: true
  }
  rosNode.subscribe(`/${copterId}/battery`, sensors_msgs.msg.BatteryState, onBatteryUpdate(copterId), options);
  rosNode.subscribe(`/${copterId}/state`, mavros_msgs.msg.State, onStateUpdate(copterId));
  rosNode.subscribe(`/${copterId}/global_position/global`, sensors_msgs.msg.NavSatFix, onGlobalPositionGlobalUpdate(copterId), options);
  rosNode.subscribe(`/${copterId}/global_position/local`, nav_msgs.msg.Odometry, onGlobalPositionLocalUpdate(copterId), options);
  rosNode.subscribe(`/${copterId}/global_position/rel_alt`, std_msgs.msg.Float64, onRelativeAltitudeUpdate(copterId), options);
  //rosNode.subscribe(`/${copterId}/mission/reached`, mavros_msgs.msg.WaypointReached, onWaypointReached(copterId), options);
  //rosNode.subscribe(`/${copterId}/mission/waypoints`, mavros_msgs.msg.WaypointList, onWaypointList(copterId));
  //rosNode.subscribe(`/${copterId}/global_position/raw/gps_vel`, geometry_msg.msg.TwistStamped, onGpsVelUpdate(copterId));
  // TODO: save ref and destroy on disconnect
  console.log('Subscrbing to redis', `/${copterId}`, `/${copterId}/cmd_vel`);
  const setVelPub = rosNode.advertise(`/${copterId}/setpoint_velocity/cmd_vel`, 'geometry_msgs/TwistStamped')
  console.log(setVelPub)
  copterSub.subscribe(`/${copterId}`)
  copterSub.on('message', onCmdReceived(copterId))
  cmdVelSub.subscribe(`/${copterId}/cmd_vel`)
  cmdVelSub.on('message', onCmdVelReceived(copterId, setVelPub))

  //return armAndTakeoff(copterId, 37.527337, 15.112690, 40)
  
  return Promise.resolve()

}

rosnodejs.initNode(`/${nodeId.replace(/-/g, '_')}`, {

})
.then((client) => {
  console.log("Connected to ros, Waiting for connection request");
  rosNode = client
})

sub.on('message', onRedisMessage)

let battPercentage=0, lat=0, lng=0, alt=0

function update(){
  console.log(`Battery: ${Math.round(battPercentage * 100)}%, Lat: ${lat}, Lng: ${lng}, Altitude: ${alt}`)
}
