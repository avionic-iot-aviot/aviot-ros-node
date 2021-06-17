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

class DoubleParameter {
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
        this.value = 0.0;
      }

    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type DoubleParameter
    // Serialize message field [name]
    bufferOffset = _serializer.string(obj.name, buffer, bufferOffset);

    // Serialize message field [value]
    bufferOffset = _serializer.float64(obj.value, buffer, bufferOffset);

    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    // Deserializes a message object of type DoubleParameter
    let data = new DoubleParameter(null);
    let len;
    // Deserialize message field [name]
    data.name = _deserializer.string(buffer, bufferOffset);

    // Deserialize message field [value]
    data.value = _deserializer.float64(buffer, bufferOffset);

    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.name);
    // 12 is precalculated sum of the constant length fields
    return length + 12;
  }

  static datatype() {
    // Returns string type for a dynamic_reconfigure/DoubleParameter object
    return 'dynamic_reconfigure/DoubleParameter';
  }

  static md5sum() {
    // Returns md5sum of message object
    return 'd8512f27253c0f65f928a67c329cd658'
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    string name
float64 value
`;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new DoubleParameter(null);
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
      resolved.value = 0.0;
    }

    return resolved;
  }
}

module.exports = DoubleParameter
