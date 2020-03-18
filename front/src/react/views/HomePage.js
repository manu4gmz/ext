import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, } from 'react-native'
import backgrounHome from '../components/backgroundHome'


const HomePage = () => {
  return (
    <Image
      style={styles.fondo}
      source={{ uri: fondo }}
      blurRadius={4}
      resizeMode='cover'
    />
  )
}

const styles = StyleSheet.create({

})

export default connect(null, null)(HomePage)





