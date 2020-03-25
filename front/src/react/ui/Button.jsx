import styled from "styled-components/native";
import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity  } from 'react-native'

export default (props) => {

	return (
    <Touchable>
  		  <Button {...props}>{props.children}</Button>
    </Touchable>
	)
}

const Touchable = styled.TouchableOpacity`
  flex-grow: 1;
`

const Button = styled.Text`
  margin: 0px;
  margin-bottom:${props => props.mb || "0px"};
  margin-top:${props => props.mt || "0px"};
  margin-left:${props => props.ml || "0px"};
  margin-right:${props => props.mr || "0px"};
  height: 35px;
  line-height: 25px;
  padding: 5px 0;
  flex-grow: 1;
  text-align : center;
  border-radius: 5px;
  color: ${props => props.color || "#F7F7F7"};
  background-color: ${props => props.bg || "#4a94ea"};
`

