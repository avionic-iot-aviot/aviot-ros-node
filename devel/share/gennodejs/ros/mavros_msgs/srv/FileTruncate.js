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

class FileTruncateRequest {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.file_path = null;
      this.length = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('file_path')) {
        this.file_path = initObj.file_path;
      }
      else {
        this.file_path = '';
      }

      if (initObj.hasOwnProperty('length')) {
        this.length = initObj.length;
      }
      else {
        this.length = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FileTruncateRequest
    // Serialize message field [file_path]
    bufferOffset = _serializer.string(obj.file_path, buffer, bufferOffset);

    // Serialize message field [length]
    bufferOffset = _serializer.uint64(obj.length, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type FileTruncateRequest
    let data = new FileTruncateRequest(null);
    let len;
    // Deserialize message field [file_path]
    data.file_path = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [length]
    data.length = _deserializer.uint64(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.file_path);
    // 12 is precalculated sum of the constant length fields
    return length + 12;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/FileTruncateRequest object
    return 'mavros_msgs/FileTruncateRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '8153dbfb1601dd12c2e69aba3171d186'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    # FTP::Truncate
#
# :success:	indicates success end of request
# :r_errno:	remote errno if applicapable

string file_path
uint64 length
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new FileTruncateRequest(null);
    if (msg.file_path !== undefined) {
      resolved.file_path = msg.file_path;
    }
    else {
      resolved.file_path = '';
    }

    if (msg.length !== undefined) {
      resolved.length = msg.length;
    }
    else {
      resolved.length = 0;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
class FileTruncateResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.success = null;
      this.r_errno = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('success')) {
        this.success = initObj.success;
      }
      else {
        this.success = false;
      }

      if (initObj.hasOwnProperty('r_errno')) {
        this.r_errno = initObj.r_errno;
      }
      else {
        this.r_errno = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type FileTruncateResponse
    // Serialize message field [success]
    bufferOffset = _serializer.bool(obj.success, buffer, bufferOffset);

    // Serialize message field [r_errno]
    bufferOffset = _serializer.int32(obj.r_errno, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type FileTruncateResponse
    let data = new FileTruncateResponse(null);
    let len;
    // Deserialize message field [success]
    data.success = _deserializer.bool(buffer, bufferOffset);

    // Deserialize message field [r_errno]
    data.r_errno = _deserializer.int32(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 5;
  }

  static datatype() {
    // Returns string type for a mavros_msgs/FileTruncateResponse object
    return 'mavros_msgs/FileTruncateResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '85394f2e941a8937ac567a617f06157f'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    bool success
int32 r_errno
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new FileTruncateResponse(null);
    if (msg.success !== undefined) {
      resolved.success = msg.success;
    }
    else {
      resolved.success = false;
    }

    if (msg.r_errno !== undefined) {
      resolved.r_errno = msg.r_errno;
    }
    else {
      resolved.r_errno = 0;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: FileTruncateRequest,
  Response: FileTruncateResponse,
  md5sum() { return '71bf45fe3600fc220a82346ce1d1430c'; },
  datatype() { return 'mavros_msgs/FileTruncate'; }
};

