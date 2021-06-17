//-----------------------------------------------------------
// Auto-generated from package dynamic_reconfigure.
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

class IntParameter {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.name = null;
      this.value = null;
    }
    else {
      // check for this message's fields by key name - otherwise assign default values
      if (initObj.hasOwnProperty('name')) {
        this.name = initObj.name;
      }
      else {
        this.name = '';
      }

      if (initObj.hasOwnProperty('value')) {
        this.value = initObj.value;
      }
      else {
        this.value = 0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type IntParameter
    // Serialize message field [name]
    bufferOffset = _serializer.string(obj.name, buffer, bufferOffset);

    // Serialize message field [value]
    bufferOffset = _serializer.int32(obj.value, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type IntParameter
    let data = new IntParameter(null);
    let len;
    // Deserialize message field [name]
    data.name = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [value]
    data.value = _deserializer.int32(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.name);
    // 8 is precalculated sum of the constant length fields
    return length + 8;
  }

  static datatype() {
    // Returns string type for a dynamic_reconfigure/IntParameter object
    return 'dynamic_reconfigure/IntParameter';
  }

  static md5sum() {
    // Returns md5sum of message object
    return '65fedc7a0cbfb8db035e46194a350bf1'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string name
int32 value
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new IntParameter(null);
    if (msg.name !== undefined) {
      resolved.name = msg.name;
    }
    else {
      resolved.name = '';
    }

    if (msg.value !== undefined) {
      resolved.value = msg.value;
    }
    else {
      resolved.value = 0;
    }

    return resolved;
  }
}

module.exports = IntParameter
