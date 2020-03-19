import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ImageBackground, View, ScrollView } from 'react-native'
import styled from "styled-components/native"
import { connect } from 'react-redux'

const backgroundHome = ({ navigation }) => {
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
              height='45px'
              style={{ marginRight: 5 }}
            >Conocé más
          </WideBtn>

            <WideBtn
              color="#F7F7F7"
              letras="gray"
              height='45px'
              style={{ marginLeft: 5 }}
            >Novedades
            </WideBtn>
          </DoubleWraper>

          <View>
            <WideBtn
              color="#4A94EA"
              letras="#F7F7F7"
              height='50px'
            >Invita amigos y gana!
            </WideBtn>

            <WideBtn
              color="#F77171"
              letras="#F7F7F7"
              height='50px'
              onPress={() => navigation.navigate('Login')}
            >Go to login
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
  }
})

const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 3%;
`
const Wrapper = styled.View`
flex-direction: row;
  justify-content: space-between;
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
  margin : 3% 0;
  padding-top : 4%;
  font-size: 15px;
  height: ${props => props.height}
  text-align : center;
  border-radius: 5px;
  color: ${props => props.letras}
  background-color: ${props => props.color}
`

export default connect(null, null)(backgroundHome)





