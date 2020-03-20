import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundHome from '../components/backgroundHome'


const HomePage = ({ navigation, user }) => {
  return (
    <BackgroundHome
      navigation={navigation}
      user={user}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.logged
  }
}


export default connect(mapStateToProps, null)(HomePage)


