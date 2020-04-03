import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundHome from '../components/backgroundHome'
import { getUserInfo } from '../../redux/actions/profile'

const HomePage = ({ navigation, user, getUserInfo, userInfo }) => {
  useEffect(() => {
    getUserInfo(user.uid)
  }, [user])

  return (
    <BackgroundHome
      user={user}
      navigation={navigation}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user.logged,
    userInfo: state.profile.userInfo
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserInfo: id => dispatch(getUserInfo(id))
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)


