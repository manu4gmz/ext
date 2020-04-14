import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundHome from '../components/backgroundHome'
import { getUserInfo } from '../../redux/actions/profile'
import { getUser } from "../../redux/actions/user";

const HomePage = ({ navigation, user, getUserInfo, userInfo, getUser }) => {
  useEffect(() => {
    if (user.uid) getUserInfo(user.uid)
  }, [user])

  useEffect(() => {
    getUser(() => navigation.navigate('Root', { screen: "Home" }));
  }, [])


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
  getUserInfo: id => dispatch(getUserInfo(id)),
  getUser: () => dispatch(getUser())
})


export default connect(mapStateToProps, mapDispatchToProps)(HomePage)


