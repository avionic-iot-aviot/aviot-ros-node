// Auto-generated. Do not edit!

// (in-package aviot_srvs.srv)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;

//-----------------------------------------------------------

let geometry_msgs = _finder('geometry_msgs');

//-----------------------------------------------------------

class GetFenceRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.polygon_id = null;
    }
    else {
      if (initObj.hasOwnProperty('polygon_id')) {
        this.polygon_id = initObj.polygon_id
      }
      else {
        this.polygon_id = 0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type GetFenceRequest
    // Serialize message field [polygon_id]
    bufferOffset = _serializer.int32(obj.polygon_id, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type GetFenceRequest
    let len;
    let data = new GetFenceRequest(null);
    // Deserialize message field [polygon_id]
    data.polygon_id = _deserializer.int32(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 4;
  }

  static datatype() {
    // Returns string type for a service object
    return 'aviot_srvs/GetFenceRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '97f1028fa479966162ae92d2c0f9e429';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int32 polygon_id
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new GetFenceRequest(null);
    if (msg.polygon_id !== undefined) {
      resolved.polygon_id = msg.polygon_id;
    }
    else {
      resolved.polygon_id = 0
    }

    return resolved;
    }
};

class GetFenceResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.frame = null;
      this.mode = null;
      this.points = null;
    }
    else {
      if (initObj.hasOwnProperty('frame')) {
        this.frame = initObj.frame
      }
      else {
        this.frame = 0;
      }
      if (initObj.hasOwnProperty('mode')) {
        this.mode = initObj.mode
      }
      else {
        this.mode = 0;
      }
      if (initObj.hasOwnProperty('points')) {
        this.points = initObj.points
      }
      else {
        this.points = [];
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type GetFenceResponse
    // Serialize message field [frame]
    bufferOffset = _serializer.uint8(obj.frame, buffer, bufferOffset);
    // Serialize message field [mode]
    bufferOffset = _serializer.uint8(obj.mode, buffer, bufferOffset);
    // Serialize message field [points]
    // Serialize the length for message field [points]
    bufferOffset = _serializer.uint32(obj.points.length, buffer, bufferOffset);
    obj.points.forEach((val) => {
      bufferOffset = geometry_msgs.msg.Point.serialize(val, buffer, bufferOffset);
    });
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type GetFenceResponse
    let len;
    let data = new GetFenceResponse(null);
    // Deserialize message field [frame]
    data.frame = _deserializer.uint8(buffer, bufferOffset);
    // Deserialize message field [mode]
    data.mode = _deserializer.uint8(buffer, bufferOffset);
    // Deserialize message field [points]
    // Deserialize array length for message field [points]
    len = _deserializer.uint32(buffer, bufferOffset);
    data.points = new Array(len);
    for (let i = 0; i < len; ++i) {
      data.points[i] = geometry_msgs.msg.Point.deserialize(buffer, bufferOffset)
    }
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += 24 * object.points.length;
    return length + 6;
  }

  static datatype() {
    // Returns string type for a service object
    return 'aviot_srvs/GetFenceResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'a6b013422cbf99acfc1ef2f7fe5aa28c';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    uint8 frame
    uint8 FRAME_GLOBAL = 0
    uint8 FRAME_LOCAL_NED = 1
    uint8 FRAME_LOCAL_ENU = 4
    uint8 FRAME_GLOBAL_INT = 5
    uint8 FRAME_LOCAL_OFFSET_NED = 7
    
    uint8 mode
    uint8 MODE_DENY = 0
    uint8 MODE_ALLOW = 1
    geometry_msgs/Point[] points
    
    
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
    const resolved = new GetFenceResponse(null);
    if (msg.frame !== undefined) {
      resolved.frame = msg.frame;
    }
    else {
      resolved.frame = 0
    }

    if (msg.mode !== undefined) {
      resolved.mode = msg.mode;
    }
    else {
      resolved.mode = 0
    }

    if (msg.points !== undefined) {
      resolved.points = new Array(msg.points.length);
      for (let i = 0; i < resolved.points.length; ++i) {
        resolved.points[i] = geometry_msgs.msg.Point.Resolve(msg.points[i]);
      }
    }
    else {
      resolved.points = []
    }

    return resolved;
    }
};

// Constants for message
GetFenceResponse.Constants = {
  FRAME_GLOBAL: 0,
  FRAME_LOCAL_NED: 1,
  FRAME_LOCAL_ENU: 4,
  FRAME_GLOBAL_INT: 5,
  FRAME_LOCAL_OFFSET_NED: 7,
  MODE_DENY: 0,
  MODE_ALLOW: 1,
}

module.exports = {
  Request: GetFenceRequest,
  Response: GetFenceResponse,
  md5sum() { return '466f87568982eee090da5c5e363b5143'; },
  datatype() { return 'aviot_srvs/GetFence'; }
};
