import axios from "axios";
import store from './store';
import firebase from "./firebase";
const auth = firebase.auth();

axios.interceptors.request.use(
	async config => {
		
		if (config.url[0] == "/") config.url = "http://localhost:5000/ext-api/us-central1/app/api" + config.url;
        //if (config.url[0] == "/") config.url = "https://ext-api.web.app/api" + config.url;
		else return config;
		config.headers["Access-Control-Allow-Origin"] = "*";
		config.withCredentials = false;
		if (!auth.currentUser) return config;
		let idToken = store.getState().user.logged.idToken;
		if (!idToken) idToken = await auth.currentUser.getIdToken(true);
		config.headers['Authorization'] = idToken;
        return config;
	},
	error => {
		Promise.reject(error)
    }
);

export default axios//.create({baseURL:"ndea"})