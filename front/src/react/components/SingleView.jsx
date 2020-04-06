import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Animated, Dimensions, ScrollView } from 'react-native'
import styled from "styled-components/native";
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import MapView, { Marker } from 'react-native-maps';
const lugares = [{
    title: "Agustiniano",
    description: "Un colegio de mierda",
    latitude: -34.569735,
    longitude: -58.544380
},
{
    title: "Casa",
    description: "san andres",
    latitude: -34.569050,
    longitude: -58.5484389,
},
{
    title: "Taller",
    description: "Escuela taller",
    latitude: -34.569393,
    longitude: -58.542963
}]
export default ({ space, loading, allSpaces }) => {
    const [mode, setMode] = useState(false)

    if (loading) return <Loading />;

    return (
        <ScrollView>
            <View style={{ backgroundColor: "white" }} >
                <View style={{ backgroundColor: "#4A94EA", flexDirection: "row" }}>
                    <Lista active={(!mode) + ""} onPress={() => (setMode(false))}>Lista</Lista>
                    <Lista active={(mode) + ""} onPress={() => (setMode(true))}>Mapa</Lista>
                </View>
                {!mode ? (
                    <View>

                        <Carousel images={space.photos || []} />
                        <Container>
                            <TextoPrecio>${space.price} <Span>por hora</Span></TextoPrecio>
                            <TextoNegro>{space.title} - <Capitalize>{space.neighborhood}</Capitalize></TextoNegro>
                            <TextoGrande>{space.size} mtr2 - {space.type}</TextoGrande>
                            <TextoComun>{space.description}</TextoComun>
                            <TextoCaracteristicas >Caracteristicas especiales</TextoCaracteristicas>
                            <ServicesWrapper>
                                <Service source={require("../../public/icons/ducha-ne.png")} />
                                <Service source={require("../../public/icons/toiletes-ne.png")} />
                                <Service source={require("../../public/icons/wifi-ne.png")} />
                            </ServicesWrapper>
                            <TextoCaracteristicas>Ubicacion</TextoCaracteristicas>
                            <MapView style={styles.mapStyle}
                                initialRegion={{
                                    latitude: space.location[1].lat,
                                    longitude: space.location[1].lon,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}>
                                <Marker
                                    title={space.title}
                                    description={space.description}
                                    coordinate={
                                        {
                                            latitude: space.location[1].lat,
                                            longitude: space.location[1].lon,
                                        }} />

                            </MapView>
                        </Container>
                    </View>
                ) : (<View>
                    <MapView style={styles.mapAll}
                        initialRegion={{
                            latitude: space.location[0].lat,
                            longitude: space.location[0].lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}>
                        {allSpaces.map((lugar, index) => {
                            return (
                                <Marker
                                    key={index}
                                    title={lugar.title}
                                    description={lugar.description}
                                    coordinate={
                                        {
                                            latitude: lugar.location[1].lat,
                                            longitude: lugar.location[1].lon,
                                        }}
                                />
                            )
                        })}
                    </MapView>
                </View>)}
            </View >
        </ScrollView >
    )
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
    },
    mapStyle: {
        width: 500,
        height: 350
    },
    mapAll: {
        marginTop: 2,
        maxWidth: 500,
        height: 800
    }
})

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
const Span = styled.Text`
    font-weight: 200;
    font-size: 12px;
`
