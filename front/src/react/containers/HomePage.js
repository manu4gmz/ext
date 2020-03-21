import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundHome from '../components/backgroundHome'
import { View } from "react-native";

const HomePage = ({ navigation, user }) => {
  return (
  	<BackgroundHome user={user}/>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.logged
  }
}


export default connect(mapStateToProps, null)(HomePage)


