import { LOGGED } from "../constants"
import firebase from "../firebase";

const auth = firebase.auth();
const setLoggedUser = (logged) => ({
	type: LOGGED,
	logged
});

export const getUser = (ifLogged, ifNotlogged) => dispatch => {
	auth.onAuthStateChanged((user) => {
		if (user) {
			const userObj = { email: user.email, uid: user.uid };
			dispatch(setLoggedUser(userObj))
			if (ifLogged && typeof ifLogged == "function") ifLogged(userObj);
		} else {
			dispatch(setLoggedUser({}))
			if (ifNotlogged && typeof ifNotlogged == "function") ifNotlogged();
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

//logueo con google
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

export const getUserGoogle = () => dispatch => {
	return firebase.auth().signInWithPopup(provider)
		.then(function (result) {
			const user = result.user;
			dispatch(setLoggedUser(user.email))
			dispatch(getUser())
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = error.credential;
			console.log(errorCode, errorMessage, email, credential);
		});
}

//desloguearse de cualquier forma
export const LogoutUser = () => {
	return firebase.auth().signOut()
		.then(() => {
			console.log('Deslogueado con exito');
		})
		.catch((error) => {
			console.log(error)
		})
}