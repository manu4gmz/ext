
import styled from "styled-components/native";
import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView  } from 'react-native'
import Button from "../ui/Button";
import { Animated, Easing } from "react-native";

export default ([modal, setModal]) => {

  
    return {

      Modal: ()=> { 
        const [fadeAnim] = useState(new Animated.Value(0))
        
        
        useEffect(()=>{
          Animated.timing(fadeAnim, {
            toValue: modal ? 1 : 0,
            duration: 300,
          }).start();
        },[modal])
        
        if (!modal) return null;
        return <Wrapper visible={modal} onPress={()=>setModal(null)}>
          <Animated.View style={{
            opacity: fadeAnim, // Binds directly
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
              }),
            }],
          }}>
            <Modal underlayColor="white" onPress={()=>{}} style={{ shadowColor: "#000", shadowOffset: {width:0, height:3}, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}>
              <ScrollView>
                <View style={{paddingRight: 10}}>
                  { modal }
                </View>
              </ScrollView>
            </Modal>
          </Animated.View>
        </Wrapper>

    },

      call: (render) => {
      
        setModal(render)
      
      },
      hide: () => setModal(null),
  }

}



const Wrapper = styled.TouchableOpacity`
  position: absolute;
  z-index: 10;
  left: 0px;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  background-color: rgba(0,0,0,0.02);

`
const Modal = styled.TouchableHighlight`
  
  background-color: white;
  width: 75%;
  margin-top: 10px;
  max-width: 400px;
  align-self: center;
  margin-top: 20px;
  padding: 25px 10px 28px 20px;
  border-radius: 2px;
  height: 100%;
  max-height: 580px;

`

const Option = styled.TouchableHighlight`
  flex-direction: row;
  margin: 10px 0;
`

const Check = styled.View`
  border: solid 1px #cccccc;
  border-radius: 50px;
  height: 20px;
  width: 20px;
  margin: 3px 0 0 10px;
  justify-content: center;
`

const Dot = styled.Text`
  height: 10px;
  width: 10px;
  align-self: center;
  background-color: #2cca31;
  border-radius: 40px;
`

const Label = styled.View`
  flex: 1;
  margin-left: 15px; 
`

const LabelText = styled.Text`
  margin-bottom: 15px;
  font-size: 14px;
`

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #cccccc;
  margin-bottom: 4px;
`

const StyledTitles = styled.Text`
  color : #000144;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 12px;
`

const PickerHeader = styled.Text`
  color : #000144;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 5px;
`

const RoundedButton = styled(Button)`
  border-radius: 30px;
`

const DenyButton = styled(RoundedButton)`
  background-color: white;
    color: #b2b2b2
`

const StyledInput = styled.Text`
  color: #262626;
  padding-left : 3%;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  margin : 5px 0;
  background-color: white;
  border: solid 1px #bfbfbf;
`

const Footer = styled.View`
  flex-direction: row;
  margin-top: 12px;
  height: 35px;
`