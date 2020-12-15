import Axios from 'axios'
import config from '../../../config'

const axios = Axios.create({
  baseURL: config.janus.apiUrl,
  /* other custom settings */
});


export const createVideoStream = (copterId) =>
  axios.post('/streaming_endpoint', {serial: copterId, audio: true})

export const deleteVideoStream = (feedId) =>
  axios.delete(`/streaming_endpoint/${feedId}`)

export const createVideoRoom = (copterId) =>
  axios.post('/videoroom', {label: `${copterId}-${(Math.random() * 10000) + 1}`})

export const deleteVideoRoom = (videoroomName) =>
  axios.delete(`/videoroom/${videoroomName}`)
