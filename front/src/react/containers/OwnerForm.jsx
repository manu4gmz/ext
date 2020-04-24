import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import FormularioOccidental from '../components/FormularioOccidental'
import { offerUser } from "../../redux/actions/user"
import { Alert } from "react-native"

const OwnerForm = ({ navigation, user, offerUser }) => {
  const [nombre, setNombre] = useState(user.id ? user.firstName : "")
  const [apellido, setApellido] = useState(user.id ? user.lastName : "")
  const [tel, setTel] = useState(user ? user.phoneNumber : "")
  const [direccion, setDireccion] = useState(user.id ? user.address : "")
  const [alerta, setAlerta] = useState(false)

  useEffect(() => {
    user.phoneNumber && user.address ? navigation.push("SpaceForm") : null

  }, [])


  const handlerNombre = (e) => {
    validacionString(e, setNombre)

  }
  const handlerApellido = (e) => {
    validacionString(e, setApellido)

  }
  const handlerTel = (e) => {

    validacionNumero(e, setTel)
  }
  const handlerDireccion = (e) => {
    validacionAlfanumerico(e, setDireccion)
  }
  const validacionString = (palabra, setState) => {
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
    if (boleano === true) return setState(palabra)
  }

  const validacionNumero = (palabra, setState) => {
    let boleano = false
    for (let i = 0; i < palabra.length; i++) {
      if (palabra.charCodeAt(i) === 43 && i === 0) { boleano = true }
      else if (palabra.charCodeAt(i) >= 48 && palabra.charCodeAt(i) <= 57 && i > 0) {
        boleano = true
      } else { boleano = false }
    }
    if (boleano === true) return setState(palabra)
  }

  const validacionAlfanumerico = (palabra, setState) => {
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
    if (boleano === true) return setState(palabra)
  }



  const onSubmit = function () {
    if (nombre && apellido && tel && direccion) {
      const data = {
        firstName: nombre,
        lastName: apellido,
        phoneNumber: tel,
        address: direccion
      }
      offerUser(user.id, data)
        .then((data) => (navigation.push("SpaceForm")))

    } else {
      setAlerta(true)
    }

  }



  return (
    <FormularioOccidental
      user={user}
      handlerNombre={handlerNombre}
      handlerApellido={handlerApellido}
      handlerTel={handlerTel}
      handlerDireccion={handlerDireccion}
      nombre={nombre}
      apellido={apellido}
      tel={tel}
      direccion={direccion}
      submit={onSubmit}
      alerta={alerta}
    />
  )
}
/*
const mailValidation = (val) => {
  while (val && val.length) {
    if (!val.includes("@")) break;
    const [mail, end] = val.split("@");
    if (mail.length < 3 || end.length < 4) break;
    if (!val.includes(".")) break;
    const [domain, com] = val.split(".");
    if (domain.length < 4 || com.length < 2) break;
    return null;
  }
  return "Este mail no es válido";
}

const addressValidation = (val) => {
  if (!val) return "Completa este campo";
  if (val == val.replace(/[0-9]/g, "")) return "La dirección deber tener al menos un número"
  if (val == val.replace(/[a-z]/g, "")) return "La dirección deber tener al menos una calle"
  return null;
}

const numberValidation = (val) => {
  if (!val) return "Completa este campo"
  if (isNaN(val.replace(/[ +]/g, ""))) return "El teléfono debe ser un número";
  if (val.replace(/[ +]/g, "").length < 8) return "El teléfono tiene que tener como mínimo 8 digitos"
}

import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
const fields = [
  ["Nombre*"],
  ["Apellido*"],
  ["Teléfono Móvil de contacto*", "+54 9 11 5555 5555", numberValidation],
  ["Mail*", "nombre@mail.com", mailValidation],
  ["Dirección", "Av. Congreso 1332", addressValidation],
  [({ title }) => title("Via de contacto con cliente")],
]

import Form from '../components/Form';

const OwnerForm = ({ navigation }) => {
  const onSubmit = function (form) {
    navigation.push("SpaceForm")
  }

  return (
    <Form
      name="owner"
      onSubmit={onSubmit}
      fields={fields}
      header={({ divider }) => <AddSpaceFormProgress title="Completá tus datos" state={0} />}
      sendText="Siguiente"
    />
  )
}

*/
const MapStateToProps = (state, ownProps) => ({
  user: state.user.logged
})
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    offerUser: (id, data) => dispatch(offerUser(id, data))
  }
}

export default connect(MapStateToProps, mapDispatchToProps)(OwnerForm) 
