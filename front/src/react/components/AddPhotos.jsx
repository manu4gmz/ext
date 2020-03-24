import React, { Component, useEffect, useState } from 'react';
import { Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import styled from "styled-components/native";

export default ({title,text, navigation, onChange})=> {

	const [pictures, setPictures] = useState([{uri:"https://placeholder.com/500",width:500, height: 500}]);

	function onTake (pic) {
		setPictures((pics)=>{
			console.log(pic.uri,Object.keys(pics).map(a => pics[a].uri));
			return pics.concat([pic]);
		});
		console.log({uri: pic.uri});
		console.log(Object.keys(pictures).map(key => ({uri: pictures[key].uri})));
	}

	useEffect(()=>{
		onChange((form)=>({...form, [text]:{value:pictures, error: null}}))
	},[pictures])

	return <View>
      {title(text)}
    	<PicsRoll horizontal={true} style={{flex: 1}}>
		    {
		      	pictures.map((pic,i) => {
		      		return <PicWrapper key={i}  width={240*(pic.width/pic.height)} height={240*(pic.height/pic.width)}>
		      			<Pic source={{uri: pic.uri}}/>
		      			<ImgInteract>
		      				<TouchableOpacity onPress={()=>setPictures(pics => pics.filter(p => p.uri != pic.uri))}>
		      					<Icon source={require("../../public/icons/cross.png")}/>
		      				</TouchableOpacity>
		      			</ImgInteract>
		      		</PicWrapper>
		      	})
		    }
    	</PicsRoll>
    	<Photos onPress={()=>navigation.push("Camera", {onTake})}>
		    <PhotosText>+</PhotosText> 
		    <Icon source={require("../../public/icons/camera.png")}/>
    		<PhotosText>({pictures.length || 0})</PhotosText>
    	</Photos>
  	</View>
}

const PicsRoll = styled.ScrollView`
	flex-direction: row;
	margin: 10px 0;
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