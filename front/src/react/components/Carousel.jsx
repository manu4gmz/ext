import React, { useState, useEffect, useRef } from 'react'

import { StyleSheet, Text, View, Image, TextInput, Animated, Dimensions, ScrollView } from 'react-native'
import styled from "styled-components/native";

import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';


export default ({images, height}) => {

    const [index, setIndex] = useState(0)

    const [oldPos, setOldPos] = useState(0)
    const [offsetAnim] = useState(new Animated.Value(0) )

    const { width: vw } = Dimensions.get('window'); 

	useEffect(()=>{

        Animated.timing(offsetAnim,{
            toValue: vw * -index,
            duration: 300
        }).start();
    },[index])

    function changeIndex(amount) {
        if (index+amount >= images.length) setIndex(0);
        else if (index+amount < 0) setIndex(images.length-1);
        else setIndex(index+amount);
    }
    function onFling(ev) {
        if (ev.nativeEvent.state > 3) {
            console.log(ev.nativeEvent)
            if (ev.nativeEvent.absoluteX - oldPos < 0) changeIndex(1);
            else if (ev.nativeEvent.absoluteX - oldPos > 0) changeIndex(-1);
        }
        setOldPos(ev.nativeEvent.absoluteX);
    }

    return (

    	<View style={{ width: "100%", alignItems: "center" }}>
            {
                images.length ? 
                    <FlingGestureHandler direction={Directions.LEFT | Directions.RIGHT} onHandlerStateChange={onFling}>
                    <View>
                        <CarouselLabel>{index+1}/{images.length}</CarouselLabel>
                        <Animated.View style={{ flexDirection: "row", width: vw, position: "relative", left: offsetAnim }}>
                        {
                            images.map((uri,i) => (
                                <CarouselContainer key={i} style={{width: vw}} height={height}>
                                    <CarouselImage source={{uri}} style={{ width: vw, height: height || 400 }} /> 
                                </CarouselContainer>
                            ))
                        }
                        </Animated.View>
                    </View>
                    </FlingGestureHandler>
                    : <NoPhotos>No hay fotos para mostrar</NoPhotos>
            }

        </View>

    )
}

const NoPhotos = styled.Text`
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    margin-top: 30px;
`

const CarouselContainer = styled.View`
    height: ${p=> p.height || 400}px;
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
    right: 20px;
    top: 10px;
    color:white;
    font-size: 14px;
`