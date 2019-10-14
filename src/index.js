import Emitter from 'socket.io-emitter'
import config from '../config'
const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs');
const sensors_msgs = rosnodejs.require('sensor_msgs');
const geometry_msg = rosnodejs.require('geometry_msgs');
const mavros_msgs = rosnodejs.require('mavros_msgs');
const Promise = require('bluebird')
const Redis = require('ioredis')
const uuidv1 = require('uuid/v1');

const redis = new Redis(config.redis)
const sub = new Redis(config.redis)
const pub = new Redis(config.redis)

const NODE_COUNT_KEY = 'rosListeners'
const NODES_INFO_KEY = 'nodes'

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
  debugMessage(`/${copterId}/battery`, data)
}

const onGlobalPositionGlobalUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/global`, data)
  debugMessage(`/${copterId}/global_position/global`, data)
  //update()
}


const onGlobalPositionLocalUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/local`, data)
  debugMessage(`/${copterId}/global_position/local`, data)
}

const onRelativeAltitudeUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/rel_alt`, data)
  debugMessage(`/${copterId}/global_position/rel_alt`, data)
}

const onGpsVelUpdate = (copterId) => (data) => {
  emitter.to(`copter_${copterId}`).emit(`/${copterId}/global_position/gps_vel`, data)
  debugMessage(`/${copterId}/global_position/raw/gps_vel`, data)
}
const debugMessage = (topic, data) => {
  //console.log('Topic: ' + topic, JSON.stringify(data, null, 2))
}

const armAndTakeoff = (copterId, latitude, longitude, altitude) => {
  console.log("Arming " + copterId)
  let node = copters[copterId]
  const modeClient = node.serviceClient(`/${copterId}/set_mode`, 'mavros_msgs/SetMode');
  const landClient = node.serviceClient(`/${copterId}/cmd/land`, 'mavros_msgs/CommandTOL');
  const armClient = node.serviceClient(`/${copterId}/cmd/arming`, 'mavros_msgs/CommandBool');
  const takeoffClient = node.serviceClient(`/${copterId}/cmd/takeoff`, 'mavros_msgs/CommandTOL');
  const setPaPub = node.advertise(`/${copterId}/setpoint_raw/local`, 'mavros_msgs/PositionTarget');
  modeClient.call({
    base_mode: 220,
    custom_mode: 'GUIDED'
  })
  .then((data) => {
    console.log(data)
    return data
  })
  .then(({mode_sent}) => mode_sent ? armClient.call({value: true}) : ({success: false}))
  .then(({success}) => {
    console.log('Arming status: ' + success)
    if(success){
      console.log('Taking off');
      return Promise.delay(5000).then(()=>takeoffClient.call({min_pitch: 1, yaw: 1, latitude, longitude, altitude}))
    }
    else {
      return { success: false}
    }
  })
  .then(({success}) => {
    console.log(success ? 'Takeoff started' : 'Takeoff failed')
    return success
  })
  .then(success =>{
    if(success){
      return Promise.delay(10000)
    } else {
      throw new Error('Not flyng')
    }
  })
  .then(async (success) => {
    console.log("Sending attitude")
    let msg = {
      header: {
        "seq": 387999,
        "stamp": {
          "secs": Math.round(new Date().getTime() / 1000),
          "nsecs": 562934408
        },
        "frame_id": ""
      },
      type_mask: 512,
      position:{
        x: 0,
        y: 0,
        z: 0
      },
      acceleration_or_force: {
        x: 0,
        y: 0,
        z: 0
      },
      velocity: {
        x: 0,
        y: 0,
        z: 0
      },
      yaw_rate: 0

    }
    for(let i = 0; i < 100; i++){
        await setPaPub.publish(msg)
        await Promise.delay(100)
        msg.header.seq++
    }
    await modeClient.call({
      base_mode: 192,
      custom_mode: 'OFFBOARD'
    }).then((res)=>{
      console.log(res)
      return Promise.delay(5000)
    })
    msg.velocity.y = 0.4
    msg.acceleration_or_force.y = 0.4
    msg.position.y = 0.4
    //msg.position.x = 100

    for(let i = 0; i < 100; i++){
        await setPaPub.publish(msg)
        await Promise.delay(100)
        console.log("Sending msg");
        msg.header.seq++
        msg.header.stamp.secs++
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
  rosNode.subscribe(`/${copterId}/global_position/local`, geometry_msg.msg.PoseWithCovarianceStamped, onGlobalPositionLocalUpdate(copterId));
  rosNode.subscribe(`/${copterId}/global_position/rel_alt`, std_msgs.msg.Float64, onRelativeAltitudeUpdate(copterId));
  rosNode.subscribe(`/${copterId}/global_position/raw/gps_vel`, geometry_msg.msg.TwistStamped, onGpsVelUpdate(copterId));
  armAndTakeoff(copterId, 37.527337, 15.112690, 10)
  return Promise.resolve()
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
