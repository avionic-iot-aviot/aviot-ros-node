; Auto-generated. Do not edit!


(cl:in-package aviot_srvs-srv)


;//! \htmlinclude SetFence-request.msg.html

(cl:defclass <SetFence-request> (roslisp-msg-protocol:ros-message)
  ((frame
    :reader frame
    :initarg :frame
    :type cl:fixnum
    :initform 0)
   (mode
    :reader mode
    :initarg :mode
    :type cl:fixnum
    :initform 0)
   (points
    :reader points
    :initarg :points
    :type (cl:vector geometry_msgs-msg:Point)
   :initform (cl:make-array 0 :element-type 'geometry_msgs-msg:Point :initial-element (cl:make-instance 'geometry_msgs-msg:Point))))
)

(cl:defclass SetFence-request (<SetFence-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetFence-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetFence-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<SetFence-request> is deprecated: use aviot_srvs-srv:SetFence-request instead.")))

(cl:ensure-generic-function 'frame-val :lambda-list '(m))
(cl:defmethod frame-val ((m <SetFence-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:frame-val is deprecated.  Use aviot_srvs-srv:frame instead.")
  (frame m))

(cl:ensure-generic-function 'mode-val :lambda-list '(m))
(cl:defmethod mode-val ((m <SetFence-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:mode-val is deprecated.  Use aviot_srvs-srv:mode instead.")
  (mode m))

(cl:ensure-generic-function 'points-val :lambda-list '(m))
(cl:defmethod points-val ((m <SetFence-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:points-val is deprecated.  Use aviot_srvs-srv:points instead.")
  (points m))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<SetFence-request>)))
    "Constants for message type '<SetFence-request>"
  '((:FRAME_GLOBAL . 0)
    (:FRAME_LOCAL_NED . 1)
    (:FRAME_LOCAL_ENU . 4)
    (:FRAME_GLOBAL_INT . 5)
    (:FRAME_LOCAL_OFFSET_NED . 7)
    (:MODE_DENY . 0)
    (:MODE_ALLOW . 1))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'SetFence-request)))
    "Constants for message type 'SetFence-request"
  '((:FRAME_GLOBAL . 0)
    (:FRAME_LOCAL_NED . 1)
    (:FRAME_LOCAL_ENU . 4)
    (:FRAME_GLOBAL_INT . 5)
    (:FRAME_LOCAL_OFFSET_NED . 7)
    (:MODE_DENY . 0)
    (:MODE_ALLOW . 1))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetFence-request>) ostream)
  "Serializes a message object of type '<SetFence-request>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'frame)) ostream)
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'mode)) ostream)
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'points))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (roslisp-msg-protocol:serialize ele ostream))
   (cl:slot-value msg 'points))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetFence-request>) istream)
  "Deserializes a message object of type '<SetFence-request>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'frame)) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'mode)) (cl:read-byte istream))
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'points) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'points)))
    (cl:dotimes (i __ros_arr_len)
    (cl:setf (cl:aref vals i) (cl:make-instance 'geometry_msgs-msg:Point))
  (roslisp-msg-protocol:deserialize (cl:aref vals i) istream))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetFence-request>)))
  "Returns string type for a service object of type '<SetFence-request>"
  "aviot_srvs/SetFenceRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetFence-request)))
  "Returns string type for a service object of type 'SetFence-request"
  "aviot_srvs/SetFenceRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetFence-request>)))
  "Returns md5sum for a message object of type '<SetFence-request>"
  "41ce895a5fb6ebba9f054f5ad0e7c544")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetFence-request)))
  "Returns md5sum for a message object of type 'SetFence-request"
  "41ce895a5fb6ebba9f054f5ad0e7c544")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetFence-request>)))
  "Returns full string definition for message of type '<SetFence-request>"
  (cl:format cl:nil "~%uint8 frame~%uint8 FRAME_GLOBAL = 0~%uint8 FRAME_LOCAL_NED = 1~%uint8 FRAME_LOCAL_ENU = 4~%uint8 FRAME_GLOBAL_INT = 5~%uint8 FRAME_LOCAL_OFFSET_NED = 7~%~%uint8 mode~%uint8 MODE_DENY = 0~%uint8 MODE_ALLOW = 1~%~%geometry_msgs/Point[] points~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetFence-request)))
  "Returns full string definition for message of type 'SetFence-request"
  (cl:format cl:nil "~%uint8 frame~%uint8 FRAME_GLOBAL = 0~%uint8 FRAME_LOCAL_NED = 1~%uint8 FRAME_LOCAL_ENU = 4~%uint8 FRAME_GLOBAL_INT = 5~%uint8 FRAME_LOCAL_OFFSET_NED = 7~%~%uint8 mode~%uint8 MODE_DENY = 0~%uint8 MODE_ALLOW = 1~%~%geometry_msgs/Point[] points~%~%================================================================================~%MSG: geometry_msgs/Point~%# This contains the position of a point in free space~%float64 x~%float64 y~%float64 z~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetFence-request>))
  (cl:+ 0
     1
     1
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'points) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ (roslisp-msg-protocol:serialization-length ele))))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetFence-request>))
  "Converts a ROS message object to a list"
  (cl:list 'SetFence-request
    (cl:cons ':frame (frame msg))
    (cl:cons ':mode (mode msg))
    (cl:cons ':points (points msg))
))
;//! \htmlinclude SetFence-response.msg.html

(cl:defclass <SetFence-response> (roslisp-msg-protocol:ros-message)
  ((polygon_id
    :reader polygon_id
    :initarg :polygon_id
    :type cl:integer
    :initform 0))
)

(cl:defclass SetFence-response (<SetFence-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <SetFence-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'SetFence-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<SetFence-response> is deprecated: use aviot_srvs-srv:SetFence-response instead.")))

(cl:ensure-generic-function 'polygon_id-val :lambda-list '(m))
(cl:defmethod polygon_id-val ((m <SetFence-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:polygon_id-val is deprecated.  Use aviot_srvs-srv:polygon_id instead.")
  (polygon_id m))
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql '<SetFence-response>)))
    "Constants for message type '<SetFence-response>"
  '((:E_INVALID_POLYGON . -1)
    (:E_INVALID_MODE . -2)
    (:E_INVALID_FRAME . -3))
)
(cl:defmethod roslisp-msg-protocol:symbol-codes ((msg-type (cl:eql 'SetFence-response)))
    "Constants for message type 'SetFence-response"
  '((:E_INVALID_POLYGON . -1)
    (:E_INVALID_MODE . -2)
    (:E_INVALID_FRAME . -3))
)
(cl:defmethod roslisp-msg-protocol:serialize ((msg <SetFence-response>) ostream)
  "Serializes a message object of type '<SetFence-response>"
  (cl:let* ((signed (cl:slot-value msg 'polygon_id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <SetFence-response>) istream)
  "Deserializes a message object of type '<SetFence-response>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'polygon_id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<SetFence-response>)))
  "Returns string type for a service object of type '<SetFence-response>"
  "aviot_srvs/SetFenceResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetFence-response)))
  "Returns string type for a service object of type 'SetFence-response"
  "aviot_srvs/SetFenceResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<SetFence-response>)))
  "Returns md5sum for a message object of type '<SetFence-response>"
  "41ce895a5fb6ebba9f054f5ad0e7c544")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'SetFence-response)))
  "Returns md5sum for a message object of type 'SetFence-response"
  "41ce895a5fb6ebba9f054f5ad0e7c544")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<SetFence-response>)))
  "Returns full string definition for message of type '<SetFence-response>"
  (cl:format cl:nil "int32 polygon_id~%int32 E_INVALID_POLYGON = -1~%int32 E_INVALID_MODE = -2~%int32 E_INVALID_FRAME = -3~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'SetFence-response)))
  "Returns full string definition for message of type 'SetFence-response"
  (cl:format cl:nil "int32 polygon_id~%int32 E_INVALID_POLYGON = -1~%int32 E_INVALID_MODE = -2~%int32 E_INVALID_FRAME = -3~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <SetFence-response>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <SetFence-response>))
  "Converts a ROS message object to a list"
  (cl:list 'SetFence-response
    (cl:cons ':polygon_id (polygon_id msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'SetFence)))
  'SetFence-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'SetFence)))
  'SetFence-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'SetFence)))
  "Returns string type for a service object of type '<SetFence>"
  "aviot_srvs/SetFence")