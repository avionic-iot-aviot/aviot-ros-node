import Emitter from 'socket.io-emitter'
import config from '../config'
const rosnodejs = require('rosnodejs');
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


let nodeId = uuidv1()
let rosNode
let signals = ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
]
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

const onRelativeAltitudeUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/rel_alt`, data)
  //debugMessage(`/${copterId}/global_position/rel_alt`, data)
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
const armAndTakeoff = (copterId, latitude, longitude, altitude) => {
  console.log("Arming " + copterId)
  let node = copters[copterId]
  // mode and arm service
  const modeClient = node.serviceClient(`/${copterId}/set_mode`, 'mavros_msgs/SetMode');
  const armClient = node.serviceClient(`/${copterId}/cmd/arming`, 'mavros_msgs/CommandBool');

  // land service
  const landClient = node.serviceClient(`/${copterId}/cmd/land`, 'mavros_msgs/CommandTOL');

  // takeoff service
  const takeoffClient = node.serviceClient(`/${copterId}/cmd/takeoff`, 'mavros_msgs/CommandTOL');

  // mission services
  const missionPullClient = node.serviceClient(`/${copterId}/mission/pull`, 'mavros_msgs/WaypointPull');
  const missionPushClient = node.serviceClient(`/${copterId}/mission/push`, 'mavros_msgs/WaypointPush');

  // publisher
  const setPaPub = node.advertise(`/${copterId}/setpoint_raw/global`, 'mavros_msgs/GlobalPositionTarget');
  const setVelPub = node.advertise(`/${copterId}/setpoint_attitude/cmd_vel`, 'geometry_msgs/TwistStamped');

  modeClient.call({
    base_mode: 216,
    custom_mode: 'GUIDED'
  })
  .then((data) => {
    console.log(data)
    return Promise.delay(10000).then(() => data)
    //return data
  })

  .then(({mode_sent}) => mode_sent ? armClient.call({value: true}) : ({success: true}))
  .then(({success}) => {
    console.log('Arming status: ' + success)
    if(success){
      console.log('Taking off');
      //return {success: true}
      return Promise.delay(5000).then(() => success) //.then(() => takeoffClient.call({min_pitch: 1, yaw: 1, latitude, longitude, altitude}))
    }
    else {
      return { success: false}
    }
  })

  .then(async (success) => {
    console.log("Sending attitude")

    let msgAtt = {
      header: {
        "seq": 387999,
        "stamp": {
          "secs": Math.round(new Date().getTime() / 1000),
          "nsecs": 562934408
        },
        "frame_id": ""
      },
      coordinate_frame: 5,
      type_mask: 4088,
      latitude,
      longitude,
      altitude,
      velocity: {
        x: 1,
        y: 1,
        z: 0
      },
      acceleration_or_force: {
        x: 1,
        y: 1,
        z: 0
      }
    }
    //await setPaPub.publish(msgAtt)


    let mission = await missionPushClient.call({
      start_index: 0,
      waypoints: [{
        frame: FRAME_GLOBAL_REL_ALT,
        command: MAV_CMD_TAKEOFF,
        is_current: true,
        autocontinue: true,
        param1: 0,
        param2: 0,
        param3: 0,
        param4: 0,
        x_lat: 37.527175,
        y_long: 15.113881,
        z_alt: 100
      }

      /*,{
          frame: FRAME_GLOBAL_REL_ALT,
          command: MAV_CMD_WAYPOINT,
          is_current: false,
          autocontinue: true,
          x_lat: 37.529227,
          y_long: 15.113171,
          z_alt: 15
      },{
          frame: FRAME_MISSION,
          command: MAV_CMD_NAV_RETURN_TO_LAUNCH,
          is_current: false,
          autocontinue: true,
          x_lat: 0,
          y_long: 0,
          z_alt: 0
      }*/]
    })
    for(let i = 0; i < 10; i++){

        await Promise.delay(1000)
        console.log(mission)
        mission = await missionPullClient.call()
    }

    console.log("Sending land cmd");
    return landClient.call({min_pitch: 1, yaw: 1, latitude, longitude, altitude: 0})
  })
  .then((res) => {
    console.log('Land res: ', res);
  })
  /*pub.publish({
    header: {
      "seq": 387999,
      "stamp": {
        "secs": 1570700453,
        "nsecs": 562934408
      },
      "frame_id": ""
    },
    connected: true,
    armed: true,
    guided: true,
    manual_input: false,
    mode: 'GUIDED',
    system_status: 4
  })*/
}
console.log(config.redis)
const emitter = Emitter(config.redis)
const COPTER_ID = 'mavros'

const copters = {}
const coptersList = []

const disconnetFromCopter = () => Promise.resolve()
const connetToCopter = (copterId) => {
  if(copters[copterId]){
    return Promise.resolve()
  }
  copters[copterId] = rosNode
  coptersList.push(copterId)
  rosNode.subscribe(`/${copterId}/battery`, sensors_msgs.msg.BatteryState, onBatteryUpdate(copterId));
  rosNode.subscribe(`/${copterId}/global_position/global`, sensors_msgs.msg.NavSatFix, onGlobalPositionGlobalUpdate(copterId));
  rosNode.subscribe(`/${copterId}/global_position/local`, nav_msgs.msg.Odometry, onGlobalPositionLocalUpdate(copterId));
  rosNode.subscribe(`/${copterId}/global_position/rel_alt`, std_msgs.msg.Float64, onRelativeAltitudeUpdate(copterId));
  rosNode.subscribe(`/${copterId}/mission/reached`, mavros_msgs.msg.WaypointReached, onWaypointReached(copterId));
  rosNode.subscribe(`/${copterId}/mission/waypoints`, mavros_msgs.msg.WaypointList, onWaypointList(copterId));

  rosNode.subscribe(`/${copterId}/global_position/raw/gps_vel`, geometry_msg.msg.TwistStamped, onGpsVelUpdate(copterId));
  return armAndTakeoff(copterId, 37.527337, 15.112690, 10)
  //return Promise.resolve()
}


console.log("Initializing ros");
rosnodejs.initNode('/listener_node', { /* rosMasterUri: 'http://192.168.100.224:37639' */ })
.then((client) => {
  console.log("Connected to ros, Waiting for connection request");
  rosNode = client
  connetToCopter('mavros')
})


sub.on('message', onRedisMessage)

let battPercentage=0, lat=0, lng=0, alt=0

function update(){
  console.log(`Battery: ${Math.round(battPercentage * 100)}%, Lat: ${lat}, Lng: ${lng}, Altitude: ${alt}`)
}
