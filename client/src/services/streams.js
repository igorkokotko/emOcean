import axios from 'axios'
const apiStreams = '/api/streams'

export const getStream = (streamId) => {
  return axios.get(`${apiStreams}/${streamId}`)
}

export const getStreamsList = () => {
  return axios.get(`${apiStreams}/`)
}

export const createStream = (stream) => {
  return axios.post(`${apiStreams}/`, stream)
}
