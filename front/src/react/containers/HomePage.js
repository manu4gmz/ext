import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundHome from '../components/backgroundHome'
import { View } from "react-native";

const HomePage = ({ navigation, user, usuario }) => {
  console.log('esto llega como props', usuario);

  return (
    <BackgroundHome user={user} navigation={navigation} />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.logged
  }
}


export default connect(mapStateToProps, null)(HomePage)


