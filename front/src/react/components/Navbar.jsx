import React, { useEffect } from "react";
import { Button, Text, View, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import Icon from "../ui/Icon";
import { useNavigation } from "@react-navigation/native"

const Navbar = ({ title, userInfo, backRoute }) => {
  const navigation = useNavigation();
  return (
    <Background>
      <Wrapper>
        {
          title ? <Back 
            source={require('../../public/icons/back.png')} 
            onPress={backRoute? () => navigation.navigate(backRoute) : () => navigation.pop()}
          /> :
          <Icon 
            onPress={() => navigation.toggleDrawer()} 
            source={require('../../public/icons/sidebar.png')} 
          />
        }
        <Title>{title || `Hola ${((userInfo.firstName || ', Bienvenido!')) || ""}!`}</Title>
        <Icon source={require('../../public/images/isologotipo-only.png')} />
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
const Back = styled(Icon)`
  height: 20px;
  width: 20px;
  margin-top: 3px;
`

const mapStateToProps = (state) => ({
  user: state.user.logged,
  userInfo: state.profile.userInfo
})

export default connect(mapStateToProps, null)(Navbar);