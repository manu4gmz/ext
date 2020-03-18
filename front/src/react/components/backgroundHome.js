import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ImageBackground, View, ScrollView } from 'react-native'
import styled from "styled-components/native"
import { connect } from 'react-redux'

const backgroundHome = () => {
  return (
    <ImageBackground
      source={require('../../public/images/imagen_fondo1.jpg')}
      style={styles.fondo}
      blurRadius={4}
    >
      <Wrapper>
        <ScrollView>
          <StyledView>
            <StyledTitle>Encontrá tu Espacio</StyledTitle>
            <StyledText>Descubrí espacios para todas tus reuniones laborales, fiestas, presentaciones, eventos y mas.</StyledText>
            <Button
              color="#4A94EA"
              width="100%"
              letras="#F7F7F7"
            >Buscar</Button>
          </StyledView>

          <StyledView>
            <StyledTitle>Ofrecé tu Espacio</StyledTitle>
            <StyledText>Ganá dinero ofreciendo tu espacio, local u oficina disponible para que otros puedan disfrutarlo cuando no lo utilices.</StyledText>
            <Button
              color="#F77171"
              width="100%"
              letras="#F7F7F7"
            >Buscar</Button>
          </StyledView>

          <DoubleWraper>
            <WideBtn
              color="#F7F7F7"
              letras="gray"
              style={styles.DoubleBtn}
            >Conocé más
          </WideBtn>

            <WideBtn
              color="#F7F7F7"
              letras="gray"
              style={styles.DoubleBtn}
            >Novedades
            </WideBtn>
          </DoubleWraper>

          <View>
            <WideBtn
              color="#4A94EA"
              letras="#F7F7F7"
            >Invita amigos y gana!
          </WideBtn>

            <WideBtn
              color="#F77171"
              letras="#F7F7F7"
            >Conoce mas sobre nosotros
          </WideBtn>
          </View>
        </ScrollView>
      </Wrapper>
    </ImageBackground >
  )
}

const styles = StyleSheet.create({
  fondo: {

    position: 'absolute',
    width: '100%',
    height: '100%'
  },

  DoubleBtn: {
    margin: '0px 15px'
  },

  view1: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10
  },

  view2: {

    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  }
})

const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3%;
  
`
const Wrapper = styled.View`
  align-items:center;
  justify-content: center;
  flex-direction: column;
  margin: 0px 15px;
`
const StyledView = styled.View`
  margin: 10px 0;
  background-color: #F7F7F7;
  padding : 20px 25px 15px;
  border-radius: 10px
`
const StyledTitle = styled.Text`
margin-bottom : 2%;
font-size: 25px ;
`
const StyledText = styled.Text`
margin-bottom : 10px;
font-size: 15px ;
color : gray;
`
const Button = styled.Text`
  padding-top : 4%;
  width:${props => props.width}
  height: 45px;
  text-align : center;
  border-radius: 5px;
  color: ${props => props.letras}
  background-color: ${props => props.color}
`
const WideBtn = styled.Text`
  flex-grow : 1;
  margin : 3% 5px;
  padding-top : 4%;
  font-size: 15px;
  height: 50px;
  text-align : center;
  border-radius: 5px;
  color: ${props => props.letras}
  background-color: ${props => props.color}
`
export default connect(null, null)(backgroundHome)





