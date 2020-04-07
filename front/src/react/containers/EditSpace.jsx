import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Picker from "../components/Picker";
import TextPrompt from "../components/TextPrompt";
import Typeahead from "../components/Typeahead";
import AddPhotos from "../components/AddPhotos";
import Form from '../components/Form';

import { fetchProvincias, fetchLocalidades } from "../../redux/actions/locations";
import { editSpace,fetchSpace } from '../../redux/actions/spaces'
import { connect } from 'react-redux'


const inputs = [
  ["Barrio","neighborhood"],
  ["Provincia","province"],
  ["Tipo de Espacio","type"],
  ["Calle","street"],
  ["Número","streetNumber"],
  ['Piso',"floor"],
  ['Depto',"apt"],
  ["Tamaño #(mtr2)#","size"],
  ["Capacidad","capacity"],
  ["Valor hora ($)","price"],
  ["Tasa limpieza ($)","cleanup"],
  ["Reglas de Convivencia","rules"],
  ["Observaciones","observations"],
  ["Descripcion","description"],
  ["Titulo","title"],
];

const SpaceForm = ({ navigation, uploadFiles, editSpace, user, fetchLocalidades, fetchProvincias, route, fetchSpace }) => {
  const Type = Picker(useState(false), useState(""));
  const Services = Picker(useState(false), useState([]));
  const Observation = TextPrompt(useState(false), useState(""));
  const Rules = TextPrompt(useState(false), useState(""));
  const Descripcion = TextPrompt(useState(false), useState(""));

  const [ values, setValues ] = useState({});

  /****************  Geo normalization **************/

  const [ provincias, setProvincias ] = useState([])
  const [ localidades, setLocalidades ] = useState([])
  const [ province, setProvince ] = useState({})

  function getProvincias (val) {
    fetchProvincias(val)
      .then(data => setProvincias(data))
  }


  function getLocalidades (val) {
    fetchLocalidades(val, province.id)
      .then(data => setLocalidades(data))
  }

  const handleSelectProvince = (val) => {
    if (!val)  return setProvince({});
    setProvince(val);
  }

  /**************************************************/

  useEffect(()=>{
    fetchSpace(route.params.propertyId)
    .then(({space}) => {
      console.log(space)

      const data = {};

      inputs.forEach(([name, key]) => {
        data[name] = {value: space[key], error: null };
      })

      setValues(data);

      console.log(data);
    })
  },[])

  const onSubmit = function (form) {
    const data = {};

    inputs.forEach(([name, key]) => data[key] = form[name] );

    editSpace(data)
      .then(propertyId => navigation.navigate("SingleView", { propertyId }))
  }

  const fields = [
    ["Titulo*", "Excelente lugar para..."],
    [({ onChange })=> <Typeahead 
      title="Provincia*" 
      placeholder="Buenos Aires, Cordoba, San Luis.." 
      getOptions={getProvincias} 
      handleSelect={handleSelectProvince}
      onChange={onChange}
      options={provincias}
    />,3],
    //[({ onChange }) => <Province.Input onChange={onChange} title={"Provincia*"} placeholder="Buenos Aires, Cordoba, San Luis.." />],
    [({ onChange })=> province.id ? <Typeahead 
      title="Barrio*" 
      placeholder="Flores, Saavedra.." 
      getOptions={getLocalidades} 
      handleSelect={()=>null}
      onChange={onChange}
      options={localidades}
    /> : null,2],
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


  if (!values.Titulo) return null; 
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
        name="edit-space"
        onSubmit={onSubmit}
        fields={fields}
        header={({ divider }) => <View><Text>Editá tu espacio</Text>{divider()}</View>}
        sendText="Siguiente"
        values={values}
      />
    </View>
  )
}


const mapStateToProps = (state, ownProps) => ({
  user: state.user.logged.uid
})

const mapDispatchToProps = (dispatch) => ({
  editSpace: (body) => dispatch(editSpace(body)),
  fetchSpace: (id) => dispatch(fetchSpace(id)),
  fetchProvincias: (val) => dispatch(fetchProvincias(val)),
  fetchLocalidades: (val, id) => dispatch(fetchLocalidades(val, id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceForm);

