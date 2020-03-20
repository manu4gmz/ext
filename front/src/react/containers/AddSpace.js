import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'

//Importando views and components
import AddSpaceForm from '../components/AddSpaceForm'

const AddSpace = ({ navigation }) => {
  const [ciudad, setCiudad] = useState('')
  const [barrio, setBarrio] = useState('')
  const [tipoEspacio, setTipoEspacio] = useState('')
  const [tamaño, setTamaño] = ''
  const [capacidad, setCapacidad] = ''
  const [caracteristicas, setCaracteristicas] = ''
  const [observaciones, setObservaiones] = ''
  const [hora, setHora] = ''
  const [limpieza, setLimpiza] = ''
  const [rules, setRules] = ''

  const handlerInput = setInput => (e) => { setInput(e) }
  const Onsubmit = function () { console.log("hola") }

  return (
    <AddSpaceForm
      ciudad={ciudad}
      barrio={barrio}
      tipoEspacio={tipoEspacio}
      tamaño={tamaño}
      capacidad={capacidad}
      caracteristicas={caracteristicas}
      observaciones={observaciones}
      hora={hora}
      limpieza={limpieza}
      rules={rules}

      navigation={navigation}
      handlerInput={handlerInput}
      Onsubmit={Onsubmit}
    />
  )
}

export default connect(null, null)(AddSpace)
