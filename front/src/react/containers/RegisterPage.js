import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/register'
import BackgroundRegister from '../components/backgroundRegister'

const RegisterPage = ({ registerUser, navigation }) => {
    const onSubmit = (e) => {
        const num = e['Nombre y Apellido'].value.indexOf(' ')
        const firstName = e['Nombre y Apellido'].value.slice(0, num)
        const lastName = e['Nombre y Apellido'].value.slice(num + 1)
        const email = e["Email"].value
        const password = e["contraseña"].value
        const favoritos = []
        const address = ''
        const phoneNumber = ''

        registerUser({
            firstName,
            lastName,
            email,
            password,
            favoritos,
            address,
            phoneNumber
        })
            .then((data) => {
                data.status === 201
                    ? navigation.navigate('Root', { screen: "Login" })
                    : null
            })
    }

    return (
        <BackgroundRegister
            onSubmit={onSubmit}
        />
    )
}

const mapDispatchToProps = (dispatch) => ({
    registerUser: (body) => dispatch(registerUser(body))
})

export default connect(null, mapDispatchToProps)(RegisterPage)