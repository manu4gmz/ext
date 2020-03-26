import axios from "axios"
import firebase from "../firebase";
const auth = firebase.auth();

const registerFirebase = async (email, password) => {
  await auth.createUserWithEmailAndPassword(email, password)
}

export const registerUser = (body) => dispatch => {
  console.log('desde el axios', body)
  registerFirebase(body.email, body.password)

  return axios
    .post(`https://ext-api.web.app/api/us-central1/app/api/users/register`, { body })
    .then(data => data)
    .catch(error => console.log(error))
}
