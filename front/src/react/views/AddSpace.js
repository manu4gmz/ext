import React, { Component } from 'react';
import { connect } from 'react-redux'

//Importando views and components
import AddSpaceForm from '../components/AddSpaceForm'

const AddSpace = ({ navigation }) => {
  return (
    <AddSpaceForm
      navigation={navigation}
    />
  )
}

export default connect(null, null)(AddSpace)
