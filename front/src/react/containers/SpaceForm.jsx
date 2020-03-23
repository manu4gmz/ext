import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Button from "../ui/Button";
import { Text, Image, View } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";

//Importando views and components

const fields = [
    ["Ciudad*", "Buenos Aires, Cordoba, San Luis.."],
    ["Calle*", "Flores, Saavedra.."],
    [
      ["Número"],
      ["Piso"],
      ["Depto"],
    ],
    ["Tipo de Espacio*", "Selecciona el espacio que ofrece."],
    [
      ["Tamaño #(mtr2)#*", "mtr2"],
      ["Capacidad*", "Cant. personas"]
    ],
    ["Caracteristicas y servicios*", "Wifi, Cafe, Snacks, TV, Aire Acond.."],
    ["Observaciones", "Horarios disponibles, particularidades, etc."],
    [
      ["Valor hora ($)", "$560"],
      ["Tasa limpieza ($)*", "$180"],
    ],
    ["Reglas de Convivencia", "Aclaraciones, límites, reglas del lugar..."],
    [({title, index})=> <View key={index}>
            {title("Agregar fotos")}
            <Button
              bg="#4A94EA"
              color="#F7F7F7"
            > <Image
                style={{ width: '10%', height: '100%' }}
                source={require('../../public/icons/lcd.png')}
              />
            </Button></View> ],
  ]

import Form from '../components/Form';

const SpaceForm = ({ navigation }) => {
  const onSubmit = function (form) { 
    console.log(form)
    navigation.push("Payment")
  }

  return (
    <Form
     onSubmit={onSubmit}
     fields={fields}
     header={({divider})=><AddSpaceFormProgress title="Presentá tu espacio" state={1} divider={divider}/>}
     sendText="Siguiente"
    />
  )
}

export default connect(null, null)(SpaceForm)
