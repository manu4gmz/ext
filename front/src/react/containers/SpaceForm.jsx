import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Picker from "../components/Picker";
import TextPrompt from "../components/TextPrompt";
import AddPhotos from "../components/AddPhotos";
import { addSpace } from '../../redux/actions/spaces'
import Form from '../components/Form';

const SpaceForm = ({ navigation, uploadFiles, addSpace, user }) => {
  const Type = Picker(useState(false), useState(""));
  const Services = Picker(useState(false), useState([]));
  const Observation = TextPrompt(useState(false), useState(""));
  const Rules = TextPrompt(useState(false), useState(""));
  const Descripcion = TextPrompt(useState(false), useState(""));

  const onSubmit = function (form) {
    const datosSpace = {
      verificated: false,
      neighborhood: form["Ciudad*"].value,
      province: form["Provincia*"].value,
      type: form["Tipo de Espacio*"].value,
      street: form["Calle*"].value,
      streetNumber: form["Número"].value,
      floor: form['Piso'].value,
      apt: form['Depto'].value,
      size: form["Tamaño #(mtr2)#*"].value,
      capacity: form["Capacidad*"].value,
      price: form["Valor hora ($)"].value,
      cleanup: form["Tasa limpieza ($)*"].value,
      rules: form["Reglas de Convivencia"].value,
      observations: form["Observaciones"].value,
      description: form["Descripcion"].value,
      userId: user,
      location: [],
      photos: [],
      title: form['Titulo*'].value,
      services: form["Caracteristicas y servicios*"].value
    }

    addSpace(datosSpace)
      .then(data => navigation.navigate("UploadingFiles", { images: form["Agregar fotos"].value, propertyId: data }))
  }

  const fields = [
    ["Provincia*", "Buenos Aires, Cordoba, San Luis.."],
    ["Titulo*", "Excelente lugar para..."],
    ["Ciudad*", "Flores, Saavedra.."],
    ["Calle*", "Av. Congreso, Castillo"],
    [
      ["Número", "1332"],
      ["Piso", "4"],
      ["Depto", "B"],
    ],
    [({ onChange }) => <Type.Input onChange={onChange} title={"Tipo de Espacio*"} placeholder="Selecciona el espacio que ofrece." />],
    [
      ["Tamaño #(mtr2)#*", "mtr2"],
      ["Capacidad*", "Cant. personas"]
    ],

    [({ onChange }) => <Descripcion.Input onChange={onChange} title="Descripcion" placeholder="Breve descripcion del lugar..." />],
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

      <Descripcion.Modal
        title={"Descripcion*"}
        placeholder={
          "Breve explicacion de el lugar que estas anadiendo, resalta las caracteristicas mas importantes."
        }
      />

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


const mapStateToProps = (state, ownProps) => ({
  user: state.user.logged.uid
})

const mapDispatchToProps = (dispatch) => ({
  addSpace: (body) => dispatch(addSpace(body))
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceForm);

