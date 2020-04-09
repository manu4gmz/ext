import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import FormularioOccidental from '../components/FormularioOccidental'

/* const OwnerForm = ({ navigation, user }) => {
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

  const onSubmit = function (form) {
    navigation.push("SpaceForm")
  }

  return (
    <FormularioOccidental
      onSubmit={onSubmit}
      numberValidation={numberValidation}
      addressValidation={addressValidation}
      mailValidation={mailValidation}
      user={user}
    />
  )
} */

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

/**/
const MapStateToProps = (state, ownProps) => ({
  user: state.user.logged
})

export default connect(MapStateToProps, null)(OwnerForm) 
