import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import styled from "styled-components/native";
import { connect } from "react-redux";
import { addPicture } from "../../redux/actions/files";

function CameraView({route, navigation, addPicture, pictures}) {
  const [ hasPermission, setHasPermission ] = useState(null);
  const [ hasCameraRoll, setHasCameraRoll ] = useState(null);
  const [ type, setType ] = useState(Camera.Constants.Type.back);
  const [ camera, setCamera ] = useState(null);
  const [ taking, setTaking ] = useState(false);
  const [ preview, setPreview ] = useState(80);
  const [ flash, setFlash ] = useState(null);


  const {height, width} = Dimensions.get('window');
  const newWidth = height*(3/4);
  const widthOffset = -((newWidth-width)/2);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync()
      setHasCameraRoll(status === 'granted');
    })();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function takePicture() {
    setTaking(true)
  	camera.takePictureAsync()
  	.then(pic => {
      setTaking(false)

      addPicture(pic);
      setFlash(true);
      setTimeout(()=>setFlash(null), 1000)
  	})
  }

  function getFromGallery() {
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      allowsMultipleSelection: true
    })
    .then(data => {
      addPicture({
        uri: data.uri,
        height: data.height,
        width: data.width
      })
    })
  }



  console.log(pictures)


  return (
    <View style={{
        position:"relative", 
        flex: 1, 
        width: newWidth, 
        left: widthOffset,
        right: widthOffset
    }}>
    {
      flash && <Flash />
    }
      <Back offset={widthOffset} onPress={() => navigation.pop()}>
        <BackIcon source={require('../../public/icons/back.png')} />
        <Label ml={12}>Volver</Label>
      </Back>
      <Camera type={type} style={{flex: 1}} ref={cam => setCamera(cam)}>
        <Interact>
            <PreviewRow horizontal={true} width={width} offset={widthOffset}>
              {
                pictures.map((pic, i) =>
                  <TouchableOpacity onPress={()=>setPreview(a => a==80 ? 240 : 80)} >
                    <PreviewImage key={i} source={{uri:pic.uri}} width={pic.width} height={pic.height} preview={preview}/>
                  </TouchableOpacity>
                )
              }
            </PreviewRow>

          <InteractRow>
            <TouchableOpacity
              onPress={() => setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )}
            >
              <Label>Flip</Label>
            </TouchableOpacity>
            <SnapButton
              onPress={() => {
                !taking && takePicture()
              }}>
              <SnapIcon source={require("../../public/icons/camera.png")}/>
            </SnapButton>

            <TouchableOpacity onPress={() => getFromGallery()}>
              <Label ml={12}>Galery</Label>
            </TouchableOpacity>
          </InteractRow>
        </Interact>
      </Camera>
    </View>
  );
}

const mapStateToProps = (state) => ({
  pictures: state.images
})

const mapDispatchToProps = (dispatch) => ({
  addPicture : (pic)=>dispatch(addPicture(pic))
})

export default connect(mapStateToProps, mapDispatchToProps)(CameraView);

/*

          <TouchableOpacity
          style={{
            flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Label style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Cancel </Label>
          </TouchableOpacity>*/

const Interact = styled.View`
  flex: 1;
  background-color: transparent;
  position: absolute;
  bottom: 10px;
  justify-content: center;
  width: 100%;
`

const InteractRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-content: center;
  flex: 1;
`

const SnapButton = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  padding: 20px;
  border-radius: 60px;
  background-color: #4a94ea;
  justify-content: center;
`
const SnapIcon = styled.Image`
    width: 38px;
  height: 38px;
  align-self: center;
`

const Label = styled.Text`
  font-size: 16px;
  color: white;
  line-height: 65px;
  width: 80px;
  text-align: center;

  color: ${p => p.color || "white"};
`

const Flash = styled.View`
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.2;
`

const PreviewRow = styled.ScrollView`
  flex-direction: row;
  width: ${p=>p.width}px;
  left: ${p=>-(p.offset)}px;
  position: relative;
  margin-bottom: 10px;
`

const PreviewImage = styled.Image`
  height: ${p=>p.preview}px;
  width: ${p=>p.preview*(p.width/p.height)}px;
  border: solid 2px white;
  border-radius: 2px;
  margin-left: 5px;

`

const Back = styled.TouchableOpacity`
  position: absolute;
  left: ${p=>-p.offset}px;
  top: 10px;
  z-index: 1;
  flex: 1;
  align-items: center;
  flex-direction: row;
`

const BackIcon = styled.Image`
  width: 25px;
  height: 25px;
  margin-left: 10px;
  margin-right: -15px;
`