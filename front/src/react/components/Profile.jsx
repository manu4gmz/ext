import React, { useEffect } from "react";
import { View } from 'react-native'
import styled from "styled-components/native";
import { connect } from "react-redux";

const Profile = ({ user, navigation }) => {

  return (
    <ViewPrincipal>
      {user.uid
        ? <View style={{ marginTop: 18 }}>
          <Wrapper>
            <ImgProfile source={require('../../public/icons/profile/icono_foto.png')} />
            <InfoContainer>

              <Title>{`${user.firstName} ${user.lastName}`}</Title>

              <ViewText>
                <IconText source={require('../../public/icons/profile/icono_mail.png')} />
                <Text>{`${user.email}`}</Text>
              </ViewText>

              <ViewText>
                <IconText source={require('../../public/icons/profile/icono_telef.png')} />
                {user.phoneNumber
                  ? <Text>{`${user.phoneNumber}`}</Text>
                  : <Text>No disponible</Text>
                }
              </ViewText>

              <ViewText>
                <IconText source={require('../../public/icons/profile/icono_user.png')} />
                {user.address
                  ? <Text>{`${user.address}`}</Text>
                  : <Text>No disponible</Text>
                }
              </ViewText>

            </InfoContainer>

            <Icon
              margen={20}
              margenLeft={22}
              source={require('../../public/icons/edit.png')}
            />
          </Wrapper>
          <Divider />

          <Container>
            <Wrapper>
              <TouchableOpacity onPress={() => navigation.navigate('Root', { screen: "UserProperties" })}>
                <IconPrincipal source={require('../../public/icons/profile/icono_publi_az.png')} />
                <TextLink>Mis Propiedades</TextLink>
              </TouchableOpacity>
            </Wrapper>

            <Wrapper>
              <TouchableOpacity>
                <IconPrincipal source={require('../../public/icons/profile/icono_mensa_az.png')} />
                <TextLink>Mensajes</TextLink>
              </TouchableOpacity>
            </Wrapper>

            <Wrapper>
              <TouchableOpacity>
                <IconPrincipal source={require('../../public/icons/profile/icono_pagos_az.png')} />
                <TextLink>Pagos</TextLink>
              </TouchableOpacity>
            </Wrapper>

            <Wrapper>
              <TouchableOpacity onPress={() => navigation.navigate('Root', { screen: "Favorites" })}>
                <IconPrincipal source={require('../../public/icons/profile/icono_favor_az.png')} />
                <TextLink>Favoritos</TextLink>
              </TouchableOpacity>
            </Wrapper>
          </Container>

          <Divider />

          <Container>
            <Wrapper>
              <TouchableOpacity>
                <IconPrincipal source={require('../../public/icons/profile/icono_datos_be.png')} />
                <TextLink>Mis Datos</TextLink>
              </TouchableOpacity>
            </Wrapper>

            <Wrapper>
              <TouchableOpacity>
                <IconPrincipal source={require('../../public/icons/profile/icono_reput_be.png')} />
                <TextLink>Reputacion</TextLink>
              </TouchableOpacity>
            </Wrapper>

            <Wrapper>
              <TouchableOpacity>
                <IconPrincipal source={require('../../public/icons/profile/icono_ajus_be.png')} />
                <TextLink>Ajustes</TextLink>
              </TouchableOpacity>
            </Wrapper>

            <Wrapper>
              <TouchableOpacity>
                <IconPrincipal source={require('../../public/icons/profile/icono_ayuda_be.png')} />
                <TextLink>Ayuda</TextLink>
              </TouchableOpacity>
            </Wrapper>
          </Container>
        </View>

        : <View>
          <Title>Tenes que loguearte para ver tu perfil</Title>
        </View>
      }

    </ViewPrincipal >
  )
}

const MapStateToProps = (state, ownProps) => ({
  user: state.user.logged,
  userInfo: state.profile.userInfo
})

export default connect(MapStateToProps, null)(Profile);

//Styles
const Wrapper = styled.View`
  flex-direction: row;
  margin: 0px 0;
`
const ViewPrincipal = styled.View`
  justify-content: space-between;
  margin: 0px 10px;
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
width : 90px;
height : 90px;
margin-top: 10px;
`
const Title = styled.Text`
font-weight: bold;
font-size : 18px;
margin-bottom:5px;
margin-left: 2px;
`
const InfoContainer = styled.View`
justify-content : center;
margin : 0 5px;
`
const Icon = styled.Image`
height: 20px;
width: 20px;
margin: ${props => props.margen}px;
margin-left: ${props => props.margenLeft}px;
`
const IconText = styled.Image`
height: 15px;
width: 20px;
margin : 2px 10px 2px 0;
`
const IconPrincipal = styled.Image`
height: 35px;
margin: 6px;
margin-top : 2px;
width: 33px;
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
const TouchableOpacity = styled.TouchableOpacity`
flex-direction : row;
`