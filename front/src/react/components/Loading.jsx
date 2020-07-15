import React, { useState, useEffect } from "react";
import { Animated, Easing, Dimensions, Text, Image} from "react-native";
import styled from "styled-components/native";


export default ({children, order})=>{
	const [rotateAnim] = useState(new Animated.Value(0))
  	const {height: vh} = Dimensions.get("window");

	useEffect(()=>{
		Animated.loop(Animated.timing(rotateAnim,{
			toValue: 1,
			duration: 700,
			useNativeDriver: true,
		})).start();
	},[])	

	return (
		<Centered vh={vh}>
		<Wrapper>
			<Animated.Image 
			  style={{
			    transform: [{
			      rotate: rotateAnim.interpolate({
					  inputRange: [0, 1],
					  outputRange: ['0deg', '360deg']
					})
			    }],
			    width: 30,
			    height: 30,
			  }}
			  source={require("../../public/icons/loading.png")}
			/>
          <LoadingText>Cargando...</LoadingText>
		</Wrapper>
        </Centered>
	)
}

const Centered = styled.View`
  height: ${p=> p.vh-160}px;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
`

const Wrapper = styled.View`
	width: 100%;
	flex-direction: column;
	align-items: center;
`

const LoadingText = styled.Text`
	margin-top: 12px;
	color: #b2b2b2;
`


