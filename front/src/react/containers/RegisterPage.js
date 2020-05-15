import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { registerUser } from '../../redux/actions/register'
//import BackgroundRegister from '../components/backgroundRegister'
import GenericForm from "../components/GenericForm";

function validateEmail(email) {
    console.log(email)
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? null : "Este mail no es valido";
}

const RegisterPage = ({ registerUser, navigation }) => {

    const fields = [
        {
            name:"email",
            placeholder: "tu@mail.com",
            title: "Email*",
            validation: validateEmail
        },
        {
            name: "firstName", title: "Nombre", placeholder: ""
        },
        {
            name: "lastName", title: "Apellido", placeholder: ""
        },
        {
            name:"password",
            placeholder: "******",
            title: "Contraseña*",
        },
    ]



    const onSubmit = (form) => {
        /*const num = e['Nombre y Apellido'].value.indexOf(' ')
        const firstName = e['Nombre y Apellido'].value.slice(0, num)
        const lastName = e['Nombre y Apellido'].value.slice(num + 1)
        const email = e["Email"].value
        const password = e["Contraseña"].value
        const favoritos = []
        const address = ''
        const phoneNumber = ''*/

        registerUser({
            ...form,
            favoritos: [],
            address: "",
            phoneNumber: ""
        })
            .then((data) => {
                data.status === 201
                    ? navigation.navigate('Root', { screen: "Login" })
                    : null
            })
    }

    return (
        <GenericForm fields={fields} onSubmit={onSubmit} sendText={"Crear cuenta"} header="Pon tus datos"/>
    )
}

const mapDispatchToProps = (dispatch) => ({
    registerUser: (body) => dispatch(registerUser(body))
})

export default connect(null, mapDispatchToProps)(RegisterPage)