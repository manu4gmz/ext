import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundHome from '../components/backgroundHome'


const HomePage = () => {
  return (
    <BackgroundHome />
  )
}

export default connect(null, null)(HomePage)


