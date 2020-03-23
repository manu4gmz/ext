import styled from "styled-components/native";
import React, { useState, useEffect } from 'react'
import { Text, View, TouchableOpacity, Image  } from 'react-native'

export default (props) => {

	return (
    <TouchableOpacity onPress={props.onPress}>
      <Icon {...props}/>
    </TouchableOpacity>
	)
}

const Icon = styled.Image`
  height: ${props => props.height || "30px"};
  width: ${props => props.width || "30px"};
  margin-bottom:${props => props.mb || "0px"};
  margin-top:${props => props.mt || "0px"};
  margin-left:${props => props.ml || "0px"};
  margin-right:${props => props.mr || "0px"};
  display: flex;
`