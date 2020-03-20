import React, { useEffect } from "react";
import { Button, Text, View, Image } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import { getUser } from "../../redux/actions/user";

const Navbar = (props) => {

  useEffect(()=>{
    props.getUser(props.navigation);
  },[])

  return (
    <Wrapper>
      <Icon source={require('../../public/images/isologotipo-only.png')}/>
      <Title>Hola {(props.user || {}).email}!</Title>
      <SidebarBtn source={require('../../public/images/sidebar.png')}/>
    </Wrapper>
  )
}

const Wrapper = styled.View`
  height: 70px;
  background-color: #4a94ea;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  padding: 5px 20px;
`

const Icon = styled.Image`
  height: 34px;
  width: 34px;
  margin-right: 10px;
  display: flex;
`

const Title = styled.Text`
  color: white;
  font-size: 15px;
  margin-top: 3px;
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
  getUser: ()=>dispatch(getUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);