import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import FormularioOccidental from '../components/FormularioOccidental'
import { offerUser } from "../../redux/actions/user"
import { Alert } from "react-native";
import GenericForm from "../components/GenericForm";
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import styled from "styled-components/native";
import { View } from "react-native";
import Picker from "../components/Picker";

const OwnerForm = ({ navigation, user, offerUser }) => {
  const Age = Picker(useState(false), useState(""));


  useEffect(() => {
    //user.phoneNumber && user.email ? navigation.push("SpaceForm") : null

    if (user.age) Age.setValue(user.age);


  }, [])



  const validacionString = (palabra) => {
    let boleano = false
    for (let i = 0; i < palabra.length; i++) {
      if (palabra.charCodeAt(i) >= 65 && palabra.charCodeAt(i) <= 90) {
        boleano = true
      } else if (palabra.charCodeAt(i) >= 97 && palabra.charCodeAt(i) <= 122) {
        boleano = true
      } else if (palabra.charCodeAt(i) === 32) {
        boleano = true
      } else { boleano = false }
    }
    return boleano ? null : "Este valor no es válido"
  }

  const validatePhone = (str) => {
    const num = str.replace(/ /g,"");
    if (!/^([0-9]|\+)+$/.test(num)) return "Este valor debe tener solo números";
    if (!/^(\+|)54911/.test(num)) return "El número debe tener el prefijo de +54 9 11";
    if (num.replace(/^(\+54911|54911)/,"").length != 8) return "El número debe tener 13 cifras";
    return null;
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? null : "Este email no es válido";
  }

  const validacionAlfanumerico = (palabra) => {
    let boleano = false
    for (let i = 0; i < palabra.length; i++) {
      if (palabra.charCodeAt(i) >= 65 && palabra.charCodeAt(i) <= 90) {
        boleano = true
      } else if (palabra.charCodeAt(i) >= 97 && palabra.charCodeAt(i) <= 122) {
        boleano = true
      } else if (palabra.charCodeAt(i) >= 48 && palabra.charCodeAt(i) <= 57 && i > 0) {
        boleano = true
      } else if (palabra.charCodeAt(i) === 32) {
        boleano = true
      }
      else { boleano = false }
    }
    return boleano ? null : "El valor debe ser alfanumérico"
   
  }

  const [wpp,setWpp] = useState(user.contact ? user.contact.wpp : true);
  const [tel,setTel] = useState(user.contact ? user.contact.tel : true);
  const [email,setEmail] = useState(user.contact ? user.contact.email : true);


  const onSubmit = function (form, setForm) {
    
    const data = {...form};

    if (data.phoneNumber) data.phoneNumber = data.phoneNumber.replace(/( |\+)/g,""),

    data.contact = {
      wpp, tel, email
    }

    offerUser(data)
      .then((data) => (navigation.push("SpaceForm")))
      .catch(err => {
        setForm(form => ({...form, email:{ ...form.email, error: "Mail no reconocido"}}))
      })
  }

  if (!user.id && !user.uid) return null;


  const fields = [
    {
      title: "Nombre*", name: "firstName", placeholder: "", validation: validacionString
    },
    {
      title: "Apellido*", name: "lastName", placeholder: "", validation: validacionString
    },
    {
      title: "Email de contacto*", name: "email", placeholder: "", validation: validateEmail
    },
    {
      title: "Teléfono de contacto*", name: "phoneNumber", placeholder: "+54 9 11 ...", validation: validatePhone
    },
    {
      element:({ onChange, title }) => <View>
        { title("Métodos de contacto") }
        <CheckBoxWrapper>
          <CheckBox onPress={() => (setEmail(!email))}>
              <Check><Dot active={email + ""} /></Check>
              <CheckLabel>Email</CheckLabel>
          </CheckBox>
          <CheckBox onPress={() => (setTel(!tel))}>
              <Check><Dot active={tel + ""} /></Check>
              <CheckLabel>Teléfono</CheckLabel>
          </CheckBox>
          <CheckBox onPress={() => (setWpp(!wpp))}>
              <Check><Dot active={wpp + ""} /></Check>
              <CheckLabel>Whatsapp</CheckLabel>
          </CheckBox>
      </CheckBoxWrapper>
      </View>,
      name: "contact"
    },
    { 
      element: ({ onChange, value }) => <Age.Input onChange={onChange} title={"Rango Etáreo"} placeholder="Selecciona el rango de edades" value={value} name="age"/>,
      name: "age"
    },

    
  ]

  return <View style={{ flex: 1 }}>
    <Age.Modal title={"Rango Etáreo"} options={["Menos de 20", "Entre 20 y 30", "Entre 31 y 40", "Entre 41 y 50", "Entre 51 y 60", "Más de 60"]} />
    <GenericForm fields={fields} onSubmit={onSubmit} sendText="Siguiente" values={user} header={({ divider }) => (
      <AddSpaceFormProgress
      title="Completá tus datos"
      state={0}
      divider={divider}
      
      />
      )} />
  </View>
  
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user.logged
})
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    offerUser: (data) => dispatch(offerUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerForm) 


const CheckBox = styled.TouchableOpacity`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`

const Check = styled.View`
  border: solid 1px #cccccc;
  border-radius: 50px;
  height: 24px;
  width: 24px;
  justify-content: center;
`

const Dot = styled.Text`
  height: 12px;
  width: 12px;
  align-self: center;
  background-color: ${p => p.active == "true" ? "#2cca31" : "#d9d5c8"};
  border-radius: 40px;
`
const CheckLabel = styled.Text`
    font-size: 12px;
    padding-top:2px;
`

const CheckBoxWrapper = styled.View`
    width: 100%;
    margin-top: 6px;
    flex-direction: row;
    justify-content: center;
`