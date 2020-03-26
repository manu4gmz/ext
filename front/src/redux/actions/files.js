import axios from "axios"
import { ADD_PICTURE, REMOVE_PICTURE } from "../constants"
import firebase from "../firebase";
import Bluebird from "bluebird";
import { Alert } from "react-native";

const storage = firebase.storage();

export const uploadFiles = (files, progessCb) => (dispatch, getState) => {
	const user = getState().user.logged;
	const uid = user.uid;

	console.log("Al action le llegaron "+files.length+" fotos.")

	let progress = [];

	return Bluebird.all(
		files.map((file,i) => {

			return fetch(file.uri)
			.then(response => response.blob())
			.then(blob => {
				const ref = storage.ref(`/images/${uid}/photo_${i}`);
				const uploadTask= ref.put(blob);

				return new Promise((res, rej)=>{

					uploadTask.on('state_changed', function(snapshot){
					  progress[i] = Math.floor(((snapshot.bytesTransferred / snapshot.totalBytes) * 100)/files.length);
					  progessCb(progress.reduce((acc, num) => acc + num));
					}, function(error) {
					  rej({file, error});
					}, function() {
					  uploadTask.snapshot.ref.getDownloadURL()
					  .then(function(downloadURL) {
					  	res(downloadURL);
					  });
					});
				})


			})
		})
	)
	.then(data => {
		console.log("Data from fb storage",data)
		return data;
	})

	//firebase.storage().ref('/your/path/here').child('file_name')
	//.putString(your_base64_image, ‘base64’, {contentType:’image/jpg’});

}


export const addPicture = (picture) => ({
	type: ADD_PICTURE,
	picture
})

export const removePicture = (picture) => ({
	type: REMOVE_PICTURE,
	picture
})