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

//-----------------------------------------------------------


//-----------------------------------------------------------

class DeleteFenceRequest {
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
    // Serializes a message object of type DeleteFenceRequest
    // Serialize message field [polygon_id]
    bufferOffset = _serializer.int32(obj.polygon_id, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type DeleteFenceRequest
    let data = new DeleteFenceRequest(null);
    let len;
    // Deserialize message field [polygon_id]
    data.polygon_id = _deserializer.int32(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 4;
  }

  static datatype() {
    // Returns string type for a aviot_srvs/DeleteFenceRequest object
    return 'aviot_srvs/DeleteFenceRequest';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '97f1028fa479966162ae92d2c0f9e429'
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
    const resolved = new DeleteFenceRequest(null);
    if (msg.polygon_id !== undefined) {
      resolved.polygon_id = msg.polygon_id;
    }
    else {
      resolved.polygon_id = 0;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
class DeleteFenceResponse {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.done = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('done')) {
        this.done = initObj.done;
      }
      else {
        this.done = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type DeleteFenceResponse
    // Serialize message field [done]
    bufferOffset = _serializer.uint8(obj.done, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type DeleteFenceResponse
    let data = new DeleteFenceResponse(null);
    let len;
    // Deserialize message field [done]
    data.done = _deserializer.uint8(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    return 1;
  }

  static datatype() {
    // Returns string type for a aviot_srvs/DeleteFenceResponse object
    return 'aviot_srvs/DeleteFenceResponse';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'f0fad9ccd7b64cd66ec986070ce0fd3f'
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
    const resolved = new DeleteFenceResponse(null);
    if (msg.done !== undefined) {
      resolved.done = msg.done;
    }
    else {
      resolved.done = 0;
    }

    return resolved;
  }
}

//-----------------------------------------------------------
module.exports = {
  Request: DeleteFenceRequest,
  Response: DeleteFenceResponse,
  md5sum() { return '1b7306db77eae79388b7799e8c563252'; },
  datatype() { return 'aviot_srvs/DeleteFence'; }
};

