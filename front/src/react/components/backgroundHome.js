import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, } from 'react-native'
import fondo from '../../public/images/imagen_fondo1.jpg'
/* require('../../public/images/imagen_fondo1.jpg') */

const backgroundHome = () => {
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
  fondo: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
})

export default connect(null, null)(backgroundHome)





