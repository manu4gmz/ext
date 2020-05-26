import axios from "axios";
import store from './index';
import firebase from "./firebase";

const auth = firebase.auth();


axios.interceptors.request.use(
	config => {
		return new Promise((res, rej) => {

			if (config.url[0] == "/") config.url = "http://localhost:5000/ext-api/us-central1/app/api" + config.url;
			else return config;
			//if (config.url[0] == "/") config.url = "https://ext-api.web.app/api" + config.url;
			if (!auth.currentUser) return config;
			let idToken = store.getState().users.logged.idToken;
			if (!idToken) {

				auth.currentUser.getIdToken(true)
				.then(idToken => {
					config.headers['Authorization'] = idToken;
					res(config);

				});
			}
			else {
				config.headers['Authorization'] = idToken;
				res(config);
			}
			
		})
	},
	error => {
		Promise.reject(error)
    }
);

export default axios//.create({baseURL:"ndea"})