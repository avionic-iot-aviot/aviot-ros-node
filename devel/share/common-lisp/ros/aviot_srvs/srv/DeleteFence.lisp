; Auto-generated. Do not edit!


(cl:in-package aviot_srvs-srv)


;//! \htmlinclude DeleteFence-request.msg.html

(cl:defclass <DeleteFence-request> (roslisp-msg-protocol:ros-message)
  ((polygon_id
    :reader polygon_id
    :initarg :polygon_id
    :type cl:integer
    :initform 0))
)

(cl:defclass DeleteFence-request (<DeleteFence-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DeleteFence-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DeleteFence-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<DeleteFence-request> is deprecated: use aviot_srvs-srv:DeleteFence-request instead.")))

(cl:ensure-generic-function 'polygon_id-val :lambda-list '(m))
(cl:defmethod polygon_id-val ((m <DeleteFence-request>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:polygon_id-val is deprecated.  Use aviot_srvs-srv:polygon_id instead.")
  (polygon_id m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DeleteFence-request>) ostream)
  "Serializes a message object of type '<DeleteFence-request>"
  (cl:let* ((signed (cl:slot-value msg 'polygon_id)) (unsigned (cl:if (cl:< signed 0) (cl:+ signed 4294967296) signed)))
    (cl:write-byte (cl:ldb (cl:byte 8 0) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 8) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 16) unsigned) ostream)
    (cl:write-byte (cl:ldb (cl:byte 8 24) unsigned) ostream)
    )
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DeleteFence-request>) istream)
  "Deserializes a message object of type '<DeleteFence-request>"
    (cl:let ((unsigned 0))
      (cl:setf (cl:ldb (cl:byte 8 0) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 8) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 16) unsigned) (cl:read-byte istream))
      (cl:setf (cl:ldb (cl:byte 8 24) unsigned) (cl:read-byte istream))
      (cl:setf (cl:slot-value msg 'polygon_id) (cl:if (cl:< unsigned 2147483648) unsigned (cl:- unsigned 4294967296))))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DeleteFence-request>)))
  "Returns string type for a service object of type '<DeleteFence-request>"
  "aviot_srvs/DeleteFenceRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteFence-request)))
  "Returns string type for a service object of type 'DeleteFence-request"
  "aviot_srvs/DeleteFenceRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DeleteFence-request>)))
  "Returns md5sum for a message object of type '<DeleteFence-request>"
  "1b7306db77eae79388b7799e8c563252")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DeleteFence-request)))
  "Returns md5sum for a message object of type 'DeleteFence-request"
  "1b7306db77eae79388b7799e8c563252")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DeleteFence-request>)))
  "Returns full string definition for message of type '<DeleteFence-request>"
  (cl:format cl:nil "int32 polygon_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DeleteFence-request)))
  "Returns full string definition for message of type 'DeleteFence-request"
  (cl:format cl:nil "int32 polygon_id~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DeleteFence-request>))
  (cl:+ 0
     4
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DeleteFence-request>))
  "Converts a ROS message object to a list"
  (cl:list 'DeleteFence-request
    (cl:cons ':polygon_id (polygon_id msg))
))
;//! \htmlinclude DeleteFence-response.msg.html

(cl:defclass <DeleteFence-response> (roslisp-msg-protocol:ros-message)
  ((done
    :reader done
    :initarg :done
    :type cl:fixnum
    :initform 0))
)

(cl:defclass DeleteFence-response (<DeleteFence-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <DeleteFence-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'DeleteFence-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<DeleteFence-response> is deprecated: use aviot_srvs-srv:DeleteFence-response instead.")))

(cl:ensure-generic-function 'done-val :lambda-list '(m))
(cl:defmethod done-val ((m <DeleteFence-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:done-val is deprecated.  Use aviot_srvs-srv:done instead.")
  (done m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <DeleteFence-response>) ostream)
  "Serializes a message object of type '<DeleteFence-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'done)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <DeleteFence-response>) istream)
  "Deserializes a message object of type '<DeleteFence-response>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'done)) (cl:read-byte istream))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<DeleteFence-response>)))
  "Returns string type for a service object of type '<DeleteFence-response>"
  "aviot_srvs/DeleteFenceResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteFence-response)))
  "Returns string type for a service object of type 'DeleteFence-response"
  "aviot_srvs/DeleteFenceResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<DeleteFence-response>)))
  "Returns md5sum for a message object of type '<DeleteFence-response>"
  "1b7306db77eae79388b7799e8c563252")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'DeleteFence-response)))
  "Returns md5sum for a message object of type 'DeleteFence-response"
  "1b7306db77eae79388b7799e8c563252")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<DeleteFence-response>)))
  "Returns full string definition for message of type '<DeleteFence-response>"
  (cl:format cl:nil "uint8 done~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'DeleteFence-response)))
  "Returns full string definition for message of type 'DeleteFence-response"
  (cl:format cl:nil "uint8 done~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <DeleteFence-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <DeleteFence-response>))
  "Converts a ROS message object to a list"
  (cl:list 'DeleteFence-response
    (cl:cons ':done (done msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'DeleteFence)))
  'DeleteFence-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'DeleteFence)))
  'DeleteFence-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'DeleteFence)))
  "Returns string type for a service object of type '<DeleteFence>"
  "aviot_srvs/DeleteFence")