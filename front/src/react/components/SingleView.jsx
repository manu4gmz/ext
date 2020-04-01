import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Animated, Dimensions, ScrollView, Linking } from 'react-native'
import styled from "styled-components/native";
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import Boton from './../ui/Button'
import qs from 'qs'

export default ({ space }) => {
    const [mode, setMode] = useState(false)

    const [index, setIndex] = useState(0)
    const [pics, setPics] = useState([])

    const [oldPos, setOldPos] = useState(0)
    //let pics = useRef((space.photos || []).map(_=>React.createRef()));

    const [offsetAnim] = useState(new Animated.Value(0))

    const { width: vw } = Dimensions.get('window');

    useEffect(() => {
        // console.log(pics);


        Animated.timing(offsetAnim, {
            toValue: vw * -index,
            duration: 300
        }).start();
    }, [index])

    function changeIndex(amount) {
        if (index + amount >= space.photos.length) setIndex(0);
        else if (index + amount < 0) setIndex(space.photos.length - 1);
        else setIndex(index + amount);
    }

    function onFling(ev) {
        if (ev.nativeEvent.state > 3) {
            console.log(ev.nativeEvent)
            if (ev.nativeEvent.absoluteX - oldPos < 0) changeIndex(1);
            else if (ev.nativeEvent.absoluteX - oldPos > 0) changeIndex(-1);
        }
        setOldPos(ev.nativeEvent.absoluteX);
    }

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


    return (
        <ScrollView>
            <View style={{ backgroundColor: "#4A94EA", flexDirection: "row" }}>
                <Lista active={(!mode) + ""} onPress={() => (setMode(false))}>Lista</Lista>
                <Lista active={(mode) + ""} onPress={() => (setMode(true))}>Mapa</Lista>
            </View>
            <View style={{ width: "100%", alignItems: "center" }}>
                {
                    space.photos && space.photos.length ?
                        <FlingGestureHandler direction={Directions.LEFT | Directions.RIGHT} onHandlerStateChange={onFling}>
                            <View>
                                <CarouselLabel>{index + 1}/{space.photos.length}</CarouselLabel>
                                <Animated.View style={{ flexDirection: "row", width: vw, position: "relative", left: offsetAnim }}>
                                    {
                                        space.photos.map((uri, i) => (
                                            <CarouselContainer key={i} style={{ width: vw }}>
                                                <CarouselImage source={{ uri }} style={{ width: 400, height: 400 }} />
                                            </CarouselContainer>
                                        ))
                                    }
                                </Animated.View>
                            </View>
                        </FlingGestureHandler>
                        : <NoPhotos>No hay fotos para mostrar</NoPhotos>
                }

            </View>
            <Container>
                <TextoPrecio>${space.price}</TextoPrecio>
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
        </ScrollView>
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

const CarouselContainer = styled.View`
    height: 400px;
`

const Carousel = styled.View`
    height: 400px;
    position: relative;
    flex-direction: row;
`

const CarouselImage = styled.Image`

`

const CarouselLabel = styled.Text`
    position: absolute;
    z-index: 2;
    right: 10px;
    top: 10px;
    color:white;
    font-size: 14px;
`
const DoubleWraper = styled.View`
flex-direction: row;
justify-content: space-between;
margin: 3% 0px;
`