import React, { useState, useEffect } from "react";
import { Animated, Easing, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default function Collpasable ({title, content, children, max, min}) {
    const [toggle, setToggle] = useState(false);
    const [toggleAnim] = useState(new Animated.Value(min ? 1 : 0))

    useEffect(()=>{
        Animated.timing(toggleAnim,{
			toValue: +toggle,
			duration: 300,
		}).start();
    },[toggle])

    if (!content && !children) return null;

    return (
        <View>
            <TitleRow>
                <Titulo onPress={() => setToggle(!toggle)}>{title}</Titulo>
                {
                    max && min && min >= max ?
                    null
                    :
                    <TouchableOpacity onPress={() => setToggle(!toggle)}>
                        <Animated.Image 
                            style={{
                                transform: [{
                                    rotate: toggleAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['0deg', '180deg']
                                    })
                                }],
                                width: 30,
                                height: 30,
                            }}
                            source={require("../../public/icons/down.png")}
                        />
                    </TouchableOpacity>
                }
            </TitleRow>
                
            <Animated.View 
                style={{
                    marginBottom: 15, 
                    opacity: min ? 1 : toggleAnim, // Binds directly
                    transform: [{
                        translateX: toggleAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [min ? 0 : -150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
                        }),
                    }],
                    height: toggleAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [min || 0, max || 80]  
                    }),
                    overflow: "hidden"
                }}
            >
                {
                    children ? 
                        children
                    :
                    <View>
                        <Divider/>
                        <Text>{content}</Text>
                    </View> 
                }
            </Animated.View>
        </View>

    )
}

const ContentWrapper = styled.View`
  margin-bottom: 15px;
`
const TitleRow = styled.View`
    flex-direction: row;
`

const Titulo = styled.Text`
    font-size: 17px;
    text-transform: capitalize;
    margin: 3px 3px 0px 3px;
    flex:1;
`
const Divider = styled.View`
  height: 1px;
  background-color: #b2b2b2;
  margin: 10px 0px;
`