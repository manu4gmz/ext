import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, ImageBackground, Alert } from 'react-native'
import styled from "styled-components/native"
import { uploadFiles } from "../../redux/actions/files";
import { addPhotos, addSpace, editSpace } from '../../redux/actions/spaces';
import { fetchCoords } from '../../redux/actions/locations';
import { connect, useDispatch } from "react-redux";

export default ({ navigation, route }) => {
  const [progress, setProgress] = useState(0);
  const { space, editing, propertyId } = route.params;
  
  const dispatch = useDispatch();
  
  function editingSpace(space) {
    console.log(space.photos);
    const newPhotos = (space.photos || []).filter(a => a.new);
    const oldUrls = (space.photos || []).filter(a => !a.new).map(pic => pic.uri);

    const upload = newPhotos.length ? dispatch(uploadFiles(newPhotos)) : Promise.resolve([]);
    upload
      .then((files) => {
          console.log(files, oldUrls);
        const allPhotos = oldUrls.concat(files);
        dispatch(editSpace(propertyId, { ...space, photos: allPhotos }))
          .then((propertyId) => {
            navigation.replace("UserProperties", { propertyId })
          })
      })
  }

  function creatingSpace(space) {
    dispatch(uploadFiles(space.photos, setProgress))
      .then((files) => {
        //console.log("-------------------------------------\n\nPHOTOS QUE UPLOADEA\n\n",totalImages);
        
        dispatch(addSpace({ ...space, photos: files, visible: true }))
          .then((propertyId) => {
            navigation.replace("UserProperties", { propertyId })
          })
      })
      .catch(err => {
        console.log("ERRROR AL UPLODEAR IMAGEN \n ------------------------\n",err)
        navigation.replace("SpaceForm")
      })
  }

  useEffect(() => {

  let request = null;

  if (space.neighborhood && space.street && space.streetNumber) {
    const mapsData = {
      p: 'Ciudad Autónoma de Buenos Aires',
      n: space.neighborhood,
      s: space.street,
      sn: space.streetNumber
    };
      //addSpace(datosSpace)
      //  .then((propertyId) => {
    request = dispatch(fetchCoords(mapsData))
      .then((coordinates) =>{
        return { ...space, location: coordinates}
      })
  } 
  else request = Promise.resolve(space)


  request.then((space) => {  
    if (editing) editingSpace(space);
    else creatingSpace(space);
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