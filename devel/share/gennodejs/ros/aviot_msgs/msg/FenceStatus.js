// Auto-generated. Do not edit!

// (in-package aviot_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;
let geometry_msgs = _finder('geometry_msgs');
let std_msgs = _finder('std_msgs');

//-----------------------------------------------------------

class FenceStatus {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.inForbiddenPosition = null;
      this.allowedAreas = null;
      this.deniedAreas = null;
      this.distance = null;
      this.vector = null;
    }
    else {
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header
      }
      else {
        this.header = new std_msgs.msg.Header();
      }
      if (initObj.hasOwnProperty('inForbiddenPosition')) {
        this.inForbiddenPosition = initObj.inForbiddenPosition
      }
      else {
        this.inForbiddenPosition = false;
      }
      if (initObj.hasOwnProperty('allowedAreas')) {
        this.allowedAreas = initObj.allowedAreas
      }
      else {
        this.allowedAreas = [];
      }
      if (initObj.hasOwnProperty('deniedAreas')) {
        this.deniedAreas = initObj.deniedAreas
      }
      else {
        this.deniedAreas = [];
      }
      if (initObj.hasOwnProperty('distance')) {
        this.distance = initObj.distance
      }
      else {
        this.distance = 0.0;
      }
      if (initObj.hasOwnProperty('vector')) {
        this.vector = initObj.vector
      }
      else {
        this.vector = new geometry_msgs.msg.Point();
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FenceStatus
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);
    // Serialize message field [inForbiddenPosition]
    bufferOffset = _serializer.bool(obj.inForbiddenPosition, buffer, bufferOffset);
    // Serialize message field [allowedAreas]
    bufferOffset = _arraySerializer.uint32(obj.allowedAreas, buffer, bufferOffset, null);
    // Serialize message field [deniedAreas]
    bufferOffset = _arraySerializer.uint32(obj.deniedAreas, buffer, bufferOffset, null);
    // Serialize message field [distance]
    bufferOffset = _serializer.float64(obj.distance, buffer, bufferOffset);
    // Serialize message field [vector]
    bufferOffset = geometry_msgs.msg.Point.serialize(obj.vector, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type FenceStatus
    let len;
    let data = new FenceStatus(null);
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);
    // Deserialize message field [inForbiddenPosition]
    data.inForbiddenPosition = _deserializer.bool(buffer, bufferOffset);
    // Deserialize message field [allowedAreas]
    data.allowedAreas = _arrayDeserializer.uint32(buffer, bufferOffset, null)
    // Deserialize message field [deniedAreas]
    data.deniedAreas = _arrayDeserializer.uint32(buffer, bufferOffset, null)
    // Deserialize message field [distance]
    data.distance = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [vector]
    data.vector = geometry_msgs.msg.Point.deserialize(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header);
    length += 4 * object.allowedAreas.length;
    length += 4 * object.deniedAreas.length;
    return length + 41;
  }

  static datatype() {
    // Returns string type for a message object
    return 'aviot_msgs/FenceStatus';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '8b7090ab19bc906baf2413dee62004e9';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Header header
    bool inForbiddenPosition
    uint32[] allowedAreas
    uint32[] deniedAreas
    float64 distance
    geometry_msgs/Point vector
    
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
    
    ================================================================================
    MSG: geometry_msgs/Point
    # This contains the position of a point in free space
    float64 x
    float64 y
    float64 z
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new FenceStatus(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header)
    }
    else {
      resolved.header = new std_msgs.msg.Header()
    }

    if (msg.inForbiddenPosition !== undefined) {
      resolved.inForbiddenPosition = msg.inForbiddenPosition;
    }
    else {
      resolved.inForbiddenPosition = false
    }

    if (msg.allowedAreas !== undefined) {
      resolved.allowedAreas = msg.allowedAreas;
    }
    else {
      resolved.allowedAreas = []
    }

    if (msg.deniedAreas !== undefined) {
      resolved.deniedAreas = msg.deniedAreas;
    }
    else {
      resolved.deniedAreas = []
    }

    if (msg.distance !== undefined) {
      resolved.distance = msg.distance;
    }
    else {
      resolved.distance = 0.0
    }

    if (msg.vector !== undefined) {
      resolved.vector = geometry_msgs.msg.Point.Resolve(msg.vector)
    }
    else {
      resolved.vector = new geometry_msgs.msg.Point()
    }

    return resolved;
    }
};

module.exports = FenceStatus;
