import axios from "axios"
import { LOGGED } from "../constants"

import firebase from "../firebase";

//const db = firebase.firestore();
const auth = firebase.auth();

const setLoggedUser = (user) => ({
    type: LOGGED,
    user
});

export const getUser = () => dispatch => {
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    dispatch(setLoggedUser({email:user.email}))
	    console.log("user:", user)
	  } else {
	    dispatch(setLoggedUser({}))

	    console.log("no esta logueade");
	   }
	});
}

export const logUser = (email, password) => dispatch => {

    
	return auth.signInWithEmailAndPassword(email,password)
		.then(()=>dispatch(getUser()))
		.catch((error)=> {
			console.log(error);
			let result = {};
			switch(error.code) {
				case "auth/invalid-email":
					result = { target: "email", msg: "Ese email no es válido" };
					break;
				case "auth/wrong-password":
					result = { target: "pass", msg: "Contraseña incorrecta" };
					break;
				case "auth/user-not-found":
					result = { target: "email", msg:"Ese correo no está registrado" }
					break;
				case "auth/too-many-requests":
					result = { target: "all", msg:"Intente de nuevo mas tarde." }
					break;
			}
			return result;
		})
};