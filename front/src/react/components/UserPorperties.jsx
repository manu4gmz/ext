import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native'
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import Boton from './../ui/Button'
import FadeInView from "../components/FadeInView";
import Loading from "../components/Loading";
import { fetchProperties } from '../../redux/actions/user';
import SpaceReducedCard from "../components/SpaceReducedCard";
import Modal from "../components/Modal";
import Icon from "../ui/Icon";

const UserProperties = ({ propiedades, fetchProperties, user, navigation }) => {
  const [loading, setLoading] = useState(true)
  const { Modal: Info, call: callInfo, hide } = Modal(useState(null));


  useEffect(() => {
    fetchProperties(user.uid)
      .then(() => setLoading(false))
  }, [])

  const vh = Dimensions.get('window').height;


  if (!propiedades.length && !loading) return <Centered><Tit>Todavia no tenés propiedades!</Tit></Centered>

  if (loading) return <Loading />

  const verifiedSpaces = propiedades.filter(e => e.verified && e.enabled);
  const nonVerifiedSpaces = propiedades.filter(e => !e.verified && e.enabled);
  const pendingSpaces = propiedades.filter(e => !e.enabled );

  return (
    <View style={{height: "100%"}}>
      {
        nonVerifiedSpaces.length ?
        <VerifiedSuggestion height={vh-150} style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}>
          <Icon source={require("../../public/icons/verificado-ve.png")}></Icon>
          <Text>Verificá un espacio </Text>
        </VerifiedSuggestion>
        : null
      }
      <Info/>
      <ScrollView>
        {
          verifiedSpaces.length ? 
          <Wrapper>
            <Subtitle>Espacios Verificados</Subtitle>
              {verifiedSpaces.map((espacio, index) => (
                <SpaceReducedCard key={index} {...({espacio, navigation, index, callInfo, hide})} />
              ))}
          </Wrapper>
          : null
        }
        {
          nonVerifiedSpaces.length ? 
          <Wrapper>
            <Subtitle>Espacios No Verificados</Subtitle>
            <Description>Los espacios no verificados tienen una menor presencia en las búsquedas de los usuarios. Para verificar algún espacio contactanos por consultas@espacioportiempo.com </Description>
              {nonVerifiedSpaces.map((espacio, index) => (
                <SpaceReducedCard key={index} {...({espacio, navigation, index, callInfo, hide})} />
                ))}
          </Wrapper>
          : null
        }
        {
          pendingSpaces.length ? 
          <Wrapper>
            <Subtitle>Espacios Pendientes</Subtitle>
            <Description>Los siguientes espacios están esperando la aprobación del equipo de Espacio por Tiempo. Puede que alguno requiera de editar algunos datos para poder ser publicados</Description>

              {pendingSpaces.map((espacio, index) => (
                <SpaceReducedCard key={index} {...({espacio, navigation, index, callInfo, hide})} />
              ))}
          </Wrapper>
          : null
        }
      </ScrollView>
    </View>
  )
}


const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.logged,
    propiedades: state.user.properties
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProperties: (id) => dispatch(fetchProperties(id))
  }
}

const VerifiedSuggestion = styled.View`
  position: absolute;
  top: ${props => props.height}px;
  flex-direction: row;
  border-radius: 36px;
  z-index: 1;
  padding: 6px 12px;
  right: 13px;
  height: 45px;
  align-self: flex-end;
  align-items: center;
  background-color: #ffffff;
`

const Subtitle = styled.Text`
  font-size: 18px;
  font-weight: 500;
  margin: 24px 6px 12px;
`

const Description = styled.Text`
  font-size: 12px;
  margin-bottom: 12px;
  margin-left: 6px;
  color: #666;
`

const Wrapper = styled.View`
  margin: 0px auto;
  width: 100%;
  padding: 0 8px;
  max-width: 500px;
`


const Centered = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
`

const Tit = styled.Text`
  font-size: 20px;
  font-weight: 100;
  color: grey;
  margin-top: 80px;
`

export default connect(mapStateToProps, mapDispatchToProps)(UserProperties)