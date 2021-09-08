import config from '../config'
import Logger from './services/log'
const uuidv1 = require('uuid/v1');
const rosnodejs = require('./services/rosnodejs/dist');

let nodeId = uuidv1();
const logger = Logger.child({ service: `ros-node`, uuid: nodeId});

(async () => {
  let options = {
    transports: ["UDPROS"],
    dgramSize: 1500,
    udpFirst: true
  }

  const std_msgs = rosnodejs.require('std_msgs');
  
  let seq = 0

  let getHeader = () => ({
    "seq": ++seq,
    "stamp": {
      "secs": Math.round(new Date().getTime() / 1000),
      "nsecs": 562934408
    },
    "frame_id": ""
  })



  // init ros
//   let rosNode = await rosnodejs.initNode(`/${config.ros.nodeId}`, {})

  let testPub = rosNode.advertise(`/${config.ros.nodeId}`, 'std_msgs/String')

//   rosNode.subscribe(`/${config.ros.otherId}`, std_msgs.msg.String, (data) => {
//     logger.debug(`message received on /${config.ros.otherId} - ${Date.now()}`)
//   }, options);

  setInterval(function(){
    logger.debug(`sending message on /${config.ros.nodeId} - ${Date.now()}`)
    testPub.publish({
      header: getHeader(),
      data: `${seq++}`
    })
  }, 250);
})()

