import React, { useEffect, useState, useRef } from "react";

import { 
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from "react-native";

import AddSpaceFormProgress from "../../components/AddSpaceFormProgress";
import Picker from "../../components/Picker";
import TextPrompt from "../../components/TextPrompt";
import Typeahead from "../../components/Typeahead";
import AddPhotos from "../../components/AddPhotos";
import GenericForm from '../../components/GenericForm';
import TypeaheadPicker from '../../components/TypeaheadPicker';

import { fetchCoords } from "../../../redux/actions/locations";
import { connect } from 'react-redux'
import { Controller, useForm } from 'react-hook-form';


import {
  Divider,
  Wrapper,
  StyledView,
  StyledTitles,
  StyledText,
  SmallText,
  StyledInput,
  DoubleWraper,
  DisabledButton,
  ErrorText,
  ViewLeft,
  ViewRight,
  ViewCenter,
} from './styles';

import Button from '../../ui/Button';

const SpaceForm = ({ navigation, user, fetchLocalidades, fetchProvincias, fetchCoords }) => {
  const Type = Picker(useState(false), useState(""));
  const Services = Picker(useState(false), useState([]));
  const Observation = TextPrompt(useState(false), useState(""));
  const Rules = TextPrompt(useState(false), useState(""));
  const Descripcion = TextPrompt(useState(false), useState(""));

  /**************************************************/

  const onSubmit = function (form) {
    return console.log(form);
        fetchCoords(mapsData)
          .then((coordinates) =>{
            datosSpace.location = coordinates;
            navigation.navigate("Payment", { space: datosSpace })
          })
  }

  const { errors, control, handleSubmit, getValue, setValue } = useForm();
  const photos = useRef(null);

  return (
    <View style={{ flex: 1 }}>
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

      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={{ height: "100%" }} enableOnAndroid={true}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <Wrapper>
              <StyledView>
              
                <AddSpaceFormProgress
                    title="Presentá tu espacio"
                    state={1}
                    divider={() => <Divider/>}
                />

                <StyledTitles>Título*</StyledTitles>
                <Controller
                  control={control}
                  name="title"
                  rules={{
                    required: 'Ingrese un correo electrónico',
                    maxLength: 20
                  }}
                  render={
                    ({onChange, onBlur, value}) => (

                      <StyledInput 
                        placeholder="Titulo del espacio"
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        error={errors.title ? "true" : "false"}
                      />
                    )
                  }
                />
                {errors.title?.type === 'required' &&  <ErrorText>El título es obligatorio</ErrorText>}
                {errors.title?.type === 'maxLength' &&  <ErrorText>El título tiene que tener menos de 20 caracteres</ErrorText>}
                
                <StyledTitles>Barrio*</StyledTitles>
                <Controller
                  control={control}
                  name="neighborhood"
                  render={
                    ({onChange, onBlur, value}) => (
                      <StyledInput
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        placeholder="Flores, Saavedra.."
                      />
                    )
                  }
                />
                
                <StyledTitles>Calle*</StyledTitles>
                <Controller
                  control={control}
                  name="street"
                  render={
                    ({onChange, onBlur, value}) => (
                      <StyledInput 
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                      />
                    )
                  }
                />
                
                <DoubleWraper>
                  <ViewLeft>
                    <StyledTitles>Número</StyledTitles>
                    <Controller
                      control={control}
                      name="streetNumber"
                      render={
                        ({onChange, onBlur, value}) => (
                          <StyledInput 
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                          />
                        )
                      }
                    />
                  </ViewLeft>
                  
                  <ViewCenter>
                    <StyledTitles>Piso</StyledTitles>
                    <Controller
                      control={control}
                      name="floor"
                      render={
                        ({onChange, onBlur, value}) => (
                          <StyledInput 
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                          />
                        )
                      }
                    />
                  </ViewCenter>
                  
                  <ViewRight>
                    <StyledTitles>Depto</StyledTitles>
                    <Controller
                      control={control}
                      name="apt"
                      render={
                        ({onChange, onBlur, value}) => (

                          <StyledInput 
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                          />
                        )
                      }
                    />
                  </ViewRight>
                </DoubleWraper>
                
                <Type.Input 
                  onChange={val => setValue("type", val)} 
                  title={"Tipo de Espacio"} 
                  placeholder="Selecciona el espacio que ofrece."
                />

                <Services.Input 
                  onChange={val => setValue("services", val)} 
                  title={"Caracteristicas y servicios*"} 
                  placeholder="Wifi, Cafe, Snacks, TV, Aire Acond.."
                />

                <DoubleWraper>
                  <ViewLeft>
                    <StyledTitles>Tamaño <SmallText>(mtr2)</SmallText></StyledTitles>
                    <Controller
                      control={control}
                      name="size"
                      render={
                        ({onChange, onBlur, value}) => (
                          <StyledInput 
                            placeholder="Titulo del espacio"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                          />
                        )
                      }
                    />
                  </ViewLeft>
                  
                  <ViewRight>
                    <StyledTitles>Capacidad*</StyledTitles>
                    <Controller
                      control={control}
                      name=""
                      render={
                        ({onChange, onBlur, value}) => (
                          <StyledInput 
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                            placeholder="Cant. personas"
                          />

                        )
                      }
                    />
                  </ViewRight>
                </DoubleWraper>
    
                <Descripcion.Input 
                  onChange={text => setValue("description")} 
                  title="Descripcion" 
                  name="description" 
                  placeholder="Breve descripcion del lugar..."
                />
                
                <StyledTitles>Observaciones</StyledTitles>
                <Observation.Input
                  onChange={text => setValue(text)} 
                  title="Observaciones"
                  placeholder="Horarios disponibles, particularidades, etc."
                />

                <DoubleWraper>
                  <ViewLeft>
                    <StyledTitles>Valor hora ($)*</StyledTitles>
                    <Controller
                      control={control}
                      name="price"
                      render={
                        ({onChange, onBlur, value}) => (
                          <StyledInput 
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                          />
                        )
                      }
                    />
                  </ViewLeft>
                  
                  <ViewRight>
                    <StyledTitles>Tasa limpieza ($)</StyledTitles>
                    <Controller
                      control={control}
                      name="cleanup"
                      render={
                        ({onChange, onBlur, value}) => (
                          <StyledInput 
                            placeholder="Titulo del espacio"
                            onBlur={onBlur}
                            value={value}
                            onChangeText={onChange}
                          />
                        )
                      }
                    />
                  </ViewRight>
                </DoubleWraper>
                
                <Rules.Input 
                  onChange={val => setValue("rules", val)} 
                  title="Reglas de Convivencia" 
                  placeholder="Aclaraciones, límites, reglas del lugar..."
                />
                
                <StyledTitles>Agregar fotos</StyledTitles>
                <AddPhotos 
                  navigation={navigation} 
                  onChange={val => setValue("photos", val)} 
                />
                {errors.title?.type === 'leastOne' &&  <ErrorText>Debe subir como mínimo una foto</ErrorText>}

              </StyledView>
              <Button
                mt={"6px"} mb={"60px"} ml={"5px"} mr={"5px"}
                bg="#4A94EA"
                color="#F7F7F7"
                onPress={handleSubmit(onSubmit)}
              >Enviar</Button>
          
            </Wrapper>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user.logged.uid,

})

const mapDispatchToProps = (dispatch) => ({
  fetchProvincias: (val) => dispatch(fetchProvincias(val)),
  fetchLocalidades: (val, id) => dispatch(fetchLocalidades(val, id)),
  fetchCoords: (coordenadas, id, region) => dispatch(fetchCoords(coordenadas, id, region)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SpaceForm);

/*
  const fields = [
    {title:"Titulo*", placeholder:"Excelente lugar para...", name:"title"},
    {
      element:({ onChange }) => <Typeahead
        title="Provincia*"
        placeholder="Buenos Aires, Cordoba, San Luis.."
        getOptions={getProvincias}
        handleSelect={handleSelectProvince}
        onChange={onChange}
        options={provincias}
        name="province"

      />, 
      name: "province",
      index:3
    },
    //[({ onChange }) => <Province.Input onChange={onChange} title={"Provincia*"} placeholder="Buenos Aires, Cordoba, San Luis.." />],
    {
      element:({ onChange }) => province.id ? <Typeahead
        title="Barrio*"
        placeholder="Flores, Saavedra.."
        getOptions={getLocalidades}
        handleSelect={handleSelectLocalidad}
        onChange={onChange}
        options={localidades}
        name="neighborhood"
      /> : null, 
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
   */