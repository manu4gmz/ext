import axios from "axios"
import firebase from "../firebase";
const auth = firebase.auth();
import api from "../api";

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

  return api
    .post(`/users/register`, bodyUpdate)
    .then(data => data)
    .catch(error => console.log(error))
}

