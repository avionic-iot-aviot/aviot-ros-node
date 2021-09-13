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


//-----------------------------------------------------------

class ListFenceRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ListFenceRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type ListFenceRequest
    let len;
    let data = new ListFenceRequest(null);
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a service object
    return 'aviot_srvs/ListFenceRequest';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'd41d8cd98f00b204e9800998ecf8427e';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ListFenceRequest(null);
    return resolved;
    }
};

class ListFenceResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.polygon_ids = null;
    }
    else {
      if (initObj.hasOwnProperty('polygon_ids')) {
        this.polygon_ids = initObj.polygon_ids
      }
      else {
        this.polygon_ids = [];
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ListFenceResponse
    // Serialize message field [polygon_ids]
    bufferOffset = _arraySerializer.int32(obj.polygon_ids, buffer, bufferOffset, null);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type ListFenceResponse
    let len;
    let data = new ListFenceResponse(null);
    // Deserialize message field [polygon_ids]
    data.polygon_ids = _arrayDeserializer.int32(buffer, bufferOffset, null)
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += 4 * object.polygon_ids.length;
    return length + 4;
  }

  static datatype() {
    // Returns string type for a service object
    return 'aviot_srvs/ListFenceResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'f34d918e24ff52b99229c78d4dfce377';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    int32[] polygon_ids
    
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ListFenceResponse(null);
    if (msg.polygon_ids !== undefined) {
      resolved.polygon_ids = msg.polygon_ids;
    }
    else {
      resolved.polygon_ids = []
    }

    return resolved;
    }
};

module.exports = {
  Request: ListFenceRequest,
  Response: ListFenceResponse,
  md5sum() { return 'f34d918e24ff52b99229c78d4dfce377'; },
  datatype() { return 'aviot_srvs/ListFence'; }
};
