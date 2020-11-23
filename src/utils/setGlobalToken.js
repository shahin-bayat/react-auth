import axios from 'axios'

const setGlobalToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export default setGlobalToken
