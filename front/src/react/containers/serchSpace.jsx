import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { Text, Image, View, TouchableOpacity } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Picker from "../components/Picker";
import TextPrompt from "../components/TextPrompt";
import { fetchSpaces } from "../../redux/actions/spaces"
import styled from "styled-components/native"


//Importando views and components



import Form from '../components/Form';

const SerchSpace = ({ navigation, fetchSpaces }) => {

    const Type = Picker(useState(false), useState(""));
    const Services = Picker(useState(false), useState([]));
    const Observation = TextPrompt(useState(false), useState(""));
    const Rules = TextPrompt(useState(false), useState(""));
    const [Verificado, setVerificado] = useState(false)

    const onSubmit = function (form) {
        const datosSpace = {
            n: form["Ciudad*"].value,
            p: form["Provincia*"].value,
            t: form["Tipo de Espacio*"].value,
            v: Verificado
        }
        fetchSpaces(datosSpace)

    }

    const fields = [
        ["Provincia*", "Buenos Aires, Cordoba, San Luis.."],
        ["Ciudad*", "Flores, Saavedra.."],
        ["Calle*", "Av.Sanmartin"],

        //["Tipo de Espacio*", "Selecciona el espacio que ofrece."],
        [({ onChange }) => <Type.Input onChange={onChange} title={"Tipo de Espacio*"} placeholder="Selecciona el espacio que ofrece." />],
        [
            ["Tamaño #(mtr2)#*", "mtr2"],
            ["Capacidad*", "Cant. personas"]
        ],
        [({ onChange }) => <Services.Input onChange={onChange} title={"Caracteristicas y servicios*"} placeholder="Wifi, Cafe, Snacks, TV, Aire Acond.." />],

        [
            ["Valor min ($)", "$180"],
            ["Valor max ($)*", "$300"],
        ],
        [({ onChange }) => <TouchableOpacity onPress={() => (setVerificado(!Verificado))}>

            <Check>{Verificado ? <Dot /> : null}</Check>
            <TextVerificado>Verificado</TextVerificado></TouchableOpacity>
        ],


    ]
    // <Rules.Input onChange={onChange} title="Verificado" placeholder="Aclaraciones, límites, reglas del lugar..." />

    //

    return (
        <View style={{ flex: 1 }}>
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

const Check = styled.View`
  border: solid 1px #cccccc;
  border-radius: 50px;
  height: 20px;
  width: 20px;
  margin: 3px 0 0 10px;
  justify-content: center;
`

const Dot = styled.Text`
  height: 10px;
  width: 10px;
  align-self: center;
  background-color: #2cca31;
  border-radius: 40px;
`
const TextVerificado = styled.Text`

    font-size: 14px;
    padding-top:2px;


`