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

class ResetFenceRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ResetFenceRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type ResetFenceRequest
    let len;
    let data = new ResetFenceRequest(null);
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a service object
    return 'aviot_srvs/ResetFenceRequest';
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
    const resolved = new ResetFenceRequest(null);
    return resolved;
    }
};

class ResetFenceResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.done = null;
    }
    else {
      if (initObj.hasOwnProperty('done')) {
        this.done = initObj.done
      }
      else {
        this.done = 0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type ResetFenceResponse
    // Serialize message field [done]
    bufferOffset = _serializer.uint8(obj.done, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type ResetFenceResponse
    let len;
    let data = new ResetFenceResponse(null);
    // Deserialize message field [done]
    data.done = _deserializer.uint8(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 1;
  }

  static datatype() {
    // Returns string type for a service object
    return 'aviot_srvs/ResetFenceResponse';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return 'f0fad9ccd7b64cd66ec986070ce0fd3f';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    uint8 done
    
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new ResetFenceResponse(null);
    if (msg.done !== undefined) {
      resolved.done = msg.done;
    }
    else {
      resolved.done = 0
    }

    return resolved;
    }
};

module.exports = {
  Request: ResetFenceRequest,
  Response: ResetFenceResponse,
  md5sum() { return 'f0fad9ccd7b64cd66ec986070ce0fd3f'; },
  datatype() { return 'aviot_srvs/ResetFence'; }
};
