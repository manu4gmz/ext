import axios from "axios"
import { LOGGED } from "../constants"
import firebase from "../firebase";

const auth = firebase.auth();

const setLoggedUser = (user) => ({
	type: LOGGED,
	user
});

export const getUser = () => dispatch => {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			dispatch(setLoggedUser({ email: user.email }))
			console.log("user:", user)
		} else {
			dispatch(setLoggedUser({}))

			console.log("no esta logueade");
		}
	});
}

export const logUser = (email, password) => dispatch => {
	return auth.signInWithEmailAndPassword(email, password)
		.then(() => dispatch(getUser()))
		.catch((error) => {
			console.log(error);
			let result = {};
			switch (error.code) {
				case "auth/invalid-email":
					result = { target: "email", msg: "Ese email no es válido" };
					break;
				case "auth/wrong-password":
					result = { target: "pass", msg: "Contraseña incorrecta" };
					break;
				case "auth/user-not-found":
					result = { target: "email", msg: "Ese correo no está registrado" }
					break;
				case "auth/too-many-requests":
					result = { target: "all", msg: "Intente de nuevo mas tarde." }
					break;
			}
			return result;
		})
};

//logueo con facebook
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export const getUserGoogle = () => dispatch => {
	return firebase.auth().signInWithPopup(provider)
		.then(function (result) {
			const user = result.user;
			dispatch(setLoggedUser(user.email))
			dispatch(getUser())
		})
		.catch(function (error) {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			const credential = error.credential;
			// ...
		});
}