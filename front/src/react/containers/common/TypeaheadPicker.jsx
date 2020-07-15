
import styled from "styled-components/native";
import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, ScrollView  } from 'react-native'
import Button from "../ui/Button";

export default ([modal, setModal],[value, setValue]) => {


    return {

      Modal: ({title, options, onChange})=> { 

        const allFalse = Object.fromEntries(options.map(e => [e,false]));

        let initial = {...allFalse};

        const [ input, setInput ] = useState("");

        if (value.length) {
          if (typeof value == "string") initial[value] = true;
          else if (typeof value == "object") value.forEach(key => initial[key] = true);
        }
        const [state, setState] = useState(initial);

        const onPress = (val) => {
          if (typeof value == "object") setState({...state, [val]: !state[val]});
          else if (typeof value == "string") setState({...allFalse, [val]: true});
        }

        const accept = () => {
          if (typeof value == "object") setValue(Object.keys(state).filter(key => state[key]));
          else if (typeof value == "string") setValue(Object.keys(state).filter(key => state[key])[0]);
          setModal(m => !m);
        }

        return modal ? (

          <Wrapper visible={modal}>
            <Modal style={{ shadowColor: "#000", shadowOffset: {width:0, height:3}, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}>
              <PickerHeader>{title || "Elige una opción"}</PickerHeader>
              <Divider/>
              <SearchInput value={input} onChangeText={setInput} placeholder="Busque aquí" />
              <ScrollView>
                {
                  (input ? 
                    options
                    .filter(field => field.toLowerCase().includes(input.toLowerCase()))
                    : options).map((option,i) => (
                    <Option key={i} onPress={()=>onPress(option)}>
                      <Check>{state[option] ? <Dot/> : null}</Check>
                      <Label>
                        {
                          input ?
                          <LabelText>
                            {option.slice(0,option.toLowerCase().indexOf(input.toLowerCase()))}
                            <Bold>
                              {option.slice(option.toLowerCase().indexOf(input.toLowerCase()), option.toLowerCase().indexOf(input.toLowerCase())+input.length)}
                            </Bold>
                            {option.slice(option.toLowerCase().indexOf(input.toLowerCase())+input.length, Infinity)}
                          </LabelText>
                          : <LabelText>{option}</LabelText>
                        }
                        
                        <Divider/>
                      </Label>
                    </Option>
                  ))
                }
              </ScrollView>

              <Footer>
                <DenyButton onPress={()=>setModal(m => !m)}>Cancelar</DenyButton>
                <RoundedButton onPress={accept}>Aceptar</RoundedButton>
              </Footer>
            </Modal>
          </Wrapper>
        ) : null

    },

      Input: ({title, placeholder, onChange, name})=>{

        useEffect(()=>{
          onChange(value);
        },[value])

        return <View>
            <StyledTitles>{title}</StyledTitles>

            <StyledInput 
            numberOfLines={1} 
            style={{color: value.length ? "black" : "#777777"}} 
            onPress={()=>setModal(m=> !m)}>
            {value.length ? 
              (typeof value == "string" ? value : value.join(", ").replace(/ y /g, ", ").replace(/(\b, \b)(?!.*\1)/g, " y ")) 
              : (placeholder || "Selecciona aquí")}
          </StyledInput>
        </View>
      },
      
      setValue: (val) => setValue(val)
  }

}



const Wrapper = styled.View`
  position: absolute;
  z-index: 10;
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
  height: 100%;
  max-height: 75%;

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

const SearchInput = styled.TextInput`
  color: #262626;
  padding-left : 3%;
  height: 35px;
  line-height: 35px;
  border-radius: 5px;
  margin : 5px 0;
  background-color: white;
  border: solid 1px #bfbfbf;
`

const Bold = styled.Text`
  font-weight: bold;
`