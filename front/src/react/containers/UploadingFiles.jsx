import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, ImageBackground, Alert } from 'react-native'
import styled from "styled-components/native"
import { uploadFiles } from "../../redux/actions/files";
import { addPhotos, addSpace } from '../../redux/actions/spaces'
import { connect } from "react-redux";

const LoadingView = ({ navigation, route, uploadFiles, addSpace }) => {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const { space, otherImages } = route.params;

		uploadFiles(space.photos, setProgress)
			.then((files) => {
				const totalImages = files.concat(otherImages || []);

				//console.log("-------------------------------------\n\nPHOTOS QUE UPLOADEA\n\n",totalImages);
				
				addSpace({ ...space, photos: totalImages, visible: true })
					.then((propertyId) => {
						navigation.replace("SingleView", { propertyId })
					})
			})
			.catch(err => {
				console.log("ERRROR AL UPLODEAR IMAGEN \n ------------------------\n",err)
				navigation.replace("SpaceForm")
			})

	}, [])


	return (
		<Background
			source={require('../../public/images/imagen_fondo_mobile_az.jpg')}
			resizeMode='cover'
		>
			<View style={{ padding: 10, alignItems: "center" }}>
				<Logo source={require('../../public/images/isologotipo-az.png')} />
				<WhiteText>Gracias!!</WhiteText>
				<WhiteText>Espere unos momentos, mientras procesamos su publicación.</WhiteText>
				<WhiteText>{progress}%</WhiteText>
			</View>
		</Background>
	)
}


const mapDispatchToProps = (dispatch) => ({
	uploadFiles: (...params) => dispatch(uploadFiles(...params)),
	addSpace: (body) => dispatch(addSpace(body))

})

export default connect(null, mapDispatchToProps)(LoadingView);

const WhiteText = styled.Text`
	font-size: 18px;
	font-weight: 100;
	color:white;
	margin-top: 15px;
	width: 60%;
	max-width: 330px;
	text-align: center;
`

const Logo = styled.Image`
	margin-bottom: 50px;
	height: 64px;
    width: 150px;
`
const Background = styled.ImageBackground`
	/*background-color: #ccc;*/
	justify-content: center;
	flex: 1;
	position: absolute;
	width: 100%;
	height: 100%;
`