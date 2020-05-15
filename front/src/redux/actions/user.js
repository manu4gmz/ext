import { LOGGED, USERPROPERTIES, USERFAVS } from "../constants"
import firebase from "../firebase";
import api from '../api'
import {getUserInfo} from "./profile"; 


const auth = firebase.auth();

const setLoggedUser = (logged) => ({
	type: LOGGED,
	logged
});

const userProperties = (properties) => ({
	type: USERPROPERTIES,
	properties
});

const setFavSpaces = (properties) => ({
	type: USERFAVS,
	properties
});


const fetchLoggedUser = () => (dispatch,getState) => {
	return api.get("/users/authenticate")
		.then(rta => rta.data)
		.then(user => {
			console.log(user);
			dispatch(setLoggedUser({
				...getState().user.logged,
				...user
			}))
			return user;
		});
};

export const getUser = (ifLogged, ifNotlogged) => dispatch => {
	auth.onAuthStateChanged((user) => {
		if (user) {
		
			auth.currentUser.getIdToken(true).then(function(idToken) {
				api.get("/users/authenticate")
					.then(rta => rta.data)
					.then(user => {
						dispatch(setLoggedUser({
							...user,
							idToken
						}));
						if (ifLogged && typeof ifLogged == "function") ifLogged(user);
					})
					.catch(err => console.error(err))	
			}).catch(function(error) {
				console.error("Hubo un error con la autorización del usuario");
				if (ifNotlogged && typeof ifNotlogged == "function") ifNotlogged();
			});
			//const userObj = { email: user.email, uid: user.uid, properties: user.properties };
			/*
			
			fetchUser(user.uid)
				.then(userData => {
					const loggedUser = { ...userData, uid: user.uid };
					dispatch(setLoggedUser(loggedUser))
					if (ifLogged && typeof ifLogged == "function") ifLogged(loggedUser);
				})

				*/
		} else {
			dispatch(setLoggedUser({}))
			if (ifNotlogged && typeof ifNotlogged == "function") ifNotlogged();
		}
	});
}



//Agrega el favorito seleccionado
export const addFav = (id) => (dispatch,getState) => {
	return api.put(`/users/favs/${id}`)
		.then(() => {
			dispatch(fetchLoggedUser());
			dispatch(fetchFavs());
		});
}

//Te trae todos los espacios (completos) marcados como favortios por el user
export const fetchFavs = () => (dispatch,getState) => {
        return api.get(`/users/favorites/${getState().user.logged.uid}`)
            .then(res => {
				console.log(res.data)
				dispatch(setFavSpaces(res.data));
				return res.data;
			})
}



export const fetchProperties = (userId) => dispatch => {
	return api.get(`/properties/userSpaces`)
		.then(res => dispatch(userProperties(res.data)))
}

export const fetchUser = (userId) => {
	return api.get(`/users/info/${userId}`)
		.then((data) => data.data)
}

//Completar los datos en el form de ofrecer espacio
export const offerUser = (data) => (dispatch,getState) => {
	return api.put(`/users/ownerForm/${getState().user.logged.uid}`, data)
		.then((user) => {
			dispatch(fetchLoggedUser())
			//dispatch(setLoggedUser(data.data))
			//dispatch(fetUser)
		})
}

export const logUser = (email, password, afterLogged) => dispatch => {
	return auth.signInWithEmailAndPassword(email, password)
		.then(() => dispatch(getUser(afterLogged)))
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

			api
				.post(`/users/register`, bodyUpdate)
				.then(data => console.log(data))
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			const email = error.email;
			const credential = error.credential;
			console.log(errorCode, errorMessage, email, credential);
		})
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

export const searchUsers = (query) => {
	if (query.length < 3) return []; 
	return api.get(`/users?s=${query}`).then(rta => rta.data);
}