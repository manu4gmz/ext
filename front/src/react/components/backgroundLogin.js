import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, ImageBackground } from 'react-native'
import styled from "styled-components/native"

export default ({ Username, Password, onChangePassword, onChangeUser, Onsubmit, error, OnsubmitGoogle }) => {
    return (
        <ImageBackground
            style={styles.fondo}
            source={require('../../public/images/imagen_fondo_mobile_az.jpg')}
            resizeMode='cover'
        >
            <View style={{ padding: 10, alignItems: "center" }}>
                <Image source={require('../../public/images/isologotipo-az.png')} style={styles.logoTipoExt} />
                <TextoPrincipal>¿Donde nos juntamos?</TextoPrincipal>
                <View style={styles.inputContainer} >
                    <Image source={require("../../public/images/sobre-bl.png")} style={styles.imagenInputs} />
                    <TextInput
                        style={error.target == "email" ? styles.inputError : styles.inputText}
                        value={Username}
                        onChangeText={onChangeUser}
                    ></TextInput >
                </View>
                {error.target == "email" ? <Error>{error.msg}</Error> : null}
                <View style={styles.inputContainer} >
                    <Image source={require("../../public/images/candado-bl.png")} style={styles.imagenInputs} />
                    <TextInput
                        style={error.target == "pass" ? styles.inputError : styles.inputText}
                        secureTextEntry={true}
                        value={Password}
                        onChangeText={onChangePassword}
                    ></TextInput >
                </View>
                {error.target == "pass" ? <Error>{error.msg}</Error> : null}
                {error.target == "all" ? <Error>{error.msg}</Error> : null}
                <RememberPassword>¿Olvido su contraseña? </RememberPassword>
                <BotonIngresar title=" Inquilino" onPress={Onsubmit}>Ingresar</BotonIngresar>
                <BotonGoogle title=" Inquilino" onPress={OnsubmitGoogle}>Ingresar con google</BotonGoogle>
            </View>

        </ImageBackground >
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
    },

    inputText: {
        height: 40,
        width: 250,
        borderColor: "#D9D5C8",
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 40,
        margin: 10,
        display: "flex",
        color: "#F7F7F7"
    },


    inputError: {
        height: 40,
        width: 250,
        borderColor: "tomato",
        borderWidth: 1,
        borderRadius: 30,
        paddingLeft: 40,
        margin: 10,
        display: "flex",
        color: "#F7F7F7",
    },

    imagenInputs2: {
        height: 30,
        width: 30,
        position: "absolute",

    },

    inputContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    },

    logoTipoExt: {
        height: 85,
        width: 200,
        paddingBottom: 50
    }
})

const Error = styled.Text`
    font-size: 15px;
    color: tomato;
`

const TextoPrincipal = styled.Text`
    color:#E9E9E9;
    margin: 0 auto;
    paddingBottom:200px;
    paddingTop:30px
    fontSize:25px
`

const RememberPassword = styled.Text`
    color:#E9E9E9;
    margin: 0 auto;
    fontSize:15px;
`

const BotonIngresar = styled.Text`
color: #262626;
height: 40px;
width: 250px;
border-color:#262626;
border-width: 1px;
border-radius: 30px;
padding-top:10px;
margin:10px auto;
text-align:center
`
const BotonGoogle = styled.Text`
background-color : white;
color: #262626;
height: 40px;
width: 250px;
border-color:#E9E9E9;
border-width: 1px;
border-radius: 30px;
padding-top:10px;
margin:10px auto;
text-align:center
`
