import styled from "styled-components/native";
import React, { useState, useEffect } from 'react'
import { Text, View } from 'react-native'

export default (props) => {

	return (
		<Button {...props}>{props.children}</Button>
	)
}

const Button = styled.Text`
  width:${props => props.width || "100%"};
  margin: 0px;
  margin-bottom:${props => props.mb || "0px"};
  margin-top:${props => props.mt || "0px"};
  margin-left:${props => props.ml || "0px"};
  margin-right:${props => props.mr || "0px"};
  flex-grow: 1;
  height: 35px;
  line-height: 35px;

  text-align : center;
  border-radius: 5px;
  color: ${props => props.color || "#F7F7F7"};
  background-color: ${props => props.bg || "#4a94ea"};
`

