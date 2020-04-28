import React, { useState, useEffect } from 'react'
import saveForm from "../../redux/actions/forms";
import { connect } from 'react-redux'

import { StyleSheet, Text, Image, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native'
import styled from "styled-components/native";
import Button from "../ui/Button";

/* import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view' */

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
const debounce = (func, delay) => {
  let debounceTimer
  return function () {
    const context = this
    const args = arguments
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => func.apply(context, args), delay)
  }
}

const validate = debounce((value, name, validation, setForm) => {
  let error = null;
  if (typeof validation == "function") error = validation(value);
  if (name[name.length - 1] == "*") error = !value ? "Completa este campo" : error;
  setForm((form) => ({ ...form, [name]: { value: form[name].value, error, edited: true } }))
}, 1000);

function useInput({ title, name, placeholder, validation, index, element }, form, setForm, inline) {

  const field = form[name] || {};

  if (typeof element == "function") return (
    <View key={index} style={{ zIndex: 40 - index }}>
      {
        element({
          title: (title) => <StyledTitles>{title.split("#")[0]}{title.split("#")[1] ? <SmallText>{title.split("#")[1]}</SmallText> : null}{title.split("#")[2] || null}</StyledTitles>,
          value: field.value,
          onChange: name ? (value, error = null) => {

            if (typeof value == "function") setForm(value);
            else setForm(form => ({ ...form, [name]: { value, error, edited: true } }));
          } : setForm,
          index
        })
      }
    </View>
  )

  const onChangeText = (val) => {
    setForm((form) => ({ ...form, [name]: { value: val, error: field.error, edited: true } }))
    validate(val, name, validation, setForm);
  }

  return (
    <View key={index} style={{ width: (100 / inline - (inline == 1 ? 0 : 2)) + "%" }}>
      <StyledTitles>{title.split("#")[0]}{title.split("#")[1] ? <SmallText>{title.split("#")[1]}</SmallText> : null}{title.split("#")[2] || null}</StyledTitles>
      <StyledInput
        error={field.error ? "true" : "false"}
        value={field.value || ""}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {
        field.error ? <Error>{field.error}</Error> : null
      }
    </View>
  )
}

const Form = ({ fields, onSubmit, sendText, header, values }) => {

  const parsedInitialState = values ? Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: { value: values[key], error: null } }), {}) : {};

  const [form, setForm] = useState(parsedInitialState);

  const checkRequired = ({ title, name, validation }) => {
    if (typeof title == "string" && title[title.length - 1] == "*") return name;
    else if (typeof validation == "function" && !validation("")) return name;
    return false;
  }

  const required = fields.map((elem) => {
    if (typeof elem[0] == "object") return elem.map(checkRequired);
    else return checkRequired(elem)
  }).flat(2).filter(a => a)

  function mapFields(fields, inline) {
    return fields.map((field, i) =>
      field[0] ?
        <DoubleWraper key={i}>
          {
            mapFields(field, field.length)
          }
        </DoubleWraper>
        :
        useInput({ ...field, index: i }, form, setForm, inline)
    )
  }

  function handleSubmit() {
    const data = Object.keys(form).reduce((acc, key) => key && form[key].edited ? ({ ...acc, [key]: form[key].value }) : acc, {})
    onSubmit(data);
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ height: "100%" }} enableOnAndroid={true}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

        <ScrollView keyboardShouldPersistTaps='handled'>
          <Wrapper>
            <StyledView style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}>
              {
                typeof (header || "") == "string" ?
                  <View>
                    <StyledText>{(header || "")}</StyledText>
                    <Divider />
                  </View>
                  :
                  header({ divider: (props) => <Divider {...props} /> })
              }

              {
                mapFields(fields)
              }

            </StyledView>

            {
              required.every(e => Object.keys(form).includes(e)) && Object.keys(form).every(e => !form[e].error) ?
                <Button
                  mt={"6px"} mb={"60px"} ml={"5px"} mr={"5px"}
                  bg="#4A94EA"
                  color="#F7F7F7"
                  onPress={handleSubmit}
                >{sendText || "Enviar"}</Button>
                :
                <DisabledButton
                  mt={"6px"} mb={"60px"} ml={"5px"} mr={"5px"}
                >{sendText || "Enviar"}</DisabledButton>
            }
          </Wrapper>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const mapStateToProps = (state, ownProps) => ({
  initialForm: state.forms[ownProps.name] || {}
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveForm: (form) => dispatch(saveForm(ownProps.name, form))
})
export default connect(mapStateToProps, mapDispatchToProps)(Form)

const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #b2b2b2;
`

const Wrapper = styled.View`
  flex: 1;
  margin: 0px auto;
  width: 100%;
  padding: 0 10px;
  max-width: 500px;
`

const StyledView = styled.View`
  margin: 15px 5px;
  background-color: #F7F7F7;
  padding : 20px 20px 15px;
  border-radius: 10px;
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
  padding-left : 12px;
  height: 35px;
  line-height: 25px;
  border-radius : 5px;
  padding: 5px 12px;
  flex:1;
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
  flex:1;
  border: solid 1px #b2b2b2;
`

const Error = styled.Text`
  color: red;  
`





