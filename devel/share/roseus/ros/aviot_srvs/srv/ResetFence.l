;; Auto-generated. Do not edit!


(when (boundp 'aviot_srvs::ResetFence)
  (if (not (find-package "AVIOT_SRVS"))
    (make-package "AVIOT_SRVS"))
  (shadow 'ResetFence (find-package "AVIOT_SRVS")))
(unless (find-package "AVIOT_SRVS::RESETFENCE")
  (make-package "AVIOT_SRVS::RESETFENCE"))
(unless (find-package "AVIOT_SRVS::RESETFENCEREQUEST")
  (make-package "AVIOT_SRVS::RESETFENCEREQUEST"))
(unless (find-package "AVIOT_SRVS::RESETFENCERESPONSE")
  (make-package "AVIOT_SRVS::RESETFENCERESPONSE"))

(in-package "ROS")





(defclass aviot_srvs::ResetFenceRequest
  :super ros::object
  :slots ())

(defmethod aviot_srvs::ResetFenceRequest
  (:init
   (&key
    )
   (send-super :init)
   self)
  (:serialization-length
   ()
   (+
    0
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;;
   self)
  )

(defclass aviot_srvs::ResetFenceResponse
  :super ros::object
  :slots (_done ))

(defmethod aviot_srvs::ResetFenceResponse
  (:init
   (&key
    ((:done __done) 0)
    )
   (send-super :init)
   (setq _done (round __done))
   self)
  (:done
   (&optional __done)
   (if __done (setq _done __done)) _done)
  (:serialization-length
   ()
   (+
    ;; uint8 _done
    1
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; uint8 _done
       (write-byte _done s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; uint8 _done
     (setq _done (sys::peek buf ptr- :char)) (incf ptr- 1)
   ;;
   self)
  )

(defclass aviot_srvs::ResetFence
  :super ros::object
  :slots ())

(setf (get aviot_srvs::ResetFence :md5sum-) "f0fad9ccd7b64cd66ec986070ce0fd3f")
(setf (get aviot_srvs::ResetFence :datatype-) "aviot_srvs/ResetFence")
(setf (get aviot_srvs::ResetFence :request) aviot_srvs::ResetFenceRequest)
(setf (get aviot_srvs::ResetFence :response) aviot_srvs::ResetFenceResponse)

(defmethod aviot_srvs::ResetFenceRequest
  (:response () (instance aviot_srvs::ResetFenceResponse :init)))

(setf (get aviot_srvs::ResetFenceRequest :md5sum-) "f0fad9ccd7b64cd66ec986070ce0fd3f")
(setf (get aviot_srvs::ResetFenceRequest :datatype-) "aviot_srvs/ResetFenceRequest")
(setf (get aviot_srvs::ResetFenceRequest :definition-)
      "---
uint8 done

")

(setf (get aviot_srvs::ResetFenceResponse :md5sum-) "f0fad9ccd7b64cd66ec986070ce0fd3f")
(setf (get aviot_srvs::ResetFenceResponse :datatype-) "aviot_srvs/ResetFenceResponse")
(setf (get aviot_srvs::ResetFenceResponse :definition-)
      "---
uint8 done

")



(provide :aviot_srvs/ResetFence "f0fad9ccd7b64cd66ec986070ce0fd3f")


