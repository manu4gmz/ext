//uploadFiles(form["Agregar fotos"].value, (progress)=>console.log(progress))

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, ImageBackground, Alert } from 'react-native'
import styled from "styled-components/native"
import { uploadFiles } from "../../redux/actions/files";
import { connect } from "react-redux";

const LoadingView = ({ navigation, route, uploadFiles }) => {

	const [progress, setProgress] = useState(0);

	useEffect(()=>{
		const { images, propertyId } = route.params;

		uploadFiles(images, propertyId, setProgress)
			.then((files)=>{
				console.log(files)

			  /*
			    -------------------------------------------------------------------------

			      En "files" te llega un arreglo con todos los links del espacio.

			      Aca yo haría un pedido a alguna ruta para añadirle las imagenes, y 
			      por ultimo un navigate a la vista del espacio.

			  */

				navigation.navigate("Home")
			})
			.catch(err => {

				navigation.navigate("SpaceForm")

			})

	},[])


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
	uploadFiles: (...params)=>dispatch(uploadFiles(...params))
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
	backgroundColor: #ccc;
	justify-content: center;
	flex: 1;
	position: absolute;
	width: 100%;
	height: 100%;
`