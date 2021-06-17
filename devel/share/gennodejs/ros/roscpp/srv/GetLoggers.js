//-----------------------------------------------------------
// Auto-generated from package roscpp.
// !! Do not edit !!
//-----------------------------------------------------------

"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength

//-----------------------------------------------------------

const Logger = require('../msg/Logger.js');

//-----------------------------------------------------------

class GetLoggersRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type GetLoggersRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type GetLoggersRequest
    let data = new GetLoggersRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a roscpp/GetLoggersRequest object
    return 'roscpp/GetLoggersRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd41d8cd98f00b204e9800998ecf8427e'
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
    const resolved = new GetLoggersRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class GetLoggersResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.loggers = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('loggers')) {
        this.loggers = initObj.loggers;
      }
      else {
        this.loggers = [];
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type GetLoggersResponse

    // Serialize message field [loggers]
    // Serialize the length for message field [loggers]
    bufferOffset = _serializer.uint32(obj.loggers.length, buffer, bufferOffset);
    obj.loggers.forEach((val) => {
      bufferOffset = Logger.serialize(val, buffer, bufferOffset);
    });

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type GetLoggersResponse
    let data = new GetLoggersResponse(null);
    let len;
    // Deserialize message field [loggers]
    // Deserialize array length for message field [loggers]
    len = _deserializer.uint32(buffer, bufferOffset);
    data.loggers = new Array(len);
    for (let i = 0; i < len; ++i) {
      data.loggers[i] = Logger.deserialize(buffer, bufferOffset);
    }

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    for(let i = 0; i < object.loggers.length; ++i) {
      length += Logger.getMessageSize(object.loggers[i]);
    }
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a roscpp/GetLoggersResponse object
    return 'roscpp/GetLoggersResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '32e97e85527d4678a8f9279894bb64b0'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    Logger[] loggers

================================================================================
MSG: roscpp/Logger
string name
string level
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new GetLoggersResponse(null);
    if (msg.loggers !== undefined) {
      resolved.loggers = new Array(msg.loggers.length);
      for (let i = 0; i < resolved.loggers.length; ++i) {
        resolved.loggers[i] = Logger.Resolve(msg.loggers[i]);
      }
    }
    else {
      resolved.loggers = [];
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: GetLoggersRequest,
  Response: GetLoggersResponse,
  md5sum() { return '32e97e85527d4678a8f9279894bb64b0'; },
  datatype() { return 'roscpp/GetLoggers'; }
};

