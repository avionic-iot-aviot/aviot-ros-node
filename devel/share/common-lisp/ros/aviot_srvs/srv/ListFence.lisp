; Auto-generated. Do not edit!


(cl:in-package aviot_srvs-srv)


;//! \htmlinclude ListFence-request.msg.html

(cl:defclass <ListFence-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass ListFence-request (<ListFence-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ListFence-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ListFence-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<ListFence-request> is deprecated: use aviot_srvs-srv:ListFence-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ListFence-request>) ostream)
  "Serializes a message object of type '<ListFence-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ListFence-request>) istream)
  "Deserializes a message object of type '<ListFence-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ListFence-request>)))
  "Returns string type for a service object of type '<ListFence-request>"
  "aviot_srvs/ListFenceRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ListFence-request)))
  "Returns string type for a service object of type 'ListFence-request"
  "aviot_srvs/ListFenceRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ListFence-request>)))
  "Returns md5sum for a message object of type '<ListFence-request>"
  "f34d918e24ff52b99229c78d4dfce377")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ListFence-request)))
  "Returns md5sum for a message object of type 'ListFence-request"
  "f34d918e24ff52b99229c78d4dfce377")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ListFence-request>)))
  "Returns full string definition for message of type '<ListFence-request>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ListFence-request)))
  "Returns full string definition for message of type 'ListFence-request"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ListFence-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ListFence-request>))
  "Converts a ROS message object to a list"
  (cl:list 'ListFence-request
))
;//! \htmlinclude ListFence-response.msg.html

(cl:defclass <ListFence-response> (roslisp-msg-protocol:ros-message)
  ((polygon_ids
    :reader polygon_ids
    :initarg :polygon_ids
    :type (cl:vector cl:integer)
   :initform (cl:make-array 0 :element-type 'cl:integer :initial-element 0)))
)

(cl:defclass ListFence-response (<ListFence-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ListFence-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ListFence-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<ListFence-response> is deprecated: use aviot_srvs-srv:ListFence-response instead.")))

(cl:ensure-generic-function 'polygon_ids-val :lambda-list '(m))
(cl:defmethod polygon_ids-val ((m <ListFence-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:polygon_ids-val is deprecated.  Use aviot_srvs-srv:polygon_ids instead.")
  (polygon_ids m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ListFence-response>) ostream)
  "Serializes a message object of type '<ListFence-response>"
  (cl:let ((__ros_arr_len (cl:length (cl:slot-value msg 'polygon_ids))))
    (cl:write-byte (cl:ldb (cl:byte 8 0) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) __ros_arr_len) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) __ros_arr_len) ostream))
  (cl:map cl:nil #'(cl:lambda (ele) (cl:let* ((signed ele) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    ))
   (cl:slot-value msg 'polygon_ids))
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ListFence-response>) istream)
  "Deserializes a message object of type '<ListFence-response>"
  (cl:let ((__ros_arr_len 0))
    (cl:setf (cl:ldb (cl:byte 8 0) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 8) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 16) __ros_arr_len) (cl:read-byte istream))
    (cl:setf (cl:ldb (cl:byte 8 24) __ros_arr_len) (cl:read-byte istream))
  (cl:setf (cl:slot-value msg 'polygon_ids) (cl:make-array __ros_arr_len))
  (cl:let ((vals (cl:slot-value msg 'polygon_ids)))
    (cl:dotimes (i __ros_arr_len)
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:aref vals i) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296)))))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ListFence-response>)))
  "Returns string type for a service object of type '<ListFence-response>"
  "aviot_srvs/ListFenceResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ListFence-response)))
  "Returns string type for a service object of type 'ListFence-response"
  "aviot_srvs/ListFenceResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ListFence-response>)))
  "Returns md5sum for a message object of type '<ListFence-response>"
  "f34d918e24ff52b99229c78d4dfce377")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ListFence-response)))
  "Returns md5sum for a message object of type 'ListFence-response"
  "f34d918e24ff52b99229c78d4dfce377")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ListFence-response>)))
  "Returns full string definition for message of type '<ListFence-response>"
  (cl:format cl:nil "int32[] polygon_ids~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ListFence-response)))
  "Returns full string definition for message of type 'ListFence-response"
  (cl:format cl:nil "int32[] polygon_ids~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ListFence-response>))
  (cl:+ 0
     4 (cl:reduce #'cl:+ (cl:slot-value msg 'polygon_ids) :key #'(cl:lambda (ele) (cl:declare (cl:ignorable ele)) (cl:+ 4)))
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ListFence-response>))
  "Converts a ROS message object to a list"
  (cl:list 'ListFence-response
    (cl:cons ':polygon_ids (polygon_ids msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'ListFence)))
  'ListFence-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'ListFence)))
  'ListFence-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ListFence)))
  "Returns string type for a service object of type '<ListFence>"
  "aviot_srvs/ListFence")