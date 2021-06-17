;; Auto-generated. Do not edit!


(when (boundp 'aviot_srvs::DeleteFence)
  (if (not (find-package "AVIOT_SRVS"))
    (make-package "AVIOT_SRVS"))
  (shadow 'DeleteFence (find-package "AVIOT_SRVS")))
(unless (find-package "AVIOT_SRVS::DELETEFENCE")
  (make-package "AVIOT_SRVS::DELETEFENCE"))
(unless (find-package "AVIOT_SRVS::DELETEFENCEREQUEST")
  (make-package "AVIOT_SRVS::DELETEFENCEREQUEST"))
(unless (find-package "AVIOT_SRVS::DELETEFENCERESPONSE")
  (make-package "AVIOT_SRVS::DELETEFENCERESPONSE"))

(in-package "ROS")





(defclass aviot_srvs::DeleteFenceRequest
  :super ros::object
  :slots (_polygon_id ))

(defmethod aviot_srvs::DeleteFenceRequest
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

(defclass aviot_srvs::DeleteFenceResponse
  :super ros::object
  :slots (_done ))

(defmethod aviot_srvs::DeleteFenceResponse
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

(defclass aviot_srvs::DeleteFence
  :super ros::object
  :slots ())

(setf (get aviot_srvs::DeleteFence :md5sum-) "1b7306db77eae79388b7799e8c563252")
(setf (get aviot_srvs::DeleteFence :datatype-) "aviot_srvs/DeleteFence")
(setf (get aviot_srvs::DeleteFence :request) aviot_srvs::DeleteFenceRequest)
(setf (get aviot_srvs::DeleteFence :response) aviot_srvs::DeleteFenceResponse)

(defmethod aviot_srvs::DeleteFenceRequest
  (:response () (instance aviot_srvs::DeleteFenceResponse :init)))

(setf (get aviot_srvs::DeleteFenceRequest :md5sum-) "1b7306db77eae79388b7799e8c563252")
(setf (get aviot_srvs::DeleteFenceRequest :datatype-) "aviot_srvs/DeleteFenceRequest")
(setf (get aviot_srvs::DeleteFenceRequest :definition-)
      "int32 polygon_id
---
uint8 done

")

(setf (get aviot_srvs::DeleteFenceResponse :md5sum-) "1b7306db77eae79388b7799e8c563252")
(setf (get aviot_srvs::DeleteFenceResponse :datatype-) "aviot_srvs/DeleteFenceResponse")
(setf (get aviot_srvs::DeleteFenceResponse :definition-)
      "int32 polygon_id
---
uint8 done

")



(provide :aviot_srvs/DeleteFence "1b7306db77eae79388b7799e8c563252")


