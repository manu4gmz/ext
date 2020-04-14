import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import FormularioOccidental from '../components/FormularioOccidental'
import { offerUser } from "../../redux/actions/user"

const OwnerForm = ({ navigation, user, offerUser }) => {
  const [nombre, setNombre] = useState(user ? user.firstName : "")
  const [apellido, setApellido] = useState(user ? user.lastName : "")
  const [tel, setTel] = useState(user ? user.phoneNumber : "")
  const [email, setEmail] = useState(user ? user.email : "")
  const [direccion, setDireccion] = useState(user ? user.address : "")

  useEffect(() => {
    user.phoneNumber && user.address ? navigation.push("SpaceForm") : null

  }, [])

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
  const handlerNombre = (e) => {
    setNombre(e)
  }
  const handlerApellido = (e) => {

    setApellido(e)
  }
  const handlerTel = (e) => {

    numberValidation(e)
    setTel(e)
  }
  const handlerEmail = (e) => {
    mailValidation(e)
    setEmail(e)
  }
  const handlerDireccion = (e) => {
    addressValidation(e)
    setDireccion(e)
  }

  const onSubmit = function (form) {
    const data = {
      firstName: nombre,
      lastName: apellido,
      phoneNumber: tel,
      email: email,
      address: direccion
    }
    console.log(data)
    /* offerUser(user.id, data)
       .then((data) => (navigation.push("SpaceForm")
       ))*/
  }

  return (
    <FormularioOccidental
      onSubmit={onSubmit}
      user={user}
      handlerNombre={handlerNombre}
      handlerApellido={handlerApellido}
      handlerTel={handlerTel}
      handlerEmail={handlerEmail}
      handlerDireccion={handlerDireccion}
      nombre={nombre}
      email={email}
      apellido={apellido}
      tel={tel}
      direccion={direccion}
      submit={onSubmit}
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
