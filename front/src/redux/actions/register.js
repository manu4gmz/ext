import axios from "axios"
import firebase from "../firebase";
const auth = firebase.auth();

export const registerUser = (body) => async (dispatch) => {
  const user = await auth.createUserWithEmailAndPassword(body.email, body.password)
  console.log(user.user.uid)

  const bodyUpdate = {
    id: user.user.uid,
    email: body.email,
    firstName: body.firstName,
    lastName: body.lastName,
    favoritos: body.favoritos,
    address: body.address,
    phoneNumber: body.phoneNumber,
  }

  return axios
    .post(`https://ext-api.web.app/api/users/register`, bodyUpdate)
    .then(data => data)
    .catch(error => console.log(error))
}

