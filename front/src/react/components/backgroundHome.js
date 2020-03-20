import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, ImageBackground, View, ScrollView } from 'react-native';
import styled from "styled-components/native";
import { connect } from 'react-redux';
import Button from "../ui/Button";

const backgroundHome = ({ navigation, user }) => {
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
            <Button>Buscar</Button>
          </StyledView>

          <StyledView>
            <StyledTitle>Ofrecé tu Espacio</StyledTitle>
            <StyledText>Ganá dinero ofreciendo tu espacio, local u oficina disponible para que otros puedan disfrutarlo cuando no lo utilices.</StyledText>

            {user
              ? <Button
                onPress={() => navigation.navigate('AddSpace')}
                bg="#F77171"
              >Ofrecer
                </Button>

              : <Button
                onPress={() => navigation.navigate('Login')}
                bg="#F77171"
              >Ofrecer
                </Button>
            }

          </StyledView>

          <DoubleWraper>
            <Button
              bg="#F7F7F7"
              color="gray"
              mr="5px"
            >Conocé más
          </Button>

            <Button
              bg="#F7F7F7"
              color="gray"
              ml="5px"
            >Novedades
            </Button>
          </DoubleWraper>

          <View>
            <Button
              bg="#4A94EA"
              color="#F7F7F7"
              mb="3%"
            >Invita amigos y gana!
            </Button>

            <Button
              bg="#F77171"
              color="#F7F7F7"
              mb="3%"
              onPress={() => navigation.navigate('Login')}
            >Go to login
            </Button>
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
  margin: 3% 0px;
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

export default connect(null, null)(backgroundHome)





