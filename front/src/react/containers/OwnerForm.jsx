import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Button from "../ui/Button";
import { Text, Image, View } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";

//Importando views and components

const fields = [
    ["Nombre*"],
    ["Apellido*"],
    ["Teléfono Móvil de contacto*","+54 9 11 5555 5555"],
    ["Mail","nombre@mail.com",(val)=> {
        while (val.length) {
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
    ],
    ["Dirección","Av. Congreso 1332"],
    [({title, index})=> <View key={index}>{title("Via de contacto con cliente")}</View>],
  ]

import Form from '../components/Form';

const OwnerForm = ({ navigation }) => {
  const onSubmit = function (form) { 
    console.log(form) 
    navigation.push("SpaceForm")
  }

  return (
    <Form
     onSubmit={onSubmit}
     fields={fields}
     header={({divider})=><AddSpaceFormProgress title="Completá tus datos" state={0}/>}
     sendText="Siguiente"
    />
  )
}

export default connect(null, null)(OwnerForm)
