import React, { useEffect } from "react";
import { View } from 'react-native'
import styled from "styled-components/native";
import { connect } from "react-redux";

const Profile = ({ user }) => {
  console.log(user);
  return (
    <ViewPrincipal>
      <Wrapper>
        <ImgProfile source={require('../../public/icons/profile.png')} />
        <InfoContainer>
          <Title>Sebastian Gonzalez</Title>
          <ViewText>
            <IconText source={require('../../public/icons/celu.jpg')} />
            <Text>Bienvenido</Text>
          </ViewText>
          <ViewText>
            <IconText source={require('../../public/icons/celu.jpg')} />
            <Text>Bienvenido</Text>
          </ViewText>
          <ViewText>
            <IconText source={require('../../public/icons/celu.jpg')} />
            <Text>Bienvenido</Text>
          </ViewText>
        </InfoContainer>

        <Icon
          margen={'20px'}
          margenLeft={'2%'}
          source={require('../../public/icons/edit.png')}
        />
      </Wrapper>
      <Divider />

      <Container>
        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba.png')} />
          <TextLink>Publicaciones</TextLink>
        </Wrapper>

        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba.png')} />
          <TextLink>Mensajes</TextLink>
        </Wrapper>

        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba.png')} />
          <TextLink>Pagos</TextLink>
        </Wrapper>

        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba.png')} />
          <TextLink>Favoritos</TextLink>
        </Wrapper>
      </Container>

      <Divider />

      <Container>
        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba2.png')} />
          <TextLink>Mis Datos</TextLink>
        </Wrapper>

        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba2.png')} />
          <TextLink>Reputacion</TextLink>
        </Wrapper>

        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba2.png')} />
          <TextLink>Ajustes</TextLink>
        </Wrapper>

        <Wrapper>
          <IconPrincipal source={require('../../public/icons/icon-prueba2.png')} />
          <TextLink>Ayuda</TextLink>
        </Wrapper>
      </Container>

    </ViewPrincipal>
  )
}

const MapStateToProps = (state, ownProps) => ({
  user: state.user.logged
})

export default connect(MapStateToProps, null)(Profile);

//Styles
const Wrapper = styled.View`
  flex-direction: row;
  margin: 0px 0;
`
const ViewPrincipal = styled.View`
  justify-content: space-between;
  margin: 0px 15px;
  max-width: 500px;
  align-self: center;

`
const Divider = styled.View`
  height: 1px;
  width: 90%;
  background-color: #b2b2b2;
  margin-top : 20px;
  margin-bottom : 20px; 
  align-self: center;
`
const ImgProfile = styled.Image`
width : 110px;
height : 110px;
margin: 0;
`
const Title = styled.Text`
font-weight: bold;
font-size : 18px;
`
const InfoContainer = styled.View`
justify-content : center;
margin : 0 5px;
`
const Icon = styled.Image`
height: 20px;
width: 20px;
margin : ${props => props.margen}
margin-left : ${props => props.margenLeft}
`
const IconText = styled.Image`
height: 15px;
width: 20px;
margin : 2px 10px;
`
const IconPrincipal = styled.Image`
height: 30px;
width: 30px;
margin : 5px 10px;
`
const Text = styled.Text`
color: rgba(28, 28, 30, 0.68);
text-align : justify;
`
const ViewText = styled.View`
flex-direction : row;
`
const Container = styled.View`
justify-content: space-between;
`
const TextLink = styled.Text`
color: #262626;
font-size : 16px;
padding-top : 10px;
`
