import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, ImageBackground, ScrollView } from 'react-native'
import styled from "styled-components/native"
export default ({ space }) => {
    const [mode, setMode] = useState(false)
    return (
        <ScrollView>
            <View style={{ backgroundColor: "white" }} >
                <View style={{ backgroundColor: "#4A94EA", flexDirection: "row", height: "8%" }}>
                    <Lista active={(!mode) + ""} onPress={() => (setMode(false))}>Lista</Lista>
                    <Lista active={(mode) + ""} onPress={() => (setMode(true))}>Mapa</Lista>
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                    {space.photos ? (<Image source={{ uri: space.photos[0] }}
                        style={{ width: 400, height: 400 }} />) : (null)}

                </View>
                <View >
                    <TextoPrecio >{`$ ${space.price}`}</TextoPrecio>
                    <TextoNegro >{`${space.title}.-${space.neighborhood}`}</TextoNegro>
                    <TextoGrande >{`${space.size} mtr2 .-${space.type}`}</TextoGrande>
                    <TextoComun >{space.description}</TextoComun>
                    <TextoCaracteristicas >Caracteristicas especiales</TextoCaracteristicas>
                    <View style={styles.contenedorIconos}>
                        <Image source={require("../../public/icons/ducha-ne.png")} style={styles.imagenInputs} />
                        <Image source={require("../../public/icons/toiletes-ne.png")} style={styles.imagenInputs} />
                        <Image source={require("../../public/icons/wifi-ne.png")} style={styles.imagenInputs} />
                        <Image source={require("../../public/images/sobre-bl.png")} style={styles.imagenInputs} />
                    </View>
                    <TextoCaracteristicas>Ubicacion</TextoCaracteristicas>
                </View>
            </View >
        </ScrollView >
    )
}

const Lista = styled.Text`
    align-self: center;
    font-size: 18px;
    justify-content:center;
    text-align:center;
    margin-top: 10%;
    padding-bottom: 5px;
    border-color:${(props) => props.active == "true" ? "white" : "#4A94EA"};
    border-bottom-width:3px;
    width:50%;
`
const TextoBusquedas = styled.Text`
    text-align: center;
    padding: 1%;
    margin-bottom: 1%;
    background-color: #D9D5C8
`
const TextoPrecio = styled.Text`
    font-size: 30px;
    padding-left: 5%
`
const TextoComun = styled.Text`
    padding-left: 5%;
    margin-top: 1%
`
const TextoNegro = styled.Text`
    padding-left: 5%;
    margin-top: 1%;
    font-weight: bold;
    font-size: 17px
`
const TextoGrande = styled.Text`
    padding-left: 5%;
    margin-top: 2%;
    font-size: 17px;
    margin-bottom: 20px
`
const TextoCaracteristicas = styled.Text`
    padding-left: 5%;
    margin-top: 2%;
    font-size: 17px;
    margin-bottom: 20px;
    margin-top: 30px
`
//<Text onPress=() => (setToogleMap(!toogleMap))} style={styles.lista}>Mapa</Text>
const styles = StyleSheet.create({
    fondo: {
    },
    imagenInputs: {
        height: 45,
        width: 45,
        marginRight: 20,
        marginBottom: 20,
    },
    contenedorIconos: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        borderBottomColor: "black",
        borderBottomWidth: 1,
        width: "70%",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#FFFFFF"
    }
})