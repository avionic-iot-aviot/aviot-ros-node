
(cl:in-package :asdf)

(defsystem "aviot_srvs-srv"
  :depends-on (:roslisp-msg-protocol :roslisp-utils :geometry_msgs-msg
)
  :components ((:file "_package")
    (:file "DeleteFence" :depends-on ("_package_DeleteFence"))
    (:file "_package_DeleteFence" :depends-on ("_package"))
    (:file "ResetFence" :depends-on ("_package_ResetFence"))
    (:file "_package_ResetFence" :depends-on ("_package"))
    (:file "SetFence" :depends-on ("_package_SetFence"))
    (:file "_package_SetFence" :depends-on ("_package"))
  ))