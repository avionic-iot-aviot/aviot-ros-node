//-----------------------------------------------------------
// Auto-generated from package aviot_srvs.
// !! Do not edit !!
//-----------------------------------------------------------

"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength
const geometry_msgs = _finder('geometry_msgs');

//-----------------------------------------------------------


//-----------------------------------------------------------

class SetFenceRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.frame = null;
      this.mode = null;
      this.points = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('frame')) {
        this.frame = initObj.frame;
      }
      else {
        this.frame = 0;
      }

      if (initObj.hasOwnProperty('mode')) {
        this.mode = initObj.mode;
      }
      else {
        this.mode = 0;
      }

      if (initObj.hasOwnProperty('points')) {
        this.points = initObj.points;
      }
      else {
        this.points = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type SetFenceRequest
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
    // Deserializes a message object of type SetFenceRequest
    let data = new SetFenceRequest(null);
    let len;
    // Deserialize message field [frame]
    data.frame = _deserializer.uint8(buffer, bufferOffset);

    // Deserialize message field [mode]
    data.mode = _deserializer.uint8(buffer, bufferOffset);

    // Deserialize message field [points]
    // Deserialize array length for message field [points]
    len = _deserializer.uint32(buffer, bufferOffset);
    data.points = new Array(len);
    for (let i = 0; i < len; ++i) {
      data.points[i] = geometry_msgs.msg.Point.deserialize(buffer, bufferOffset);
    }

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += 24 * object.points.length
    // 6 is precalculated sum of the constant length fields
    return length + 6;
  }

  static datatype() {
    // Returns string type for a aviot_srvs/SetFenceRequest object
    return 'aviot_srvs/SetFenceRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'a6b013422cbf99acfc1ef2f7fe5aa28c'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # see enum MAV_FRAME
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
    const resolved = new SetFenceRequest(null);
    if (msg.frame !== undefined) {
      resolved.frame = msg.frame;
    }
    else {
      resolved.frame = 0;
    }

    if (msg.mode !== undefined) {
      resolved.mode = msg.mode;
    }
    else {
      resolved.mode = 0;
    }

    if (msg.points !== undefined) {
      resolved.points = new Array(msg.points.length);
      for (let i = 0; i < resolved.points.length; ++i) {
        resolved.points[i] = geometry_msgs.msg.Point.Resolve(msg.points[i]);
      }
    }
    else {
      resolved.points = [];
    }

    return resolved;
  }
}

// Constants for message
SetFenceRequest.Constants = {
  FRAME_GLOBAL: 0,
  FRAME_LOCAL_NED: 1,
  FRAME_LOCAL_ENU: 4,
  FRAME_GLOBAL_INT: 5,
  FRAME_LOCAL_OFFSET_NED: 7,
  MODE_DENY: 0,
  MODE_ALLOW: 1,
}

//-----------------------------------------------------------
class SetFenceResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.polygon_id = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('polygon_id')) {
        this.polygon_id = initObj.polygon_id;
      }
      else {
        this.polygon_id = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type SetFenceResponse
    // Serialize message field [polygon_id]
    bufferOffset = _serializer.int32(obj.polygon_id, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type SetFenceResponse
    let data = new SetFenceResponse(null);
    let len;
    // Deserialize message field [polygon_id]
    data.polygon_id = _deserializer.int32(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 4;
  }

  static datatype() {
    // Returns string type for a aviot_srvs/SetFenceResponse object
    return 'aviot_srvs/SetFenceResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '7b8cdd29592fb1598878c7cb60a49e26'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int32 polygon_id
int32 E_INVALID_POLYGON = -1
int32 E_INVALID_MODE = -2
int32 E_INVALID_FRAME = -3
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new SetFenceResponse(null);
    if (msg.polygon_id !== undefined) {
      resolved.polygon_id = msg.polygon_id;
    }
    else {
      resolved.polygon_id = 0;
    }

    return resolved;
  }
}

// Constants for message
SetFenceResponse.Constants = {
  E_INVALID_POLYGON: -1,
  E_INVALID_MODE: -2,
  E_INVALID_FRAME: -3,
}

//-----------------------------------------------------------
module.exports = {
  Request: SetFenceRequest,
  Response: SetFenceResponse,
  md5sum() { return '41ce895a5fb6ebba9f054f5ad0e7c544'; },
  datatype() { return 'aviot_srvs/SetFence'; }
};

