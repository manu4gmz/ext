import { LOGGED, USERPROPERTIES } from "../constants"
import firebase from "../firebase";
import axios from 'axios'

const auth = firebase.auth();

const setLoggedUser = (logged) => ({
	type: LOGGED,
	logged
});

const userProperties = (properties) => ({
	type: USERPROPERTIES,
	properties
})

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

export const fetchFav = (userId) => {
	return axios.get(`https://ext-api.web.app/api/users/favs/${userId}`)
		.then((data) => data)
}

export const fetchProperties = (userId) => dispatch => {
	return axios.get(`https://ext-api.web.app/api/properties/userSpaces/${userId}`)
		.then(res => dispatch(userProperties(res.data)))
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
			const index = user.displayName.indexOf(' ')
			const name = user.displayName.slice(0, index)
			const apellido = user.displayName.slice(index + 1)
			dispatch(setLoggedUser(user.email))
			dispatch(getUser())

			const bodyUpdate = {
				id: user.uid,
				email: user.email,
				firstName: name,
				lastName: apellido,
				favoritos: '',
				address: '',
				phoneNumber: '',
			}

			axios
				.post(`https://ext-api.web.app/api/users/register`, bodyUpdate)
				.then(data => console.log(data))
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