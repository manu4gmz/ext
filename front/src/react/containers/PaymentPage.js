import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundPayment from '../components/backgroundPayment'


const PaymentPage = (props) => {
  return (
    <BackgroundPayment {...props} />
  )
}

export default connect(null, null)(PaymentPage)


