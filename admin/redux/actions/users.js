import { SET_LOGGED, SET_USERS } from "../constants"
import firebase from "../firebase";
import api from '../api'

const auth = firebase.auth();

const setLoggedUser = (user) => ({
	type: SET_LOGGED,
	user
});

const setUsers = (users) => ({
	type: SET_USERS,
	users
});

export const fetchUsers = (query = "") => dispatch => {
	return api.get(`/users?s=${query}`)
	.then(rta => rta.data)
	.then(data => {
		console.log(data);
		dispatch(setUsers(data));
	})
}

export const fetchUser = (id) => {
	return api.get(`/users/info/${id}`)
	.then(rta => rta.data)
	.then(data => {
		return data;
	})
}

const fetchLoggedUser = () => (dispatch,getState) => {
	return api.get("/users/authenticate")
		.then(rta => rta.data)
		.then(user => {
			console.log(user);
			dispatch(setLoggedUser({
				...getState().users.logged,
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

						if (user && user.admin != true) {
							if (ifNotlogged && typeof ifNotlogged == "function") ifNotlogged({ target: "all", msg: "Esta cuenta no es administrador." });
							return dispatch(setLoggedUser({ notLogged: true }));
						}

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
			dispatch(setLoggedUser({ notLogged: true }))
			if (ifNotlogged && typeof ifNotlogged == "function") ifNotlogged();
		}
	});
}

export const logUser = (email, password, afterLogged, errorCb) => dispatch => {
	console.log("I tried!")
	return auth.signInWithEmailAndPassword(email, password)
		.then(() => dispatch(getUser(afterLogged, errorCb)))
		.catch((error) => {
			console.log(error, error.code);
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
			errorCb(result)
			return result;
		})
};



//desloguearse de cualquier forma
export const logout = (cb) => dispatch => {
	return firebase.auth().signOut()
		.then(() => {
			dispatch(setLoggedUser({notLogged: true}))
			cb();
		})
		.catch((error) => {
			console.log(error)
		})
}

