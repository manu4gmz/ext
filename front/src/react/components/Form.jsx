import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux'

import { StyleSheet, Text, Image, ScrollView } from 'react-native'
import styled from "styled-components/native";
import Button from "../ui/Button";


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = (func, delay) => { 
    let debounceTimer 
    return function() { 
        const context = this
        const args = arguments 
        clearTimeout(debounceTimer) 
        debounceTimer = setTimeout(() => func.apply(context, args), delay) 
    } 
}

const validate = debounce((value, name, validation, setForm) => {
  let error = null;
  if ( typeof validation == "function" ) error = validation(value);
  if (name[name.length-1] == "*") error = !value ? "Completa este campo" : error;
  setForm((form)=>({ ...form, [name]: { value: form[name].value, error }  }))
}, 1000);

function useInput(name, placeholder, validation, form, setForm, index, inline=1) {

    if (!form[name]) form[name] = {};

    

    if (typeof name == "function") return (
      <View key={index}>
        {
          name({
             title: (name)=><StyledTitles>{name.split("#")[0]}<SmallText>{name.split("#")[1] || null}</SmallText>{name.split("#")[2] || null}</StyledTitles>,
             value: form[name].value || "",
             onChange: setForm,
             index
          })
        }
      </View>)

    const onChangeText = (val) => {
      setForm((form) => ({...form, [name]:{value:val,error:form[name].error}}))
      validate(val, name, validation, setForm);
    }

    return (
      <View key={index} style={{width: (100/inline - (inline == 1 ? 0 : 2))+"%"}}>
        <StyledTitles>{name.split("#")[0]}<SmallText>{name.split("#")[1] || null}</SmallText>{name.split("#")[2] || null}</StyledTitles>
        <StyledInput
            error={form[name].error ? "true" : "false"}
            value={form[name].value || ""}
            onChangeText={onChangeText}
            placeholder={placeholder}
        ></StyledInput>
        {
          form[name].error && <Error>{form[name].error}</Error>
        }
      </View>
    )
}

const Form = ({ fields, onSubmit, sendText, header }) => {
  const [form, setForm] = useState({});

  const checkRequired = ([name,, val])=> {
    if (typeof name == "string" && name[name.length-1] == "*") return name;
    else if (typeof val == "function" && !val("")) return name;
    return false;
  }

  const required = fields.map((elem) => {
    if (typeof elem[0] == "object") return elem.map(checkRequired);
    else return checkRequired(elem)
  }).flat(2).filter(a => a);

  function mapFields (fields, inline) {
    return fields.map((field,i) => 
      typeof field[0] == "object" ?
        <DoubleWraper key={i}>
          {
            mapFields(field, field.length)
          }
        </DoubleWraper>
        :
        useInput( field[0], field[1], field[2], form, setForm, i, inline )
    )
  }

  console.log(form)

  return (
    <ScrollView>
      <Wrapper>
        <StyledView>
          {
            typeof (header || "") == "string" ? 
            <View>
              <StyledText>{(header || "")}</StyledText>
              <Divider/>
            </View>
            : 
            header({divider: (props)=><Divider {...props}/> })
          }
          
          {
            mapFields(fields)
          }

        </StyledView>
         <ButtonWrapper>
            {
              required.every(i => Object.keys(form).filter(key => form[key].value).includes(i)) && Object.keys(form).every(key => !form[key].error) ?
                <Button
                  bg="#4A94EA"
                  color="#F7F7F7"
                  onPress={()=>onSubmit(form)}
                >{sendText || "Enviar"}</Button>
                :
                <DisabledButton>{sendText || "Enviar"}</DisabledButton>
            }
          </ButtonWrapper>
      </Wrapper >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: '#F7F7F7',
    marginBottom: 10,
    marginTop: 10
  },

  doubleView: {
    flexGrow: 1,
    width: 50
  }
});

const ButtonWrapper = styled.View`
  margin: 1px 0 20px;
`

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #b2b2b2;
`

const Wrapper = styled.View`
  
  margin: 0px auto;
  width: 100%;
  padding: 0 10px;
  max-width: 500px;
`
const StyledView = styled.View`
  margin: 10px 0;
  background-color: #F7F7F7;
  padding : 20px 20px 15px;
  box-shadow: 0px 2px 7px #c7c7c7;

  border-radius: 10px
`
const StyledTitles = styled.Text`
color : #000144;
text-transform: uppercase;
padding-left : 12px;
font-weight: 700;
font-size: 12px;
`
const StyledText = styled.Text`
color : #262626;
padding-left : 3%;
`
const SmallText = styled.Text`
color : #262626;
font-size : 12px;
text-transform: lowercase;

`
const StyledInput = styled.TextInput`
color : ${props => props.error == "true" ? "red" : "#262626"};
padding-left : 3%;
height: 35px;
border-radius : 5px;
margin : 5px 0;
background-color: white;
border: solid 1px ${props => props.error == "true" ? "red" : "#bfbfbf"};
`
const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const View = styled.View`
  margin : 6px 0;

`

const DisabledButton = styled(Button)`
  background-color: transparent;
  color: #b2b2b2;
  line-height: 30px;
  border: solid 1px #b2b2b2;
`

const Error = styled.Text`
  color: red;  
`

export default connect(null, null)(Form)




