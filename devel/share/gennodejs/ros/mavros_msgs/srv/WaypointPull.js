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

class WaypointPullRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type WaypointPullRequest
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type WaypointPullRequest
    let data = new WaypointPullRequest(null);
    let len;
    return data;
  }

  static getMessageSize(object) {
    return 0;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/WaypointPullRequest object
    return 'mavros_msgs/WaypointPullRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd41d8cd98f00b204e9800998ecf8427e'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # Requests waypoints from device
#
# Returns success status and received count
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new WaypointPullRequest(null);
    return resolved;
  }
}

//-----------------------------------------------------------
class WaypointPullResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.success = null;
      this.wp_received = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('success')) {
        this.success = initObj.success;
      }
      else {
        this.success = false;
      }

      if (initObj.hasOwnProperty('wp_received')) {
        this.wp_received = initObj.wp_received;
      }
      else {
        this.wp_received = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type WaypointPullResponse
    // Serialize message field [success]
    bufferOffset = _serializer.bool(obj.success, buffer, bufferOffset);

    // Serialize message field [wp_received]
    bufferOffset = _serializer.uint32(obj.wp_received, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type WaypointPullResponse
    let data = new WaypointPullResponse(null);
    let len;
    // Deserialize message field [success]
    data.success = _deserializer.bool(buffer, bufferOffset);

    // Deserialize message field [wp_received]
    data.wp_received = _deserializer.uint32(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 5;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/WaypointPullResponse object
    return 'mavros_msgs/WaypointPullResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'a8d9ecef8fb37028d2db2a9aa4ed7e79'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool success
uint32 wp_received
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new WaypointPullResponse(null);
    if (msg.success !== undefined) {
      resolved.success = msg.success;
    }
    else {
      resolved.success = false;
    }

    if (msg.wp_received !== undefined) {
      resolved.wp_received = msg.wp_received;
    }
    else {
      resolved.wp_received = 0;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: WaypointPullRequest,
  Response: WaypointPullResponse,
  md5sum() { return 'a8d9ecef8fb37028d2db2a9aa4ed7e79'; },
  datatype() { return 'mavros_msgs/WaypointPull'; }
};

