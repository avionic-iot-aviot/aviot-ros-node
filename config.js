
export default {
  redis: {
    host: process.env.REDIS_SERVICE_HOST || 'localhost',
    port: process.env.REDIS_SERVICE_PORT || 6379
  },
  janus: {
    apiUrl: process.env.RESTAPI_SERIVCE_HOST ? `http://${process.env.RESTAPI_SERIVCE_HOST}:${process.env.JANUS_API_SERIVCE_PORT}/api/v1.0` : 'http://192.168.1.24:5000/api/v1.0'
  }
}
