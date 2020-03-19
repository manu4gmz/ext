import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, } from 'react-native'
import BackgroundLogin from '../components/backgroundLogin'


const LoginPage = () => {
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const onChangeUser = (e) => { setUsername(e) }
    const onChangePassword = (e) => { setPassword(e) }
    const Onsubmit = function () { console.log("hola") }
    return (
        <BackgroundLogin
            Username={Username}
            Password={Password}
            onChangePassword={onChangePassword}
            onChangeUser={onChangeUser}
            Onsubmit={Onsubmit}>

        </BackgroundLogin>
    )
}

const styles = StyleSheet.create({

})

export default connect(null, null)(LoginPage)





