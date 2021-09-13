;; Auto-generated. Do not edit!


(when (boundp 'aviot_srvs::ListFence)
  (if (not (find-package "AVIOT_SRVS"))
    (make-package "AVIOT_SRVS"))
  (shadow 'ListFence (find-package "AVIOT_SRVS")))
(unless (find-package "AVIOT_SRVS::LISTFENCE")
  (make-package "AVIOT_SRVS::LISTFENCE"))
(unless (find-package "AVIOT_SRVS::LISTFENCEREQUEST")
  (make-package "AVIOT_SRVS::LISTFENCEREQUEST"))
(unless (find-package "AVIOT_SRVS::LISTFENCERESPONSE")
  (make-package "AVIOT_SRVS::LISTFENCERESPONSE"))

(in-package "ROS")





(defclass aviot_srvs::ListFenceRequest
  :super ros::object
  :slots ())

(defmethod aviot_srvs::ListFenceRequest
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

(defclass aviot_srvs::ListFenceResponse
  :super ros::object
  :slots (_polygon_ids ))

(defmethod aviot_srvs::ListFenceResponse
  (:init
   (&key
    ((:polygon_ids __polygon_ids) (make-array 0 :initial-element 0 :element-type :integer))
    )
   (send-super :init)
   (setq _polygon_ids __polygon_ids)
   self)
  (:polygon_ids
   (&optional __polygon_ids)
   (if __polygon_ids (setq _polygon_ids __polygon_ids)) _polygon_ids)
  (:serialization-length
   ()
   (+
    ;; int32[] _polygon_ids
    (* 4    (length _polygon_ids)) 4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; int32[] _polygon_ids
     (write-long (length _polygon_ids) s)
     (dotimes (i (length _polygon_ids))
       (write-long (elt _polygon_ids i) s)
       )
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; int32[] _polygon_ids
   (let (n)
     (setq n (sys::peek buf ptr- :integer)) (incf ptr- 4)
     (setq _polygon_ids (instantiate integer-vector n))
     (dotimes (i n)
     (setf (elt _polygon_ids i) (sys::peek buf ptr- :integer)) (incf ptr- 4)
     ))
   ;;
   self)
  )

(defclass aviot_srvs::ListFence
  :super ros::object
  :slots ())

(setf (get aviot_srvs::ListFence :md5sum-) "f34d918e24ff52b99229c78d4dfce377")
(setf (get aviot_srvs::ListFence :datatype-) "aviot_srvs/ListFence")
(setf (get aviot_srvs::ListFence :request) aviot_srvs::ListFenceRequest)
(setf (get aviot_srvs::ListFence :response) aviot_srvs::ListFenceResponse)

(defmethod aviot_srvs::ListFenceRequest
  (:response () (instance aviot_srvs::ListFenceResponse :init)))

(setf (get aviot_srvs::ListFenceRequest :md5sum-) "f34d918e24ff52b99229c78d4dfce377")
(setf (get aviot_srvs::ListFenceRequest :datatype-) "aviot_srvs/ListFenceRequest")
(setf (get aviot_srvs::ListFenceRequest :definition-)
      "---
int32[] polygon_ids

")

(setf (get aviot_srvs::ListFenceResponse :md5sum-) "f34d918e24ff52b99229c78d4dfce377")
(setf (get aviot_srvs::ListFenceResponse :datatype-) "aviot_srvs/ListFenceResponse")
(setf (get aviot_srvs::ListFenceResponse :definition-)
      "---
int32[] polygon_ids

")



(provide :aviot_srvs/ListFence "f34d918e24ff52b99229c78d4dfce377")


