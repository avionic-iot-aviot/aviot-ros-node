;; Auto-generated. Do not edit!


(when (boundp 'aviot_srvs::SetFence)
  (if (not (find-package "AVIOT_SRVS"))
    (make-package "AVIOT_SRVS"))
  (shadow 'SetFence (find-package "AVIOT_SRVS")))
(unless (find-package "AVIOT_SRVS::SETFENCE")
  (make-package "AVIOT_SRVS::SETFENCE"))
(unless (find-package "AVIOT_SRVS::SETFENCEREQUEST")
  (make-package "AVIOT_SRVS::SETFENCEREQUEST"))
(unless (find-package "AVIOT_SRVS::SETFENCERESPONSE")
  (make-package "AVIOT_SRVS::SETFENCERESPONSE"))

(in-package "ROS")

(if (not (find-package "GEOMETRY_MSGS"))
  (ros::roseus-add-msgs "geometry_msgs"))




(intern "*FRAME_GLOBAL*" (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(shadow '*FRAME_GLOBAL* (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(defconstant aviot_srvs::SetFenceRequest::*FRAME_GLOBAL* 0)
(intern "*FRAME_LOCAL_NED*" (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(shadow '*FRAME_LOCAL_NED* (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(defconstant aviot_srvs::SetFenceRequest::*FRAME_LOCAL_NED* 1)
(intern "*FRAME_LOCAL_ENU*" (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(shadow '*FRAME_LOCAL_ENU* (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(defconstant aviot_srvs::SetFenceRequest::*FRAME_LOCAL_ENU* 4)
(intern "*FRAME_GLOBAL_INT*" (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(shadow '*FRAME_GLOBAL_INT* (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(defconstant aviot_srvs::SetFenceRequest::*FRAME_GLOBAL_INT* 5)
(intern "*FRAME_LOCAL_OFFSET_NED*" (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(shadow '*FRAME_LOCAL_OFFSET_NED* (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(defconstant aviot_srvs::SetFenceRequest::*FRAME_LOCAL_OFFSET_NED* 7)
(intern "*MODE_DENY*" (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(shadow '*MODE_DENY* (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(defconstant aviot_srvs::SetFenceRequest::*MODE_DENY* 0)
(intern "*MODE_ALLOW*" (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(shadow '*MODE_ALLOW* (find-package "AVIOT_SRVS::SETFENCEREQUEST"))
(defconstant aviot_srvs::SetFenceRequest::*MODE_ALLOW* 1)
(defclass aviot_srvs::SetFenceRequest
  :super ros::object
  :slots (_frame _mode _points ))

(defmethod aviot_srvs::SetFenceRequest
  (:init
   (&key
    ((:frame __frame) 0)
    ((:mode __mode) 0)
    ((:points __points) (let (r) (dotimes (i 0) (push (instance geometry_msgs::Point :init) r)) r))
    )
   (send-super :init)
   (setq _frame (round __frame))
   (setq _mode (round __mode))
   (setq _points __points)
   self)
  (:frame
   (&optional __frame)
   (if __frame (setq _frame __frame)) _frame)
  (:mode
   (&optional __mode)
   (if __mode (setq _mode __mode)) _mode)
  (:points
   (&rest __points)
   (if (keywordp (car __points))
       (send* _points __points)
     (progn
       (if __points (setq _points (car __points)))
       _points)))
  (:serialization-length
   ()
   (+
    ;; uint8 _frame
    1
    ;; uint8 _mode
    1
    ;; geometry_msgs/Point[] _points
    (apply #'+ (send-all _points :serialization-length)) 4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; uint8 _frame
       (write-byte _frame s)
     ;; uint8 _mode
       (write-byte _mode s)
     ;; geometry_msgs/Point[] _points
     (write-long (length _points) s)
     (dolist (elem _points)
       (send elem :serialize s)
       )
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; uint8 _frame
     (setq _frame (sys::peek buf ptr- :char)) (incf ptr- 1)
   ;; uint8 _mode
     (setq _mode (sys::peek buf ptr- :char)) (incf ptr- 1)
   ;; geometry_msgs/Point[] _points
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _points (let (r) (dotimes (i n) (push (instance geometry_msgs::Point :init) r)) r))
     (dolist (elem- _points)
     (send elem- :deserialize buf ptr-) (incf ptr- (send elem- :serialization-length))
     ))
   ;;
   self)
  )

(intern "*E_INVALID_POLYGON*" (find-package "AVIOT_SRVS::SETFENCERESPONSE"))
(shadow '*E_INVALID_POLYGON* (find-package "AVIOT_SRVS::SETFENCERESPONSE"))
(defconstant aviot_srvs::SetFenceResponse::*E_INVALID_POLYGON* -1)
(intern "*E_INVALID_MODE*" (find-package "AVIOT_SRVS::SETFENCERESPONSE"))
(shadow '*E_INVALID_MODE* (find-package "AVIOT_SRVS::SETFENCERESPONSE"))
(defconstant aviot_srvs::SetFenceResponse::*E_INVALID_MODE* -2)
(intern "*E_INVALID_FRAME*" (find-package "AVIOT_SRVS::SETFENCERESPONSE"))
(shadow '*E_INVALID_FRAME* (find-package "AVIOT_SRVS::SETFENCERESPONSE"))
(defconstant aviot_srvs::SetFenceResponse::*E_INVALID_FRAME* -3)
(defclass aviot_srvs::SetFenceResponse
  :super ros::object
  :slots (_polygon_id ))

(defmethod aviot_srvs::SetFenceResponse
  (:init
   (&key
    ((:polygon_id __polygon_id) 0)
    )
   (send-super :init)
   (setq _polygon_id (round __polygon_id))
   self)
  (:polygon_id
   (&optional __polygon_id)
   (if __polygon_id (setq _polygon_id __polygon_id)) _polygon_id)
  (:serialization-length
   ()
   (+
    ;; int32 _polygon_id
    4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; int32 _polygon_id
       (write-long _polygon_id s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; int32 _polygon_id
     (setq _polygon_id (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;;
   self)
  )

(defclass aviot_srvs::SetFence
  :super ros::object
  :slots ())

(setf (get aviot_srvs::SetFence :md5sum-) "41ce895a5fb6ebba9f054f5ad0e7c544")
(setf (get aviot_srvs::SetFence :datatype-) "aviot_srvs/SetFence")
(setf (get aviot_srvs::SetFence :request) aviot_srvs::SetFenceRequest)
(setf (get aviot_srvs::SetFence :response) aviot_srvs::SetFenceResponse)

(defmethod aviot_srvs::SetFenceRequest
  (:response () (instance aviot_srvs::SetFenceResponse :init)))

(setf (get aviot_srvs::SetFenceRequest :md5sum-) "41ce895a5fb6ebba9f054f5ad0e7c544")
(setf (get aviot_srvs::SetFenceRequest :datatype-) "aviot_srvs/SetFenceRequest")
(setf (get aviot_srvs::SetFenceRequest :definition-)
      "
uint8 frame
uint8 FRAME_GLOBAL = 0
uint8 FRAME_LOCAL_NED = 1
uint8 FRAME_LOCAL_ENU = 4
uint8 FRAME_GLOBAL_INT = 5
uint8 FRAME_LOCAL_OFFSET_NED = 7

uint8 mode
uint8 MODE_DENY = 0
uint8 MODE_ALLOW = 1

geometry_msgs/Point[] points

================================================================================
MSG: geometry_msgs/Point
# This contains the position of a point in free space
float64 x
float64 y
float64 z
---
int32 polygon_id
int32 E_INVALID_POLYGON = -1
int32 E_INVALID_MODE = -2
int32 E_INVALID_FRAME = -3

")

(setf (get aviot_srvs::SetFenceResponse :md5sum-) "41ce895a5fb6ebba9f054f5ad0e7c544")
(setf (get aviot_srvs::SetFenceResponse :datatype-) "aviot_srvs/SetFenceResponse")
(setf (get aviot_srvs::SetFenceResponse :definition-)
      "
uint8 frame
uint8 FRAME_GLOBAL = 0
uint8 FRAME_LOCAL_NED = 1
uint8 FRAME_LOCAL_ENU = 4
uint8 FRAME_GLOBAL_INT = 5
uint8 FRAME_LOCAL_OFFSET_NED = 7

uint8 mode
uint8 MODE_DENY = 0
uint8 MODE_ALLOW = 1

geometry_msgs/Point[] points

================================================================================
MSG: geometry_msgs/Point
# This contains the position of a point in free space
float64 x
float64 y
float64 z
---
int32 polygon_id
int32 E_INVALID_POLYGON = -1
int32 E_INVALID_MODE = -2
int32 E_INVALID_FRAME = -3

")



(provide :aviot_srvs/SetFence "41ce895a5fb6ebba9f054f5ad0e7c544")


