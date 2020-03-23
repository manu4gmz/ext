import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, } from 'react-native'
import BackgroundRegister from '../components/backgroundRegister'


const RegisterPage = () => {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const onChangeUser = (e) => { setUsername(e) }
    const onChangePassword = (e) => { setPassword(e) }
    const onSubmit = (e) => { console.log(e) }

    return (
        <BackgroundRegister
            // Username={Username}
            // Password={Password}
            // onChangePassword={onChangePassword}
            // onChangeUser={onChangeUser}
            onSubmit={onSubmit}
        >

        </BackgroundRegister>
    )
}

const styles = StyleSheet.create({

})

export default connect(null, null)(RegisterPage)





