;; Auto-generated. Do not edit!


(when (boundp 'aviot_msgs::FenceStatus)
  (if (not (find-package "AVIOT_MSGS"))
    (make-package "AVIOT_MSGS"))
  (shadow 'FenceStatus (find-package "AVIOT_MSGS")))
(unless (find-package "AVIOT_MSGS::FENCESTATUS")
  (make-package "AVIOT_MSGS::FENCESTATUS"))

(in-package "ROS")
;;//! \htmlinclude FenceStatus.msg.html
(if (not (find-package "GEOMETRY_MSGS"))
  (ros::roseus-add-msgs "geometry_msgs"))
(if (not (find-package "STD_MSGS"))
  (ros::roseus-add-msgs "std_msgs"))


(defclass aviot_msgs::FenceStatus
  :super ros::object
  :slots (_header _inForbiddenPosition _allowedAreas _deniedAreas _distance _vector ))

(defmethod aviot_msgs::FenceStatus
  (:init
   (&key
    ((:header __header) (instance std_msgs::Header :init))
    ((:inForbiddenPosition __inForbiddenPosition) nil)
    ((:allowedAreas __allowedAreas) (make-array 0 :initial-element 0 :element-type :integer))
    ((:deniedAreas __deniedAreas) (make-array 0 :initial-element 0 :element-type :integer))
    ((:distance __distance) 0.0)
    ((:vector __vector) (instance geometry_msgs::Point :init))
    )
   (send-super :init)
   (setq _header __header)
   (setq _inForbiddenPosition __inForbiddenPosition)
   (setq _allowedAreas __allowedAreas)
   (setq _deniedAreas __deniedAreas)
   (setq _distance (float __distance))
   (setq _vector __vector)
   self)
  (:header
   (&rest __header)
   (if (keywordp (car __header))
       (send* _header __header)
     (progn
       (if __header (setq _header (car __header)))
       _header)))
  (:inForbiddenPosition
   (&optional __inForbiddenPosition)
   (if __inForbiddenPosition (setq _inForbiddenPosition __inForbiddenPosition)) _inForbiddenPosition)
  (:allowedAreas
   (&optional __allowedAreas)
   (if __allowedAreas (setq _allowedAreas __allowedAreas)) _allowedAreas)
  (:deniedAreas
   (&optional __deniedAreas)
   (if __deniedAreas (setq _deniedAreas __deniedAreas)) _deniedAreas)
  (:distance
   (&optional __distance)
   (if __distance (setq _distance __distance)) _distance)
  (:vector
   (&rest __vector)
   (if (keywordp (car __vector))
       (send* _vector __vector)
     (progn
       (if __vector (setq _vector (car __vector)))
       _vector)))
  (:serialization-length
   ()
   (+
    ;; std_msgs/Header _header
    (send _header :serialization-length)
    ;; bool _inForbiddenPosition
    1
    ;; uint32[] _allowedAreas
    (* 4    (length _allowedAreas)) 4
    ;; uint32[] _deniedAreas
    (* 4    (length _deniedAreas)) 4
    ;; float64 _distance
    8
    ;; geometry_msgs/Point _vector
    (send _vector :serialization-length)
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; std_msgs/Header _header
       (send _header :serialize s)
     ;; bool _inForbiddenPosition
       (if _inForbiddenPosition (write-byte -1 s) (write-byte 0 s))
     ;; uint32[] _allowedAreas
     (write-long (length _allowedAreas) s)
     (dotimes (i (length _allowedAreas))
       (write-long (elt _allowedAreas i) s)
       )
     ;; uint32[] _deniedAreas
     (write-long (length _deniedAreas) s)
     (dotimes (i (length _deniedAreas))
       (write-long (elt _deniedAreas i) s)
       )
     ;; float64 _distance
       (sys::poke _distance (send s :buffer) (send s :count) :double) (incf (stream-count s) 8)
     ;; geometry_msgs/Point _vector
       (send _vector :serialize s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; std_msgs/Header _header
     (send _header :deserialize buf ptr-) (incf ptr- (send _header :serialization-length))
   ;; bool _inForbiddenPosition
     (setq _inForbiddenPosition (not (= 0 (sys::peek buf ptr- :char)))) (incf ptr- 1)
   ;; uint32[] _allowedAreas
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _allowedAreas (instantiate integer-vector n))
     (dotimes (i n)
     (setf (elt _allowedAreas i) (sys::peek buf ptr- :integer)) (incf ptr- 4)
     ))
   ;; uint32[] _deniedAreas
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _deniedAreas (instantiate integer-vector n))
     (dotimes (i n)
     (setf (elt _deniedAreas i) (sys::peek buf ptr- :integer)) (incf ptr- 4)
     ))
   ;; float64 _distance
     (setq _distance (sys::peek buf ptr- :double)) (incf ptr- 8)
   ;; geometry_msgs/Point _vector
     (send _vector :deserialize buf ptr-) (incf ptr- (send _vector :serialization-length))
   ;;
   self)
  )

(setf (get aviot_msgs::FenceStatus :md5sum-) "8b7090ab19bc906baf2413dee62004e9")
(setf (get aviot_msgs::FenceStatus :datatype-) "aviot_msgs/FenceStatus")
(setf (get aviot_msgs::FenceStatus :definition-)
      "Header header
bool inForbiddenPosition
uint32[] allowedAreas
uint32[] deniedAreas
float64 distance
geometry_msgs/Point vector

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

================================================================================
MSG: geometry_msgs/Point
# This contains the position of a point in free space
float64 x
float64 y
float64 z

")



(provide :aviot_msgs/FenceStatus "8b7090ab19bc906baf2413dee62004e9")


