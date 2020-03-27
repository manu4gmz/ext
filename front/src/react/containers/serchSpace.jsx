import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { Text, Image, View, TouchableOpacity } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Picker from "../components/Picker";
import TextPrompt from "../components/TextPrompt";
import { fetchSpaces } from "../../redux/actions/spaces"
import styled from "styled-components/native";





//Importando views and components



import Form from '../components/Form';

const SerchSpace = ({ navigation, fetchSpaces }) => {

    const Province = Picker(useState(false), useState(""));
    const Type = Picker(useState(false), useState(""));
    const Services = Picker(useState(false), useState([]));
    const Observation = TextPrompt(useState(false), useState(""));
    const Rules = TextPrompt(useState(false), useState(""));
    const [Verificado, setVerificado] = useState(false)

    const onSubmit = function (form) {
        let filter = {};

        if (form["Barrio"] && form["Barrio"].value) filter.z = form["Barrio"].value;
        if (form["Provincia*"] && form["Provincia*"].value) filter.p = form["Provincia*"].value;
        if (form["Tipo de Espacio"] && form["Tipo de Espacio"].value) filter.t = form["Tipo de Espacio"].value;
        if (Verificado) filter.v = Verificado;

        console.log(filter);

        fetchSpaces(filter)
            .then((data) => {
                return navigation.navigate('Root', { screen: "AllSpaces" })
            })

    }

    const fields = [
        [({ onChange }) => <Province.Input onChange={onChange} title={"Provincia*"} placeholder="Buenos Aires, Cordoba, San Luis.." />],
        ["Barrio", "Flores, Saavedra.."],

        //["Tipo de Espacio*", "Selecciona el espacio que ofrece."],
        [({ onChange }) => <Type.Input onChange={onChange} title={"Tipo de Espacio"} placeholder="Selecciona el espacio que ofrece." />],
        [
            ["Valor min ($)", "$180"],
            ["Valor max ($)", "$300"],
        ],
        [({ onChange }) => <CheckBoxWrapper>
                <CheckBox  onPress={() => (setVerificado(!Verificado))}>
                    <Check>{Verificado ? <Dot /> : null}</Check>
                    <CheckLabel>Verificado</CheckLabel>
                </CheckBox>
                <CheckBox  onPress={() => (setVerificado(!Verificado))}>
                    <Check>{Verificado ? <Dot /> : null}</Check>
                    <CheckLabel>Con fotos</CheckLabel>
                </CheckBox>
            </CheckBoxWrapper>
        ],
    ]
    // <Rules.Input onChange={onChange} title="Verificado" placeholder="Aclaraciones, límites, reglas del lugar..." />

    //

    return (

        <View style={{ flex: 1 }}>
            <Province.Modal title={"Caracteristicas y servicios*"} options={["Buenos Aires", "Córdoba", "San Luis"]} />
            <Type.Modal title={"Tipo de Espacio*"} options={["Casa", "Depósito", "Habitación", "Oficina", "Quinta", "Salón", "Terreno"]} />
            <Services.Modal title={"Caracteristicas y servicios*"} options={["Aire Acondicionado", "Wifi", "LCD", "Cafe/Infusiones", "Snacks", "Música", "Vajilla"]} />
            <Form
                onSubmit={onSubmit}
                fields={fields}
                sendText="Siguiente"
            />
        </View>
    )
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchSpaces: (space) => (dispatch(fetchSpaces(space)))

})
export default connect(null, mapDispatchToProps)(SerchSpace)

const CheckBox = styled.TouchableOpacity`
    flex-grow: 1;
    justify-content: center;
    align-items: center;
`

const Check = styled.View`
  border: solid 1px #cccccc;
  border-radius: 50px;
  height: 20px;
  width: 20px;
  justify-content: center;
`

const Dot = styled.Text`
  height: 10px;
  width: 10px;
  align-self: center;
  background-color: #2cca31;
  border-radius: 40px;
`
const CheckLabel = styled.Text`
    font-size: 14px;
    padding-top:2px;
`

const CheckBoxWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`