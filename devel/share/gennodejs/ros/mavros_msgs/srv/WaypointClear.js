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

//-----------------------------------------------------------


//-----------------------------------------------------------

class WaypointClearRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type WaypointClearRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type WaypointClearRequest
    let data = new WaypointClearRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/WaypointClearRequest object
    return 'mavros_msgs/WaypointClearRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd41d8cd98f00b204e9800998ecf8427e'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # Request clear waypoint
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new WaypointClearRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class WaypointClearResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.success = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('success')) {
        this.success = initObj.success;
      }
      else {
        this.success = false;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type WaypointClearResponse
    // Serialize message field [success]
    bufferOffset = _serializer.bool(obj.success, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type WaypointClearResponse
    let data = new WaypointClearResponse(null);
    let len;
    // Deserialize message field [success]
    data.success = _deserializer.bool(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 1;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/WaypointClearResponse object
    return 'mavros_msgs/WaypointClearResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '358e233cde0c8a8bcfea4ce193f8fc15'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool success
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new WaypointClearResponse(null);
    if (msg.success !== undefined) {
      resolved.success = msg.success;
    }
    else {
      resolved.success = false;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: WaypointClearRequest,
  Response: WaypointClearResponse,
  md5sum() { return '358e233cde0c8a8bcfea4ce193f8fc15'; },
  datatype() { return 'mavros_msgs/WaypointClear'; }
};

