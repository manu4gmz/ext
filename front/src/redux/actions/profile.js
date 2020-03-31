import { USERINFO } from '../constants'
import axios from 'axios'

const setUserInfo = (info) => ({
  type: USERINFO,
  info
})

export const getInfo = (mail) => dispatch => {

  return axios
    .get(`http://localhost:5000/ext-api/us-central1/app/api/users/info/${mail}`)
    .then(res => dispatch(setUserInfo(res.data)))
    .catch(error => console.log(error))
}