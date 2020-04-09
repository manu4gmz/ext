
import styled from "styled-components/native";
import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView  } from 'react-native'
import Button from "../ui/Button";

export default ([modal, setModal],[value, setValue]) => {


    return {

      Modal: ({title, placeholder})=> { 

        const [state, setState] = useState(value || "");

        const accept = () => {
          setValue(state);
          setModal(m => !m);
        }

        return modal ? (

          <Wrapper visible={modal}>
            <Modal style={{ shadowColor: "#000", shadowOffset: {width:0, height:3}, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}>
              <PromptHeader>{title || "Escribe aquí"}</PromptHeader>
              <Divider/>
              <Textarea
                numberOfLines={3}
                multiline={true}
                placeholder={placeholder}
                value={state}
                onChangeText={setState}/>

              <Footer>
                <DenyButton onPress={()=>setModal(m => !m)}>Cancelar</DenyButton>
                <RoundedButton onPress={accept}>Aceptar</RoundedButton>
              </Footer>
            </Modal>
          </Wrapper>
        ) : null

    },

      Input: ({title, placeholder, onChange,name})=>{
        useEffect(()=>{
          onChange(form => ({...form, [name || title]:{value, error:null, edited:true}}))
        },[value])

        return <View>
            <StyledTitles>{title}</StyledTitles>
            <StyledInput 
              numberOfLines={1}  
              style={{color: value.length ? "black" : "#777777"}} 
              onPress={()=>setModal(m=> !m)}>
              {value ?  value : (placeholder || "Selecciona aquí")}
            </StyledInput>
        </View>
      },

      setValue: (val) => setValue(val)


  }
}



const Wrapper = styled.View`
  position: absolute;
  z-index: 10;
  top: 85px;
  left: 0px;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  background-color: rgba(0,0,0,0.02);

`
const Modal = styled.View`
  
  background-color: white;
  width: 65%;
  margin-top: 10px;
  max-width: 400px;
  align-self: center;
  margin-top: 20px;
  padding: 25px 20px 28px;
  border-radius: 2px;
  height: 230px;
`

const Option = styled.TouchableOpacity`
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

const PromptHeader = styled.Text`
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

const Textarea = styled.TextInput`
  color: #262626;
  padding-left : 3%;
  height: 35px;
  font-size: 12px;
  line-height: 18px;
  border-radius: 5px;
  margin : 5px 0;
  background-color: white;
  border: solid 1px #bfbfbf;
  min-height: 100px;
  text-align-vertical: top;
`

const Footer = styled.View`
  flex-direction: row;
  margin-top: 12px;
  height: 35px;
`