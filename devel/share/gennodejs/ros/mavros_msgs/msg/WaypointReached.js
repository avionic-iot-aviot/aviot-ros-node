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

class WaypointReached {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.header = null;
      this.wp_seq = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('header')) {
        this.header = initObj.header;
      }
      else {
        this.header = new std_msgs.msg.Header();
      }

      if (initObj.hasOwnProperty('wp_seq')) {
        this.wp_seq = initObj.wp_seq;
      }
      else {
        this.wp_seq = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type WaypointReached
    // Serialize message field [header]
    bufferOffset = std_msgs.msg.Header.serialize(obj.header, buffer, bufferOffset);

    // Serialize message field [wp_seq]
    bufferOffset = _serializer.uint16(obj.wp_seq, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type WaypointReached
    let data = new WaypointReached(null);
    let len;
    // Deserialize message field [header]
    data.header = std_msgs.msg.Header.deserialize(buffer, bufferOffset);

    // Deserialize message field [wp_seq]
    data.wp_seq = _deserializer.uint16(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += std_msgs.msg.Header.getMessageSize(object.header)
    // 2 is precalculated sum of the constant length fields
    return length + 2;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/WaypointReached object
    return 'mavros_msgs/WaypointReached';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '1cf64d072d9f6aa0a6715922bdde6a35'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # That message represent MISSION_ITEM_REACHED
#
#   :wp_seq:    index number of reached waypoint

Header header

uint16 wp_seq

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
    const resolved = new WaypointReached(null);
    if (msg.header !== undefined) {
      resolved.header = std_msgs.msg.Header.Resolve(msg.header);
    }
    else {
      resolved.header = new std_msgs.msg.Header();
    }

    if (msg.wp_seq !== undefined) {
      resolved.wp_seq = msg.wp_seq;
    }
    else {
      resolved.wp_seq = 0;
    }

    return resolved;
  }
}

module.exports = WaypointReached
