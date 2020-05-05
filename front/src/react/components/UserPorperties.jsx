import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native'
import styled from "styled-components/native";
import Carousel from "../components/Carousel";
import Boton from './../ui/Button'
import FadeInView from "../components/FadeInView";
import Loading from "../components/Loading";
import { fetchProperties } from '../../redux/actions/user';
import SpaceReducedCard from "../components/SpaceReducedCard";
import Modal from "../components/Modal";

const UserProperties = ({ propiedades, fetchProperties, user, navigation }) => {
  const [loading, setLoading] = useState(true)
  const { Modal: Info, call: callInfo, hide } = Modal(useState(null));


  useEffect(() => {
    fetchProperties(user.uid)
      .then(() => setLoading(false))
  }, [])


  if (!propiedades.length && !loading) return <Centered><Tit>Todavia no tenés propiedades!</Tit></Centered>

  if (loading) return <Loading />

  return (
    <View style={{height: "100%"}}>
      <Info/>
      <ScrollView>
        <Wrapper>
          {propiedades.map((espacio, index) => (
            <SpaceReducedCard key={index} {...({espacio, navigation, index, callInfo, hide})} />
            ))}
        </Wrapper>
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

const StyledView = styled.View`
  margin: 10px 5px;
  background-color: #F7F7F7;
  padding : 0;
  border-radius: 10px;
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