import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, ImageBackground, ScrollView } from 'react-native'
import styled from "styled-components/native"
import Button from "../ui/Button";
import { addSpace } from '../../redux/actions/spaces'
import { connect } from 'react-redux'
import SingleView from "../components/SingleView";


/*
    const space = {
        photos: [ "https://cdn-3.expansion.mx/dims4/default/4fec13d/2147483647/strip/true/crop/624x351+0+0/resize/800x450!/quality/90/?url=https%3A%2F%2Fcherry-brightspot.s3.amazonaws.com%2Fmedia%2F2014%2F01%2F01%2Fpato-de-hule-gigante-hong-kong.jpg" ],
        type: "Depósito",
        description: "Ta re piola. Ta re piola. Ta re piola. Ta re re piola. Ta re piola. Ta re piola. Ta re piola. Ta re piola. Ta re piola. Ta re piola.",
        neighborhood: "palermo",
        size:10,
        title: "Hermoso lugar para pasar con la familia.",
        price: 530,
    }
*/

const PreviewSpace = ({route, navigation, addSpace}) => {
    
    const { space } = route.params;

    function onSubmit () {
        navigation.popToTop();
        navigation.navigate("UploadingFiles", { space });
    }

    return (
        <SingleView
            space={{...space, photos: space.photos.map(pic => pic.uri)}}
            loading={false}
            preview={true}
        >
            <Button mb="12px" bg="#2cca31" onPress={onSubmit}>Publicar espacio</Button>
        </SingleView>
    )
}

function useInput(name, form, setForm) {
    return {
        value: (form[name].value || form[name]),
        onChangeText: (val)=>setForm(form =>({...form, [name]: val})),
        placeholder: name
    }
}

const Lista = styled.Text`
    align-self: center;
    font-size: 18px;
    justify-content:center;
    text-align:center;
    padding-bottom: 5px;
    border-color:${(props) => props.active == "true" ? "white" : "#4A94EA"};
    border-bottom-width:3px;
    width:50%;
`
const TextoBusquedas = styled.Text`
    text-align: center;
    margin-bottom: 1%;
    background-color: #D9D5C8
`
const TextoPrecio = styled.Text`
    font-size: 30px;
    font-weight: 600;
`
const TextoComun = styled.Text`
    margin-top: 1%;
`
const TextoNegro = styled.Text`
    margin-top: 1%;
    font-weight: 700;
    font-size: 17px
`
const TextoGrande = styled.Text`
    margin-top: 2%;
    font-size: 17px;
    margin-bottom: 20px
`
const TextoCaracteristicas = styled.Text`
    margin-top: 2%;
    font-size: 17px;
    margin-bottom: 20px;
    margin-top: 30px
`
//<Text onPress=() => (setToogleMap(!toogleMap))} style={styles.lista}>Mapa</Text>

const ServicesWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;
`

const Service = styled.Image`
    height: 45px;
    width: 45px;
    margin-right: 20px;
    margin-bottom: 20px;
`

const Capitalize = styled.Text`
    text-transform: capitalize;
`

const Container = styled.View`
    margin: 10px 12px;
`

const NoPhotos = styled.Text`
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    margin-top: 30px;
`



const mapDispatchToProps = (dispatch) => ({
  addSpace: (body) => dispatch(addSpace(body)),
})

export default connect(null, mapDispatchToProps)(PreviewSpace);
