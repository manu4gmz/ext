import React, { Component, useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Picker from "../components/Picker";
import TextPrompt from "../components/TextPrompt";
import Typeahead from "../components/Typeahead";
import AddPhotos from "../components/AddPhotos";
import GenericForm from '../components/GenericForm';

import { fetchProvincias, fetchLocalidades } from "../../redux/actions/locations";
import { editSpace,fetchSpace } from '../../redux/actions/spaces'
import { connect } from 'react-redux'


const EditSpace = ({ navigation, editSpace, fetchLocalidades, fetchProvincias, route, fetchSpace }) => {
  const Type = Picker(useState(false), useState(""));
  const Services = Picker(useState(false), useState([]));
  const Observation = TextPrompt(useState(false), useState(""));
  const Rules = TextPrompt(useState(false), useState(""));
  const Descripcion = TextPrompt(useState(false), useState(""));

  const [ values, setValues ] = useState({});

  const [ spacePhotos, setSpacePhotos ] = useState([]);

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
    .then((space) => {
      console.log(space)
      if (space.comments) delete space.comments;
      if (space.userId) delete space.userId;
      delete space.visible;
      delete space.verified;
      setValues(space);

      Type.setValue(space.type)
      Services.setValue(space.services)
      Observation.setValue(space.observations)
      Rules.setValue(space.rules)
      Descripcion.setValue(space.description)

      setSpacePhotos(space.photos);
    })
  },[])

  const onSubmit = function (form) {
    console.log(route.params.propertyId);
    const photos = [...form.photos.map(obj => ({...obj}))];
    delete form.photos;
    editSpace(route.params.propertyId,form)
      .then(propertyId => {
        if (!propertyId) return;
        const newImages = photos.filter(a => !spacePhotos.includes(a.uri))
        //navigation.push("SingleView", { propertyId })
        console.log("ESTOY A PUNTO DE UPLOADEAR, ESTAS SON LAS IMAGENES",photos)
        navigation.navigate("UploadingFiles", { images: newImages, propertyId, otherImages: spacePhotos })
      })
  }
  const fields = [
    { title:"Titulo", placeholder:"Excelente lugar para...",name:"title" },
    {
      element:({ onChange, value })=> <Typeahead 
        title="Provincia*" 
        value={value}
        placeholder="Buenos Aires, Cordoba, San Luis.." 
        getOptions={getProvincias} 
        handleSelect={handleSelectProvince}
        onChange={onChange}
        options={provincias}
      />, 
      index:3
    },
    //[({ onChange }) => <Province.Input onChange={onChange} title={"Provincia*"} placeholder="Buenos Aires, Cordoba, San Luis.." />],
    {
      element: ({ onChange, value })=> province.id ? <Typeahead 
        title="Barrio" 
        placeholder="Flores, Saavedra.." 
        getOptions={getLocalidades} 
        handleSelect={()=>null}
        onChange={onChange}
        value={value}
        options={localidades}
      /> : null 
    },
    {title:"Calle", name: "street", placeholder: "Av. Congreso, Castillo"},
    [
      {title:"Número", placeholder: "1332", name:"streetNumber"},
      {title:"Piso",  placeholder:"4", name:"floor"},
      {title:"Depto", placeholder: "B", name:"apt"},
    ],
    { 
      element: ({ onChange, value }) => <Type.Input onChange={onChange} title={"Tipo de Espacio"} placeholder="Selecciona el espacio que ofrece." value={value} name="type"/>,
      name: "type"
    },
    [
      {title: "Tamaño #(mtr2)#", placeholder: "mtr2", name:"size"},
      {title: "Capacidad*", placeholder: "Cant. personas", name:"capacity"}
    ],

    { 
      element: ({ onChange, value }) => <Descripcion.Input onChange={onChange} title="Descripcion" name="description" placeholder="Breve descripcion del lugar..." value={value}/>,
      name: "description"
    },
    { 
      element: ({ onChange, value }) => <Services.Input onChange={onChange} title={"Caracteristicas y servicios*"} placeholder="Wifi, Cafe, Snacks, TV, Aire Acond.." value={value} name="services"/>,
      name: "services"
    },
    { 
      element: ({ onChange, value }) => <Observation.Input onChange={onChange} title="Observaciones" name="observations" placeholder="Horarios disponibles, particularidades, etc." value={value}/>,
      name: "observations"
    },

    [
      {title:"Valor hora ($)", placeholder:"$560", name:"price"},
      {title:"Tasa limpieza ($)", placeholder:"$180", name:"cleanup"},
    ],

    {
      element: ({ onChange, value }) => <Rules.Input onChange={onChange} title="Reglas de Convivencia" name="rules" placeholder="Aclaraciones, límites, reglas del lugar..." value={value}/>,
      name:"rules"
    },
    {
      element: ({ title, onChange, value }) => <AddPhotos text="Agregar fotos" name="photos" navigation={navigation} onChange={onChange} title={title} value={value} images={spacePhotos}/>,
      name:"photos"
    },
  ]


  if (!values.title) return null; 
  return (
    <View style={{ flex: 1 }}>
      <Type.Modal title={"Tipo de Espacio"} options={["Casa", "Depósito", "Habitación", "Oficina", "Quinta", "Salón", "Terreno"]} />
      <Services.Modal title={"Caracteristicas y servicios"} options={["Aire Acondicionado", "Wifi", "LCD", "Cafe/Infusiones", "Snacks", "Música", "Vajilla"]} />

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

      <GenericForm
        name="edit-space"
        onSubmit={onSubmit}
        fields={fields}
        header={({ divider }) => <View><Text>Editá tu espacio</Text>{divider()}</View>}
        sendText="Confirmar cambios"
        values={values}
      />
    </View>
  )
}


const mapStateToProps = (state, ownProps) => ({
  user: state.user.logged.uid
})

const mapDispatchToProps = (dispatch) => ({
  editSpace: (id, body) => dispatch(editSpace(id, body)),
  fetchSpace: (id) => dispatch(fetchSpace(id)),
  fetchProvincias: (val) => dispatch(fetchProvincias(val)),
  fetchLocalidades: (val, id) => dispatch(fetchLocalidades(val, id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditSpace);

