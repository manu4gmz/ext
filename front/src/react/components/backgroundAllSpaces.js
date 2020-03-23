import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, ScrollView } from 'react-native';
import styled from "styled-components/native";

export default ({ espacios }) => {
    const [mode, setMode] = useState(false)
    return (
        <ScrollView>
            <View style={{ backgroundColor: "white" }} >
                <View style={{ backgroundColor: "#4A94EA", flexDirection: "row", height: "8%" }}>
                    <Lista active={(!mode) + ""} onPress={() => (setMode(false))}>Lista</Lista>
                    <Lista active={(mode) + ""} onPress={() => (setMode(true))}>Mapa</Lista>
                </View>
                <View>
                    {espacios.map(espacio => (
                        <View>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <Image source={{ uri: espacio.imgUrl }}
                                    style={{ width: 400, height: 400 }} />
                            </View>
                            <View >
                                <TextoPrecio >{espacio.precio}</TextoPrecio>
                                <TextoNegro >Amplio para usos multiples.-San Isidro</TextoNegro>
                                <TextoGrande >120 mtr2 -Baño privado-Aire Acondicionado.-Musica</TextoGrande>
                                <TextoComun >{espacio.descripcion}</TextoComun>
                                <TextoCaracteristicas >Caracteristicas especiales</TextoCaracteristicas>
                                <View style={styles.contenedorIconos}>
                                    {/* <Image source={require("../../public/icons/ducha-ne.png")} style={styles.imagenInputs} />
                                    <Image source={require("../../public/icons/toiletes-ne.png")} style={styles.imagenInputs} />
                                    <Image source={require("../../public/icons/wifi-ne.png")} style={styles.imagenInputs} />
                                    <Image source={require("../../public/images/sobre-bl.png")} style={styles.imagenInputs} /> */}
                                    {espacio.caracteristicas.map((caracteristica, index) => (index > 4 ?
                                        (<Image source={require(caracteristica.icon)} style={styles.imagenInputs} />)
                                        : null))}
                                </View>
                                <TextoCaracteristicas>Ubicacion</TextoCaracteristicas>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>)
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