
export default {
  redis: {
    host: process.env.REDIS_SERVICE_HOST || 'localhost',
    port: process.env.REDIS_SERVICE_PORT || 6379
  },
  ros: {
    nodeId: "test_"+process.env.TEST_NUMBER,
    otherId: "test_"+(3-process.env.TEST_NUMBER)
  },
  janus: {
    apiUrl: process.env.RESTAPI_SERVICE_HOST ? `http://${process.env.RESTAPI_SERVICE_HOST}:${process.env.RESTAPI_SERVICE_PORT}/api/v1.0` : 'http://192.168.1.25:5000/api/v1.0'
  }
}
