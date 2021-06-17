//-----------------------------------------------------------
// Auto-generated from package mavros_msgs.
// !! Do not edit !!
//-----------------------------------------------------------

"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength
const std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class ManualControl {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.x = null;
      this.y = null;
      this.z = null;
      this.r = null;
      this.buttons = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header;
      }
      else {
        this.header = new std_msgs.msg.Header();
      }

      if (initObj.hasOwnProperty('x')) {
        this.x = initObj.x;
      }
      else {
        this.x = 0.0;
      }

      if (initObj.hasOwnProperty('y')) {
        this.y = initObj.y;
      }
      else {
        this.y = 0.0;
      }

      if (initObj.hasOwnProperty('z')) {
        this.z = initObj.z;
      }
      else {
        this.z = 0.0;
      }

      if (initObj.hasOwnProperty('r')) {
        this.r = initObj.r;
      }
      else {
        this.r = 0.0;
      }

      if (initObj.hasOwnProperty('buttons')) {
        this.buttons = initObj.buttons;
      }
      else {
        this.buttons = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ManualControl
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);

    // Serialize message field [x]
    bufferOffset = _serializer.float32(obj.x, buffer, bufferOffset);

    // Serialize message field [y]
    bufferOffset = _serializer.float32(obj.y, buffer, bufferOffset);

    // Serialize message field [z]
    bufferOffset = _serializer.float32(obj.z, buffer, bufferOffset);

    // Serialize message field [r]
    bufferOffset = _serializer.float32(obj.r, buffer, bufferOffset);

    // Serialize message field [buttons]
    bufferOffset = _serializer.uint16(obj.buttons, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type ManualControl
    let data = new ManualControl(null);
    let len;
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);

    // Deserialize message field [x]
    data.x = _deserializer.float32(buffer, bufferOffset);

    // Deserialize message field [y]
    data.y = _deserializer.float32(buffer, bufferOffset);

    // Deserialize message field [z]
    data.z = _deserializer.float32(buffer, bufferOffset);

    // Deserialize message field [r]
    data.r = _deserializer.float32(buffer, bufferOffset);

    // Deserialize message field [buttons]
    data.buttons = _deserializer.uint16(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header)
    // 18 is precalculated sum of the constant length fields
    return length + 18;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/ManualControl object
    return 'mavros_msgs/ManualControl';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'c41e3298484ea98e05ac502ce55af59f'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # Manual Control state
std_msgs/Header header
float32 x
float32 y
float32 z
float32 r
uint16 buttons

================================================================================
MSG: std_msgs/Header
# Standard metadata for higher-level stamped data types.
# This is generally used to communicate timestamped data 
# in a particular coordinate frame.
# 
# sequence ID: consecutively increasing ID 
uint32 seq
#Two-integer timestamp that is expressed as:
# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')
# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')
# time-handling sugar is provided by the client library
time stamp
#Frame this data is associated with
# 0: no frame
# 1: global frame
string frame_id
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ManualControl(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header);
    }
    else {
      resolved.header = new std_msgs.msg.Header();
    }

    if (msg.x !== undefined) {
      resolved.x = msg.x;
    }
    else {
      resolved.x = 0.0;
    }

    if (msg.y !== undefined) {
      resolved.y = msg.y;
    }
    else {
      resolved.y = 0.0;
    }

    if (msg.z !== undefined) {
      resolved.z = msg.z;
    }
    else {
      resolved.z = 0.0;
    }

    if (msg.r !== undefined) {
      resolved.r = msg.r;
    }
    else {
      resolved.r = 0.0;
    }

    if (msg.buttons !== undefined) {
      resolved.buttons = msg.buttons;
    }
    else {
      resolved.buttons = 0;
    }

    return resolved;
  }
}

module.exports = ManualControl
