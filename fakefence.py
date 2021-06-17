import rospy
from aviot_srvs.srv import SetFence, SetFenceRequest, SetFenceResponse, DeleteFence, DeleteFenceRequest, DeleteFenceResponse, ResetFence, ResetFenceRequest, ResetFenceResponse


def polygon2str(points):
    return str(["(%3.5f, %3.5f)" % (p.x, p.y) for p in points])


class FenceManager:

    _VALID_MODES = [SetFenceRequest.MODE_ALLOW, SetFenceRequest.MODE_DENY]
    _VALID_FRAMES = [SetFenceRequest.FRAME_GLOBAL, SetFenceRequest.FRAME_GLOBAL_INT,
                     SetFenceRequest.FRAME_LOCAL_ENU, SetFenceRequest.FRAME_LOCAL_NED,
                     SetFenceRequest.FRAME_LOCAL_OFFSET_NED]

    def __init__(self):
        self._next_id = 0
        self._polygons = {}

    def setFenceHandler(self, req):
        if len(req.points) < 3:
            print("Invalid polygon: {}".format(polygon2str(req.points)))
            return SetFenceResponse(SetFenceResponse.E_INVALID_POLYGON)

        if req.mode not in FenceManager._VALID_MODES:
            print("Invalid mode: {}".format(req.mode))
            return SetFenceResponse(SetFenceResponse.E_INVALID_MODE)

        if req.frame not in FenceManager._VALID_FRAMES:
            print("Invalid frame: {}".format(req.frame))
            return SetFenceResponse(SetFenceResponse.E_INVALID_FRAME)

        polygon_id = self._next_id
        self._next_id += 1
        self._polygons[polygon_id] = req.points
        print("New polygon: {} -> {}".format(polygon_id, polygon2str(req.points)))
        return SetFenceResponse(polygon_id)

    def deleteFenceHandler(self, req):
        if req.polygon_id not in self._polygons:
            print("Unknown polygon id: {}".format(req.polygon_id))
            return DeleteFenceResponse(False)

        poly = self._polygons[req.polygon_id]
        print("Deleted polygon: {} -> {}".format(req.polygon_id, polygon2str(poly)))
        del self._polygons[req.polygon_id]
        return DeleteFenceResponse(True)

    def resetFenceHandler(self, req):
        print("Deleted all polygons: {}".format(
            ", ".join([str(i) for i in self._polygons.keys()])))
        self._polygons = {}
        return ResetFenceResponse(True)


if __name__ == '__main__':
    rospy.init_node('fakefence')
    fm = FenceManager()
    sf = rospy.Service('mavros/fence/set', SetFence, fm.setFenceHandler)
    df = rospy.Service('mavros/fence/delete', DeleteFence, fm.deleteFenceHandler)
    rf = rospy.Service('mavros/fence/reset', ResetFence, fm.resetFenceHandler)
    rospy.spin()
