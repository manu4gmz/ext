import firebase from "firebase";
//import firestore from "firebase/firestore";
//import storage from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCWv3QVEnTirYnhPN-xgN7pFSMPQHhr15c",
	authDomain: "ext-api.firebaseapp.com",
	databaseURL: "https://ext-api.firebaseio.com",
	projectId: "ext-api",
	storageBucket: "ext-api.appspot.com",
	messagingSenderId: "910305767737",
	appId: "1:910305767737:web:3afc21eda6944cf2ef38e8",
	measurementId: "G-HE5RQQ8N5Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;