; Auto-generated. Do not edit!


(cl:in-package aviot_msgs-msg)


;//! \htmlinclude FenceStatus.msg.html

(cl:defclass <FenceStatus> (roslisp-msg-protocol:ros-message)
  ((header
    :reader header
    :initarg :header
    :type std_msgs-msg:Header
    :initform (cl:make-instance 'std_msgs-msg:Header))
   (inForbiddenPosition
    :reader inForbiddenPosition
    :initarg :inForbiddenPosition
    :type cl:boolean
    :initform cl:nil)
   (allowedAreas
    :reader allowedAreas
    :initarg :allowedAreas
    :type (cl:vector cl:integer)
   :initform (cl:make-array 0 :element-type 'cl:integer :initial-element 0))
   (deniedAreas
    :reader deniedAreas
    :initarg :deniedAreas
    :type (cl:vector cl:integer)
   :initform (cl:make-array 0 :element-type 'cl:integer :initial-element 0))
   (distance
    :reader distance
    :initarg :distance
    :type cl:float
    :initform 0.0)
   (vector
    :reader vector
    :initarg :vector
    :type geometry_msgs-msg:Point
    :initform (cl:make-instance 'geometry_msgs-msg:Point)))
)

(cl:defclass FenceStatus (<FenceStatus>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <FenceStatus>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'FenceStatus)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_msgs-msg:<FenceStatus> is deprecated: use aviot_msgs-msg:FenceStatus instead.")))

(cl:ensure-generic-function 'header-val :lambda-list '(m))
(cl:defmethod header-val ((m <FenceStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_msgs-msg:header-val is deprecated.  Use aviot_msgs-msg:header instead.")
  (header m))

(cl:ensure-generic-function 'inForbiddenPosition-val :lambda-list '(m))
(cl:defmethod inForbiddenPosition-val ((m <FenceStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_msgs-msg:inForbiddenPosition-val is deprecated.  Use aviot_msgs-msg:inForbiddenPosition instead.")
  (inForbiddenPosition m))

(cl:ensure-generic-function 'allowedAreas-val :lambda-list '(m))
(cl:defmethod allowedAreas-val ((m <FenceStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_msgs-msg:allowedAreas-val is deprecated.  Use aviot_msgs-msg:allowedAreas instead.")
  (allowedAreas m))

(cl:ensure-generic-function 'deniedAreas-val :lambda-list '(m))
(cl:defmethod deniedAreas-val ((m <FenceStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_msgs-msg:deniedAreas-val is deprecated.  Use aviot_msgs-msg:deniedAreas instead.")
  (deniedAreas m))

(cl:ensure-generic-function 'distance-val :lambda-list '(m))
(cl:defmethod distance-val ((m <FenceStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_msgs-msg:distance-val is deprecated.  Use aviot_msgs-msg:distance instead.")
  (distance m))

(cl:ensure-generic-function 'vector-val :lambda-list '(m))
(cl:defmethod vector-val ((m <FenceStatus>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_msgs-msg:vector-val is deprecated.  Use aviot_msgs-msg:vector instead.")
  (vector m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <FenceStatus>) ostream)
  "Serializes a message object of type '<FenceStatus>"
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'header) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:if (cl:slot-value msg 'inForbiddenPosition) 1 0)) ostream)
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'allowedAreas))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:write-byte (cl:ldb (cl:byte 8 0) ele) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 8) ele) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 16) ele) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 24) ele) ostream))
   (cl:slot-value msg 'allowedAreas))
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'deniedAreas))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:write-byte (cl:ldb (cl:byte 8 0) ele) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 8) ele) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 16) ele) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 24) ele) ostream))
   (cl:slot-value msg 'deniedAreas))
  (cl:let ((bits (roslisp-utils:encode-double-float-bits (cl:slot-value msg 'distance))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 32) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 40) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 48) bits) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 56) bits) ostream))
  (roslisp-msg-protocol:serialize (cl:slot-value msg 'vector) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <FenceStatus>) istream)
  "Deserializes a message object of type '<FenceStatus>"
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'header) istream)
    (cl:setf (cl:slot-value msg 'inForbiddenPosition) (cl:not (cl:zerop (cl:read-byte istream))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'allowedAreas) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'allowedAreas)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:aref vals i)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) (cl:aref vals i)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) (cl:aref vals i)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) (cl:aref vals i)) (cl:read-byte istream)))))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'deniedAreas) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'deniedAreas)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:aref vals i)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) (cl:aref vals i)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) (cl:aref vals i)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) (cl:aref vals i)) (cl:read-byte istream)))))
    (cl:let ((bits 0))
      (cl:setf (cl:ldb (cl:byte 8 0) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 32) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 40) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 48) bits) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 56) bits) (cl:read-byte istream))
    (cl:setf (cl:slot-value msg 'distance) (roslisp-utils:decode-double-float-bits bits)))
  (roslisp-msg-protocol:deserialize (cl:slot-value msg 'vector) istream)
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<FenceStatus>)))
  "Returns string type for a message object of type '<FenceStatus>"
  "aviot_msgs/FenceStatus")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'FenceStatus)))
  "Returns string type for a message object of type 'FenceStatus"
  "aviot_msgs/FenceStatus")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<FenceStatus>)))
  "Returns md5sum for a message object of type '<FenceStatus>"
  "8b7090ab19bc906baf2413dee62004e9")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'FenceStatus)))
  "Returns md5sum for a message object of type 'FenceStatus"
  "8b7090ab19bc906baf2413dee62004e9")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<FenceStatus>)))
  "Returns full string definition for message of type '<FenceStatus>"
  (cl:format cl:nil "Header header~%bool inForbiddenPosition~%uint32[] allowedAreas~%uint32[] deniedAreas~%float64 distance~%geometry_msgs/Point vector~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'FenceStatus)))
  "Returns full string definition for message of type 'FenceStatus"
  (cl:format cl:nil "Header header~%bool inForbiddenPosition~%uint32[] allowedAreas~%uint32[] deniedAreas~%float64 distance~%geometry_msgs/Point vector~%~%================================================================================~%MSG: std_msgs/Header~%# Standard metadata for higher-level stamped data types.~%# This is generally used to communicate timestamped data ~%# in a particular coordinate frame.~%# ~%# sequence ID: consecutively increasing ID ~%uint32 seq~%#Two-integer timestamp that is expressed as:~%# * stamp.sec: seconds (stamp_secs) since epoch (in Python the variable is called 'secs')~%# * stamp.nsec: nanoseconds since stamp_secs (in Python the variable is called 'nsecs')~%# time-handling sugar is provided by the client library~%time stamp~%#Frame this data is associated with~%# 0: no frame~%# 1: global frame~%string frame_id~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <FenceStatus>))
  (cl:+ 0
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'header))
     1
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'allowedAreas) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4)))
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'deniedAreas) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4)))
     8
     (roslisp-msg-protocol:serialization-length (cl:slot-value msg 'vector))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <FenceStatus>))
  "Converts a ROS message object to a list"
  (cl:list 'FenceStatus
    (cl:cons ':header (header msg))
    (cl:cons ':inForbiddenPosition (inForbiddenPosition msg))
    (cl:cons ':allowedAreas (allowedAreas msg))
    (cl:cons ':deniedAreas (deniedAreas msg))
    (cl:cons ':distance (distance msg))
    (cl:cons ':vector (vector msg))
))
