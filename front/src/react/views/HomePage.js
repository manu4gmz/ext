import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, } from 'react-native'
import BackgroundHome from '../components/backgroundHome'


const HomePage = () => {
  return (
    <BackgroundHome />
  )
}

const styles = StyleSheet.create({

})

export default connect(null, null)(HomePage)


