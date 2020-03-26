import React, { Component, useEffect, useState } from 'react';
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import styled from "styled-components/native";
import { connect } from "react-redux";
import { removePicture, addPicture } from "../../redux/actions/files";

const AddPhotos = ({title,text, navigation, onChange, removePicture, addPicture, pictures})=> {

	useEffect(()=>{
		onChange((form)=>({...form, [text]:{value:pictures, error: null}}))
	},[pictures])

    useEffect(()=>{
    window.addPhoto = (pic)=>addPicture(pic);
  },[])

    console.log(pictures);

	return <View>
      {title(text)}
    	<PicsRoll horizontal={true}>
		    {
		      	pictures.map((pic,i) => {
		      		return <PicWrapper key={i}  width={240*(pic.width/pic.height)} height={240*(pic.height/pic.width)}>
		      			<Pic source={{uri: pic.uri}}/>
		      			<ImgInteract>
		      				<TouchableOpacity onPress={()=>removePicture(pic)}>
		      					<Icon source={require("../../public/icons/cross.png")}/>
		      				</TouchableOpacity>
		      			</ImgInteract>
		      		</PicWrapper>
		      	})
		    }
    	</PicsRoll>
    	<Photos onPress={()=>navigation.push("Camera")}>
		    <PhotosText>+</PhotosText> 
		    <Icon source={require("../../public/icons/camera.png")}/>
    		<PhotosText>({pictures.length || 0})</PhotosText>
    	</Photos>
  	</View>
}

const mapStateToProps = (state) => ({
	pictures: state.images
})

const mapDispatchToProps = (dispatch) => ({
	removePicture: (...params)=>dispatch(removePicture(...params)),
	addPicture: (...params)=>dispatch(addPicture(...params))
})


export default connect(mapStateToProps, mapDispatchToProps)(AddPhotos);



const PicsRoll = styled.ScrollView`
	flex-direction: row;
	margin: 10px 0;
	padding-bottom: 10px;
`

const PicWrapper = styled.View`
	width: ${props=>props.width || "240"}px;
	height: ${props=>props.height || "240"}px;
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
	width: 45%;
	border-radius: 50px;
	background-color: #4a94ea;
	height: 35px;
	flex-direction: row;
	justify-content: center;
	align-content: center;
	align-self: center;
`

const PhotosText = styled.Text`
	line-height: 35px;
	color: white;
	font-size: 16px;
	margin: 0 2px;
`