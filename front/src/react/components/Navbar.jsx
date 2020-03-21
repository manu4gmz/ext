import React, { useEffect } from "react";
import { Button, Text, View, Image, TouchableOpacity  } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import Icon from "../ui/Icon";

const Navbar = (props) => {
  return (
    <Background>

      <Wrapper>
        <Icon source={require('../../public/images/isologotipo-only.png')}/>
        <Title>{props.title || `Hola ${((props.user || {}).email)||""}!`}</Title>
        {
          props.title ? <Icon source={require('../../public/icons/back.png')} onPress={()=>props.navigation.pop()}/> : null
        }
        <SidebarBtn source={require('../../public/icons/sidebar.png')}/>
      </Wrapper>
    </Background>
  )
}
const Background = styled.View`
  background-color: #4082d1;
`
const Wrapper = styled.View`
  height: 70px;
  background-color: #4a94ea;
  flex-direction: row;
  align-items: center;
  padding: 5px 20px;
  margin-top: 20px;
`

const Title = styled.Text`
  color: white;
  font-size: 15px;
  margin-top: 3px;
  margin-left: 8px;
  font-weight: 100;
  flex:1;
`

const SidebarBtn = styled.Image`
  height: 30px;
  width: 30px;
  margin-top: 3px;
`

const mapStateToProps = (state) => ({
  user: state.user.logged
})

const mapDispatchToProps = (dispatch) => ({
  
})

export default connect(mapStateToProps, null)(Navbar);