import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BackgroundPayment from '../components/backgroundPayment'


const PaymentPage = () => {
  return (
    <BackgroundPayment />
  )
}

export default connect(null, null)(PaymentPage)


