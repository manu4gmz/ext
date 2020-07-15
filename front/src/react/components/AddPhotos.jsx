import React, { Component, useEffect, useState } from 'react';
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import styled from "styled-components/native";
import { connect } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import { removePicture, addPicture, setPictures } from "../../redux/actions/files";
import { Camera } from 'expo-camera';

const AddPhotos = ({ title, text, navigation, onChange, removePicture, addPicture, pictures, images, setPictures, name }) => {

	const [hasCameraRoll, setHasCameraRoll] = useState(null);
	const [hasCamera, setHasCamera] = useState(null);

	useEffect(() => {
		(async () => {
		  const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
		  setHasCameraRoll(status === 'granted');
		})();
		(async () => {
			try {
				const { status } = await Camera.requestPermissionsAsync();
				setHasCamera(status === 'granted');
			}
			catch(err){
			}
		  })();
	}, []);

	function getFromGallery() {
		ImagePicker.launchImageLibraryAsync({
		  	allowsEditing: true,
			allowsMultipleSelection: true,
			aspect: [500, 380]
		})
		  .then(data => {
			if (data.cancelled) return;
			addPicture({
				uri: data.uri,
				height: data.height,
				width: data.width,
				new: true,
			})
		})
	}

	useEffect(() => {
		//pictures?.length && onChange(pictures.map(pic => pic.url));
		onChange(pictures);
		//name ? onChange(pictures) : onChange((form) => ({ ...form, [text]: { value: pictures, error: null } }))
	}, [pictures]);

	useEffect(() => {
		setPictures(images ? images.map(uri => ({ uri })) : []);
		window.addPhoto = (pic) => addPicture({ uri: pic });
	}, [images]);

	return <View>
		<PicsRoll horizontal={true}>
			{
				pictures.map((pic, i) => {
					return <PicWrapper key={i} width={240 * (pic.width / pic.height)} height={240 * (pic.height / pic.width)}>
						<Pic source={{ uri: pic.uri }} />
						<ImgInteract>
							<TouchableOpacity onPress={() => removePicture(pic)}>
								<Icon source={require("../../public/icons/cross.png")} />
							</TouchableOpacity>
						</ImgInteract>
					</PicWrapper>
				})
			}
		</PicsRoll>
		<Row>
			<PhotosLabel>{pictures.length || 0}</PhotosLabel>
			{
				hasCamera ?
				<Photos onPress={()=>navigation.push("Camera")}>
					<PhotosText>+</PhotosText>
					<Icon source={require("../../public/icons/camera.png")} />
				</Photos>
				: null
			}
			{
				hasCameraRoll ?
				<Photos onPress={()=>getFromGallery()}>
					<PhotosText>+</PhotosText>
					<Icon source={require("../../public/icons/galery.png")} />
				</Photos>
				: null
			}
		</Row>
	</View>
}

const mapStateToProps = (state) => ({
	pictures: state.images
})

const mapDispatchToProps = (dispatch) => ({
	setPictures: (...params) => dispatch(setPictures(...params)),
	removePicture: (...params) => dispatch(removePicture(...params)),
	addPicture: (...params) => dispatch(addPicture(...params))
})


export default connect(mapStateToProps, mapDispatchToProps)(AddPhotos);



const PicsRoll = styled.ScrollView`
	flex-direction: row;
	margin: 10px 0;
	padding-bottom: 10px;
`

const PicWrapper = styled.View`
	width: ${props => props.width || "240"}px;
	height: ${props => props.height || "240"}px;
	margin-right: 10px;
	overflow: hidden;
	border-radius: 3px;
	background-color: white;
`

const Pic = styled.Image`
	flex: 1;
`
const ImgInteract = styled.View`
	position: absolute;
	margin-left: 5px;
	top: 5px;
`

const Icon = styled.Image`
	width: 30px;
	height: 30px;
	margin-top: 3px;
`

const Photos = styled.TouchableOpacity`
	width: 80px;
	border-radius: 50px;
	background-color: #4a94ea;
	height: 35px;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-self: center;
	margin-left: 12px;
`

const PhotosLabel = styled.Text`
	width: 35px;
	background-color: #d9d5c8;
	border-radius: 50px;
	height: 35px;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-self: center;
	margin-left: 0px;
	line-height: 35px;
	color: black;
	font-size: 16px;
	text-align: center;
`


const PhotosText = styled.Text`
	line-height: 35px;
	color: white;
	font-size: 16px;
	margin: 0 2px;
`

const Row = styled.View`
	flex-direction: row;
	justify-content: center;
`