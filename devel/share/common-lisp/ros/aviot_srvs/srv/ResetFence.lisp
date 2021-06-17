; Auto-generated. Do not edit!


(cl:in-package aviot_srvs-srv)


;//! \htmlinclude ResetFence-request.msg.html

(cl:defclass <ResetFence-request> (roslisp-msg-protocol:ros-message)
  ()
)

(cl:defclass ResetFence-request (<ResetFence-request>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ResetFence-request>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ResetFence-request)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<ResetFence-request> is deprecated: use aviot_srvs-srv:ResetFence-request instead.")))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ResetFence-request>) ostream)
  "Serializes a message object of type '<ResetFence-request>"
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ResetFence-request>) istream)
  "Deserializes a message object of type '<ResetFence-request>"
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ResetFence-request>)))
  "Returns string type for a service object of type '<ResetFence-request>"
  "aviot_srvs/ResetFenceRequest")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ResetFence-request)))
  "Returns string type for a service object of type 'ResetFence-request"
  "aviot_srvs/ResetFenceRequest")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ResetFence-request>)))
  "Returns md5sum for a message object of type '<ResetFence-request>"
  "f0fad9ccd7b64cd66ec986070ce0fd3f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ResetFence-request)))
  "Returns md5sum for a message object of type 'ResetFence-request"
  "f0fad9ccd7b64cd66ec986070ce0fd3f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ResetFence-request>)))
  "Returns full string definition for message of type '<ResetFence-request>"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ResetFence-request)))
  "Returns full string definition for message of type 'ResetFence-request"
  (cl:format cl:nil "~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ResetFence-request>))
  (cl:+ 0
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ResetFence-request>))
  "Converts a ROS message object to a list"
  (cl:list 'ResetFence-request
))
;//! \htmlinclude ResetFence-response.msg.html

(cl:defclass <ResetFence-response> (roslisp-msg-protocol:ros-message)
  ((done
    :reader done
    :initarg :done
    :type cl:fixnum
    :initform 0))
)

(cl:defclass ResetFence-response (<ResetFence-response>)
  ())

(cl:defmethod cl:initialize-instance :after ((m <ResetFence-response>) cl:&rest args)
  (cl:declare (cl:ignorable args))
  (cl:unless (cl:typep m 'ResetFence-response)
    (roslisp-msg-protocol:msg-deprecation-warning "using old message class name aviot_srvs-srv:<ResetFence-response> is deprecated: use aviot_srvs-srv:ResetFence-response instead.")))

(cl:ensure-generic-function 'done-val :lambda-list '(m))
(cl:defmethod done-val ((m <ResetFence-response>))
  (roslisp-msg-protocol:msg-deprecation-warning "Using old-style slot reader aviot_srvs-srv:done-val is deprecated.  Use aviot_srvs-srv:done instead.")
  (done m))
(cl:defmethod roslisp-msg-protocol:serialize ((msg <ResetFence-response>) ostream)
  "Serializes a message object of type '<ResetFence-response>"
  (cl:write-byte (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'done)) ostream)
)
(cl:defmethod roslisp-msg-protocol:deserialize ((msg <ResetFence-response>) istream)
  "Deserializes a message object of type '<ResetFence-response>"
    (cl:setf (cl:ldb (cl:byte 8 0) (cl:slot-value msg 'done)) (cl:read-byte istream))
  msg
)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql '<ResetFence-response>)))
  "Returns string type for a service object of type '<ResetFence-response>"
  "aviot_srvs/ResetFenceResponse")
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ResetFence-response)))
  "Returns string type for a service object of type 'ResetFence-response"
  "aviot_srvs/ResetFenceResponse")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql '<ResetFence-response>)))
  "Returns md5sum for a message object of type '<ResetFence-response>"
  "f0fad9ccd7b64cd66ec986070ce0fd3f")
(cl:defmethod roslisp-msg-protocol:md5sum ((type (cl:eql 'ResetFence-response)))
  "Returns md5sum for a message object of type 'ResetFence-response"
  "f0fad9ccd7b64cd66ec986070ce0fd3f")
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql '<ResetFence-response>)))
  "Returns full string definition for message of type '<ResetFence-response>"
  (cl:format cl:nil "uint8 done~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:message-definition ((type (cl:eql 'ResetFence-response)))
  "Returns full string definition for message of type 'ResetFence-response"
  (cl:format cl:nil "uint8 done~%~%~%~%"))
(cl:defmethod roslisp-msg-protocol:serialization-length ((msg <ResetFence-response>))
  (cl:+ 0
     1
))
(cl:defmethod roslisp-msg-protocol:ros-message-to-list ((msg <ResetFence-response>))
  "Converts a ROS message object to a list"
  (cl:list 'ResetFence-response
    (cl:cons ':done (done msg))
))
(cl:defmethod roslisp-msg-protocol:service-request-type ((msg (cl:eql 'ResetFence)))
  'ResetFence-request)
(cl:defmethod roslisp-msg-protocol:service-response-type ((msg (cl:eql 'ResetFence)))
  'ResetFence-response)
(cl:defmethod roslisp-msg-protocol:ros-datatype ((msg (cl:eql 'ResetFence)))
  "Returns string type for a service object of type '<ResetFence>"
  "aviot_srvs/ResetFence")