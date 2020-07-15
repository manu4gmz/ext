import React, { Component, useEffect, useState } from "react";
import { View } from "react-native";
import AddSpaceFormProgress from "../../components/AddSpaceFormProgress";
import Picker from "../../components/Picker";
import TextPrompt from "../../components/TextPrompt";
import Typeahead from "../../components/Typeahead";
import AddPhotos from "../../components/AddPhotos";
import GenericForm from '../../components/GenericForm';
import TypeaheadPicker from '../../components/TypeaheadPicker';
import { fetchCoords } from "../../../redux/actions/locations";
import { connect, useDispatch } from 'react-redux'

import neighborhoods from '../../../public/lib/neighborhoods';

const SpaceForm = ({ navigation, user }) => {
  const Neighborhood = TypeaheadPicker(useState(false), useState(""));
  const Type = Picker(useState(false), useState(""));
  const Services = Picker(useState(false), useState([]));
  const Observation = TextPrompt(useState(false), useState(""));
  const Rules = TextPrompt(useState(false), useState(""));
  const Descripcion = TextPrompt(useState(false), useState(""));

  const dispatch = useDispatch();

  const onSubmit = function (form) {
    const datosSpace = {
      ...form,
      location: [],
      photos: form.photos || [],
    };

    navigation.navigate("Payment", { space: datosSpace });
  }


  
  const fields = [
    {title:"Titulo*", placeholder:"Excelente lugar para...", name:"title"},

    //[({ onChange }) => <Province.Input onChange={onChange} title={"Provincia*"} placeholder="Buenos Aires, Cordoba, San Luis.." />],
    {
      element: ({ onChange, value }) => <Neighborhood.Input 
        onChange={onChange} 
        title={"Localidad"} 
        placeholder="Palermo..." 
        value={value} 
        name="neighborhood"
      />,
      name: "neighborhood",
      index: 2,
    },
    {title:"Calle*", placeholder:"Av. Congreso, Castillo", name:"street"},
    [
      {title:"Número", placeholder: "1332", name:"streetNumber"},
      {title:"Piso",  placeholder:"4", name:"floor"},
      {title:"Depto", placeholder: "B", name:"apt"},
    ],
    { 
      element: ({ onChange, value }) => <Type.Input 
        onChange={onChange} 
        title={"Tipo de Espacio"} 
        placeholder="Selecciona el espacio que ofrece." 
        value={value} 
        name="type"
      />,
      name: "type"
    },
    [
      {title: "Tamaño #(mtr2)#", placeholder: "mtr2", name:"size"},
      {title: "Capacidad*", placeholder: "Cant. personas", name:"capacity"}
    ],

    { 
      element: ({ onChange, value }) => <Descripcion.Input 
        onChange={onChange} 
        title="Descripcion" 
        name="description" 
        placeholder="Breve descripcion del lugar..." 
        value={value}
      />,
      name: "description"
    },
    { 
      element: ({ onChange, value }) => <Services.Input 
        onChange={onChange} 
        title={"Caracteristicas y servicios*"} 
        placeholder="Wifi, Cafe, Snacks, TV, Aire Acond.." 
        value={value} 
        name="services"
      />,
      name: "services"
    },
    { 
      element: ({ onChange, value }) => <Observation.Input
        onChange={onChange} 
        title="Observaciones" 
        name="observations" 
        placeholder="Horarios disponibles, particularidades, etc." 
        value={value}
      />,
      name: "observations"
    },

    [
      {title:"Valor hora ($)*", placeholder:"$560", name:"price"},
      {title:"Tasa limpieza ($)", placeholder:"$180", name:"cleanup"},
    ],

    {
      element: ({ onChange, value }) => <Rules.Input 
        onChange={onChange} 
        title="Reglas de Convivencia" 
        name="rules" 
        placeholder="Aclaraciones, límites, reglas del lugar..." 
        value={value}
      />,
      name:"rules"
    },
    {
      element: ({ title, onChange, value }) => <AddPhotos 
        text="Agregar fotos" 
        name="photos" 
        navigation={navigation} 
        onChange={onChange} 
        title={title} 
      />,
      name:"photos"
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Neighborhood.Modal
        title={"Localidad"}
        options={neighborhoods}
      />

      <Type.Modal
        title={"Tipo de Espacio*"}
        options={[
          "Casa",
          "Depósito",
          "Habitación",
          "Oficina",
          "Quinta",
          "Salón",
          "Terreno"
        ]}
      />
      <Services.Modal
        title={"Caracteristicas y servicios*"}
        options={[
          "Aire Acondicionado",
          "Wifi",
          "LCD",
          "Cafe/Infusiones",
          "Snacks",
          "Música",
          "Vajilla",
          "Baño",
          "Ducha"
        ]}
      />

      <Descripcion.Modal
        title={"Descripcion*"}
        placeholder={
          "Breve explicacion de el lugar que estas anadiendo, resalta las caracteristicas mas importantes."
        }
      />

      <Observation.Modal
        title={"Observaciones*"}
        placeholder={
          "Coloque aquí las observaciones y características del espacio para que lea su cliente. Sea breve y claro."
        }
      />

      <Rules.Modal
        title={"Reglas de convivencia"}
        placeholder={
          "Coloque aquí las reglas del espacio, los límites, si acepta o no mascotas, los temas de órden y limpieza, etc. Sea breve y claro."
        }
      />

      <GenericForm
        name="space"
        onSubmit={onSubmit}
        fields={fields}
        header={({ divider }) => (
          <AddSpaceFormProgress
            title="Presentá tu espacio"
            state={1}
            divider={divider}
          />
        )}
        sendText="Siguiente"
      />
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user.logged.uid,

})

const mapDispatchToProps = (dispatch) => ({
  fetchCoords: (coordenadas, id, region) => dispatch(fetchCoords(coordenadas, id, region)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceForm);
