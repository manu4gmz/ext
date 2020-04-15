import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Animated, Dimensions, ScrollView, Linking, TouchableOpacity } from 'react-native'
import styled from "styled-components/native";
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import Boton from './../ui/Button'
import qs from 'qs'
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import MapView from 'react-native-maps';
import Map from "../components/map";

const icons = {
    "Aire Acondicionado":require("../../public/icons/services/airconditioner.png"),
    "Wifi":require("../../public/icons/services/wifi.png"),
    "LCD":require("../../public/icons/services/lcd.png"),
    "Cafe/Infusiones":require("../../public/icons/services/coffee.png"),
    "Snacks":require("../../public/icons/services/snacks.png"),
    "Música":require("../../public/icons/services/music.png"),
    "Vajilla":require("../../public/icons/services/dishes.png"),
    "Baño":require("../../public/icons/services/toiletes.png"),
    "Ducha":require("../../public/icons/services/ducha.png"),
}

export default ({ space, loading, allSpaces, navigation, edit, handleEdit }) => {
    const [mode, setMode] = useState(false)
    if (loading) return <Loading />;

    async function sendEmail(to, subject, body, options = {}) {
        const { cc, bcc } = options;

        let url = `mailto:${to}`;

        // Create email link query
        const query = qs.stringify({
            subject: subject,
            body: body,
            cc: cc,
            bcc: bcc
        });

        if (query.length) {
            url += `?${query}`;
        }

        // check if we can use this link
        const canOpen = await Linking.canOpenURL(url);

        if (!canOpen) {
            throw new Error('Provided URL can not be handled');
        }

        return Linking.openURL(url);
    }

    console.log("Single View en update", space.location[0])

    console.log(space.services)

    return (
        <ScrollView>
            <View>
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
                                {
                                    (space.services || []).map((service, i) => (
                                        <Service key={i} source={icons[service]} />


                                    ))
                                }
                            </ServicesWrapper>
                            <TextoCaracteristicas>Ubicacion</TextoCaracteristicas>


                            <MapView style={styles.mapStyle}
                                initialRegion={{
                                    latitude: Number(space.location[0].lat),
                                    longitude: Number(space.location[0].lng),
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}>
                                <MapView.Marker
                                    coordinate={
                                        {
                                            latitude: Number(space.location[0].lat),
                                            longitude: Number(space.location[0].lng),
                                        }}>
                                    <Image
                                        style={{ width: 40, height: 50 }}
                                        source={require("../../public/icons/icono_marker_az.png")}
                                    />
                                    {/*

                                    <Callout>
                                        <View style={styles.customCallOut}>
                                            <Text style={styles.textoCallOut}>{space.title}</Text>
                                            <Text style={{ padding: 2, color: "#FFF" }}>{space.description}</Text>
                                        </View>

                                    </Callout>

*/}

                                </MapView.Marker>




                            </MapView>
                            <DoubleWraper>
                                <Boton
                                    onPress={() =>
                                        sendEmail(
                                            'robertovilla2102@gmail.com',
                                            'Greeting!',
                                            'I think you are fucked up how many letters you get.')
                                            .then(() => {
                                                console.log('Our email successful');
                                            })}
                                    bg="#4A94EA"
                                    color="#F7F7F7"
                                    mr="5px"
                                >Email
                  </Boton>

                                <Boton
                                    onPress={() => Linking.openURL(`tel:+54 9 ${'11 65342325'}`)}
                                    bg="#F77171"
                                    color="#F7F7F7"
                                    ml="5px"
                                >Llamar
                  </Boton>
                            </DoubleWraper>

                        </Container>
                    </View>
                ) 
                : 
                <Map navigation={navigation} allSpaces={allSpaces} centroide={space.location[0]}></Map>
                
                }


            </View>


        </ScrollView >
    )
}




const Lista = styled.Text`
    align-self: center;
    font-size: 18px;
    justify-content:center;
    text-align:center;
    padding-bottom: 5px;
    color: ${props => (props.active == "true" ? "white" : "#000144")};
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


const ServicesWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
`

const Service = styled.Image`
    height: 50px;
    width: 50px;
    margin: 0 10px 20px;
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
    margin-top: 30px;`
const DoubleWraper = styled.View`
flex-direction: row;
justify-content: space-between;
margin: 3% 0px;
`
const Span = styled.Text`
    font-weight: 200;
    font-size: 12px;
`

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
        width: "100%",
        overflow: "hidden",
        height: 350
    },
    mapAll: {
        marginTop: 2,
        maxWidth: 500,
        height: 800
    },
    customCallOut: {
        width: 250,
        backgroundColor: "#F77171",



    },
    textoCallOut: {
        padding: 2,
        textAlign: "center",
        color: "#FFF"


    }
})
