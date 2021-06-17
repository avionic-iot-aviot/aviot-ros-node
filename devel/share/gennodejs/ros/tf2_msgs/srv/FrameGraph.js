//-----------------------------------------------------------
// Auto-generated from package tf2_msgs.
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


//-----------------------------------------------------------

class FrameGraphRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FrameGraphRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type FrameGraphRequest
    let data = new FrameGraphRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a tf2_msgs/FrameGraphRequest object
    return 'tf2_msgs/FrameGraphRequest';
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
    const resolved = new FrameGraphRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class FrameGraphResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.frame_yaml = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('frame_yaml')) {
        this.frame_yaml = initObj.frame_yaml;
      }
      else {
        this.frame_yaml = '';
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FrameGraphResponse
    // Serialize message field [frame_yaml]
    bufferOffset = _serializer.string(obj.frame_yaml, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type FrameGraphResponse
    let data = new FrameGraphResponse(null);
    let len;
    // Deserialize message field [frame_yaml]
    data.frame_yaml = _deserializer.string(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.frame_yaml);
    // 4 is precalculated sum of the constant length fields
    return length + 4;
  }

  static datatype() {
    // Returns string type for a tf2_msgs/FrameGraphResponse object
    return 'tf2_msgs/FrameGraphResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '437ea58e9463815a0d511c7326b686b0'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string frame_yaml
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new FrameGraphResponse(null);
    if (msg.frame_yaml !== undefined) {
      resolved.frame_yaml = msg.frame_yaml;
    }
    else {
      resolved.frame_yaml = '';
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: FrameGraphRequest,
  Response: FrameGraphResponse,
  md5sum() { return '437ea58e9463815a0d511c7326b686b0'; },
  datatype() { return 'tf2_msgs/FrameGraph'; }
};

