import { USERINFO } from '../constants'
import axios from 'axios'

const setUserInfo = (info) => ({
  type: USERINFO,
  info
})

export const getUserInfo = (id) => dispatch => {
  return axios
    .get(`https://ext-api.web.app/api/users/info/${id}`)
    .then(res => {
      dispatch(setUserInfo(res.data))
    })
    .catch(error => console.log(error))
}