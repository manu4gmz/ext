import axios from "axios"

export const registerUser = (body) => dispatch => {
  return axios
    .post(`https://ext-api.web.app/api/users/register`, { body })
    .then(data => data)
    .catch(error => console.log(error))
}
