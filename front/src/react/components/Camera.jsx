import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import styled from "styled-components/native";

export default function CameraView({route, navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);

  const {height, width} = Dimensions.get('window');
  const newWidth = height*(3/4);
  const widthOffset = -((newWidth-width)/2);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function takePicture() {
  	camera.takePictureAsync({base64: true})
  	.then(pic => {
  		//console.log("\n\n\n----- PICTURE -----\n\n\n",pic,"\n\n\n");
  		const { onTake } = route.params;
  		onTake(pic);

      //setRecent(pic);
      //setTimeout(()=>setRecent(null), 2000)
      navigation.pop();
  	})

  }

  return (
    <View style={{
        position:"relative", 
        flex: 1, 
        width: newWidth, 
        left: widthOffset,
        right: widthOffset
    }}>
      <Camera type={type} style={{flex: 1}} ref={cam => setCamera(cam)}>
        <Interact offset={-widthOffset}>
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
              takePicture()
            }}>
            <SnapIcon source={require("../../public/icons/camera.png")}/>
          </SnapButton>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Label ml={12} color="#b2b2b2">Cancel</Label>
          </TouchableOpacity>
        </Interact>
      </Camera>
    </View>
  );
}

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
  flex-direction: row;
  justify-content: center;
  align-content: center;
  align-items: flex-end;
  position: relative;
  bottom: 10px;
  width: 100%;
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

const RecentImg = styled.Image`
  width: ${props=>props.width || "120"}px;
  height: ${props=>props.height || "120"}px;
  right: 10px;
`