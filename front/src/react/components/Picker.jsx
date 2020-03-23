
import styled from "styled-components/native";
import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, TouchableHighlight, Alert, Button, StyleSheet  } from 'react-native'

export default ({yPos}) => {
const [modal, setModal] = useState(false);
  return (
    <View style={{ marginTop: 22 }}>
      <Button title="Show modal" onPress={()=>setModal(m=>!m)} />
      <Modal visible={modal} yPos={yPos}>
        <View style={{flex: 1}}>
          <Text>Hello!</Text>
          <Button title="Hide modal" onPress={()=>setModal(m => !m)} />
        </View>
      </Modal>
    </View>
  )
}
const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`

const Modal = styled.View`
  background-color: white;
  align-self: center;
  margin: 20px auto;
  top: ${props => -(props.yPos || 0)}px;
  width: 80%;
  max-width: 400px;
  position:absolute;
  opacity: ${props => props.visible ? "1.0" : "0.0"};
`