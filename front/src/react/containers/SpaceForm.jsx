import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { Text, Image, View } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Picker from "../components/Picker";
import TextPrompt from "../components/TextPrompt";
import AddPhotos from "../components/AddPhotos";
//Importando views and components


import Form from '../components/Form';

const SpaceForm = ({ navigation, uploadFiles }) => {

  const Type = Picker(useState(false), useState(""));
  const Services = Picker(useState(false), useState([]));
  const Observation = TextPrompt(useState(false), useState(""));
  const Rules = TextPrompt(useState(false), useState(""));

  const onSubmit = function (form) { 
    navigation.navigate("UploadingFiles", { images: form["Agregar fotos"].value })
  }

  const fields = [
    ["Provincia*", "Buenos Aires, Cordoba, San Luis.."],
    ["Ciudad*", "Flores, Saavedra.."],
    ["Calle*", "Av. Congreso, Castillo"],
    [
      ["Número","1332"],
      ["Piso","4"],
      ["Depto","B"],
    ],
    //["Tipo de Espacio*", "Selecciona el espacio que ofrece."],
    [({ onChange }) => <Type.Input onChange={onChange} title={"Tipo de Espacio*"} placeholder="Selecciona el espacio que ofrece." />],
    [
      ["Tamaño #(mtr2)#*", "mtr2"],
      ["Capacidad*", "Cant. personas"]
    ],
    [({ onChange }) => <Services.Input onChange={onChange} title={"Caracteristicas y servicios*"} placeholder="Wifi, Cafe, Snacks, TV, Aire Acond.." />],
    [({ onChange }) => <Observation.Input onChange={onChange} title="Observaciones" placeholder="Horarios disponibles, particularidades, etc." />],

    [
      ["Valor hora ($)", "$560"],
      ["Tasa limpieza ($)*", "$180"],
    ],
    [({ onChange }) => <Rules.Input onChange={onChange} title="Reglas de Convivencia" placeholder="Aclaraciones, límites, reglas del lugar..." />],

    [({ title, onChange }) => <AddPhotos text="Agregar fotos" navigation={navigation} onChange={onChange} title={title} />],
  ]



  return (
    <View style={{ flex: 1 }}>
      <Type.Modal title={"Tipo de Espacio*"} options={["Casa", "Depósito", "Habitación", "Oficina", "Quinta", "Salón", "Terreno"]} />
      <Services.Modal title={"Caracteristicas y servicios*"} options={["Aire Acondicionado", "Wifi", "LCD", "Cafe/Infusiones", "Snacks", "Música", "Vajilla"]} />
      <Observation.Modal title={"Observaciones*"} placeholder={
        "Coloque aquí las observaciones y características del espacio para que lea su cliente. Sea breve y claro."
      } />
      <Rules.Modal title={"Reglas de convivencia"} placeholder={
        "Coloque aquí las reglas del espacio, los límites, si acepta o no mascotas, los temas de órden y limpieza, etc. Sea breve y claro."
      } />

      <Form
        onSubmit={onSubmit}
        fields={fields}
        header={({ divider }) => <AddSpaceFormProgress title="Presentá tu espacio" state={1} divider={divider} />}
        sendText="Siguiente"
      />
    </View>
  )
}


export default connect(null, null)(SpaceForm);

