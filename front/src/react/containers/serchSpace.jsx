import React, { Component, useEffect, useState } from 'react';
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import { Text, Image, View, TouchableOpacity } from 'react-native'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Picker from "../components/Picker";
import TextPrompt from "../components/TextPrompt";
import styled from "styled-components/native";
import Typeahead from "../components/GenericTypeahead";
import { fetchProvincias, fetchLocalidades, setCentroide } from "../../redux/actions/locations";
import { connect } from 'react-redux'
import Form from '../components/Form';

const fields = [
    "Casa",
    "Quinta",
    "Depósito",
    "Habitación",
    "Oficina",
    "Salón",
    "Terreno" 
  ]

function getQuery(options) {
    let queryCode = 0;
    fields.map((key,i) => {
        queryCode += Number(options.includes(key))*(2**i)
    })
    return queryCode;
}

const SerchSpace = ({ navigation, fetchSpaces, fetchLocalidades, fetchProvincias, setCentroide }) => {

    const Province = Picker(useState(false), useState(""));
    const Type = Picker(useState(false), useState([]));
    const Services = Picker(useState(false), useState([]));

    const [Verificado, setVerificado] = useState(false);
    const [ConFotos, setConFotos] = useState(false);

    //const [provincias, setProvincias] = useState([]);
    //const [localidades, setLocalidades] = useState([]);
    const [province, setProvince] = useState({});
    const [localidad, setLocalidad] = useState({});

    const onSubmit = function (form) {
        let filter = {};
        if (form["Provincia*"] && province.id && form["Provincia*"].value) filter.p = form["Provincia*"].value;
        if (form["Barrio"] && province.id && form["Barrio"].value) filter.n = form["Barrio"].value;
        if (form["Tipo de Espacio"] && form["Tipo de Espacio"].value) filter.t = getQuery(form["Tipo de Espacio"].value);
        if (form["Valor min ($)"] && form["Valor min ($)"].value) filter.min = form["Valor min ($)"].value;
        if (form["Valor max ($)"] && form["Valor max ($)"].value) filter.max = form["Valor max ($)"].value;
        if (Verificado) filter.v = Verificado;
        if (ConFotos) filter.photos = ConFotos;

        console.log(province, localidad)
        if (localidad && localidad.coordenadas) setCentroide(localidad.coordenadas);
        else if (province && province.coordenadas) setCentroide(province.coordenadas);
        else setCentroide();

        navigation.navigate("AllSpaces", { query: filter, index: 1 })
    }

    function getProvincias(val) {
        return fetchProvincias(val)
    }

    function getLocalidades(val) {
        return fetchLocalidades(val, province.id)
        /*    .then(data => {
                const body = data.map((elemento) => {
                    return { label: elemento.label, id: elemento.id }
                })
                setLocalidades(body);
            })*/
    }

    //  function getLocalidades(val) {
    //fetchLocalidades(val, province.id)
    //.then(data => setLocalidades(data))}

    const handleSelectProvince = (val) => {
        if (!val) return setProvince({});
        setProvince(val);
    }
    
    const handleSelectLocalidad = (val) => {
        if (!val) return setLocalidad({});
        setLocalidad(val);
    }

    const fields = [
        [({ onChange }) => <Typeahead
            title="Provincia*"
            placeholder="Buenos Aires, Cordoba, San Luis.."
            getOptions={getProvincias}
            handleSelect={handleSelectProvince}
            onChange={onChange}
        />, 12],
        //[({ onChange }) => <Province.Input onChange={onChange} title={"Provincia*"} placeholder="Buenos Aires, Cordoba, San Luis.." />],
        [({ onChange }) => province.id ? <Typeahead
            title="Barrio"
            placeholder="Flores, Saavedra.."
            getOptions={getLocalidades}
            handleSelect={handleSelectLocalidad}
            onChange={onChange}
        /> : null, 11],

        //["Tipo de Espacio*", "Selecciona el espacio que ofrece."],
        [({ onChange }) => <Type.Input onChange={onChange} title={"Tipo de Espacio"} placeholder="Selecciona el espacio que ofrece." />],
        [
            ["Valor min ($)", "$180"],
            ["Valor max ($)", "$300"],
        ],
        [({ onChange }) => <CheckBoxWrapper>
            <CheckBox onPress={() => (setVerificado(!Verificado))}>
                <Check><Dot active={Verificado + ""} /></Check>
                <CheckLabel>Verificados</CheckLabel>
            </CheckBox>
            <CheckBox onPress={() => (setConFotos(!ConFotos))}>
                <Check><Dot active={ConFotos + ""} /></Check>
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
            <Form
                name="search"
                onSubmit={onSubmit}
                fields={fields}
                sendText="Siguiente"
                header={() => null}
            />
        </View>
    )
}


const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchProvincias: (val) => dispatch(fetchProvincias(val)),
    fetchLocalidades: (val, id) => dispatch(fetchLocalidades(val, id)),
    setCentroide: (cen) => dispatch(setCentroide(cen))
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
  height: 24px;
  width: 24px;
  justify-content: center;
`

const Dot = styled.Text`
  height: 12px;
  width: 12px;
  align-self: center;
  background-color: ${p => p.active == "true" ? "#2cca31" : "#d9d5c8"};
  border-radius: 40px;
`
const CheckLabel = styled.Text`
    font-size: 12px;
    padding-top:2px;
`

const CheckBoxWrapper = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: center;
`

