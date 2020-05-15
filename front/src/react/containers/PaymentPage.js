import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native'
import styled from "styled-components/native"
import { connect } from 'react-redux'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";
import Button from "../ui/Button";

export default ({navigation, route}) => {
  function freePayment () {
    navigation.replace("PreviewSpace", route.params)
  }

  return (
   
    <ScrollView>
      <Wrapper>
        <StyledView style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}>
          <View style={{padding: 20}}>
            <AddSpaceFormProgress state={2} title="Verifcá tu espacio"/>
          </View>

          <Description>
            Verificar el espacio te permitirá aparecer primero en los resultados de las búsquedas.
          </Description>
          <Description>
            Mandanos tu consulta a <Link>contacto@espacioportiempo.com</Link> y nos pondremos en contacto. Iremos al espacio para poder corroborar las características del mismo y brindarte ayuda para mejorar tus posibilidades.
          </Description>
        </StyledView>
        <Button
          mt={"6px"} mb={"60px"} ml={"5px"} mr={"5px"}
          bg="#4A94EA"
          color="#F7F7F7"
          onPress={freePayment}
        >Siguiente</Button>
      </Wrapper>
    </ScrollView>
    
  )
}

const Link = styled.Text`
  color: #4a94ea;
`

const Description = styled.Text`
  margin: 6px 0px;
  font-size: 15px;
  color: #666;
`

const StyledView = styled.View`
  margin: 15px 5px;
  background-color: #F7F7F7;
  padding : 20px 20px 15px;
  border-radius: 10px;
`

const Wrapper = styled.View`
  flex: 1;
  margin: 0px auto;
  width: 100%;
  padding: 0 10px;
  max-width: 500px;
`
