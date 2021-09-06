
const rosnodejs = require('./services/rosnodejs/dist');
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  // init ros
  const rosNode = await rosnodejs.initNode(`/talker2`, {})
  
  // const sub = rosNode.subscribe('/chatter', 'std_msgs/String', (msg) => {
  //   console.log('Got msg on chatter: %j', msg);
  // }, {
  //   transports: ["UDPROS"],  // specify transports, default ["TCPROS"]
  //   dgramSize: 1500   // optional: datagram packet size, default: 1500 bytes
  // });

  const pub1 = rosNode.advertise('/test/tcpTopic', 'std_msgs/String');
  const pub2 = rosNode.advertise('/test/udpTopic', 'std_msgs/String');

  for(let i = 0;i < 100; i++){
    pub1.publish({ data: "hi " + i });
    pub2.publish({ data: "hi " + i });
    await sleep(2000)
  }
})()

