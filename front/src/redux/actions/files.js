import axios from "axios"
import { ADD_PICTURE, REMOVE_PICTURE, SET_PICTURES } from "../constants"
import firebase from "../firebase";
import Bluebird from "bluebird";
import { Alert } from "react-native";

const storage = firebase.storage();

export const uploadFiles = (files, propId = 1, progessCb) => (dispatch, getState) => {
	const user = getState().user.logged;
	const uid = user.uid;

	console.log("Al action le llegaron " + files.length + " fotos.")

	let progress = [];

	return Bluebird.all(
		files.map((file, i) => {

			return fetch(file.uri)
				.then(response => response.blob())
				.then(blob => {
					const ref = storage.ref(`/images/${uid}/${propId}/${(new Date()).getTime()}`);
					const uploadTask = ref.put(blob);

					return new Promise((res, rej) => {

						uploadTask.on('state_changed', function (snapshot) {
							progress[i] = Math.floor(((snapshot.bytesTransferred / snapshot.totalBytes) * 100) / files.length);
							progessCb(progress.reduce((acc, num) => acc + num));
						}, function (error) {
							rej({ file, error });
						}, function () {
							uploadTask.snapshot.ref.getDownloadURL()
								.then(function (downloadURL) {
									res(downloadURL);
								});
						});
					})


				})
		})
	)
		.then(data => {
			return data;
		})
}

export const setPictures = (pictures) => ({
	type: SET_PICTURES,
	pictures
})

export const addPicture = (picture) => ({
	type: ADD_PICTURE,
	picture
})

export const removePicture = (picture) => ({
	type: REMOVE_PICTURE,
	picture
})