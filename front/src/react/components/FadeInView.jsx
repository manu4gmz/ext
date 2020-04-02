import React, { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";

export default ({children, order})=>{
	const [fadeAnim] = useState(new Animated.Value(0))

	useEffect(()=>{
		Animated.timing(fadeAnim,{
			toValue: 1,
			duration: 500,
			delay: order ? 300*order : 0,
		}).start();
	},[])


	return (
		<Animated.View style={{
		    opacity: fadeAnim, // Binds directly
		    transform: [{
		      translateY: fadeAnim.interpolate({
		        inputRange: [0, 1],
		        outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
		      }),
		    }],
		  }}>
		{children}
		</Animated.View>
	)
}

