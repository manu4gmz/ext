import firebase from "../firebase";
import axios from 'axios'
import { getUser } from './user'
import { LOGGED } from "../constants"

const setLoggedUserFacebook = (logged) => ({
  type: LOGGED,
  logged
});

const providerFacebook = new firebase.auth.FacebookAuthProvider()
//https://developers.facebook.com/docs/facebook-login/web/enabling-https/
export const loginFacebook = () => dispatch => {
  return firebase.auth().signInWithPopup(providerFacebook)
    .then(function (result) {
      const token = result.credential.accessToken;
      const user = result.user;
      console.log(user)
    }).catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    })
}