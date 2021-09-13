
(cl:in-package :asdf)

(defsystem "aviot_msgs-msg"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
               :std_msgs-msg
)
  :components ((:file "_package")
    (:file "ClockSync" :depends-on ("_package_ClockSync"))
    (:file "_package_ClockSync" :depends-on ("_package"))
    (:file "FenceStatus" :depends-on ("_package_FenceStatus"))
    (:file "_package_FenceStatus" :depends-on ("_package"))
  ))