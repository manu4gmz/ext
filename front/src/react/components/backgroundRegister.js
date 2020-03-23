import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput, Button, Navigator } from 'react-native'
import styled from "styled-components/native"

const backgroundRegister = ({ Username, Password, onChangePassword, onChangeUser, onSubmit }) => {

    const fields = ["nombre", "apellido", "email", "contraseña"].map((a, index) => useInput(a, index))

    return (
        <Fondo>
            <Formularios>
                {fields.map(a => a.input)}
            </Formularios>
            <BtnRegistrarse title="Registrarte" name="Registrarte" onPress={() => onSubmit(Object.fromEntries(fields.map(e => [e.name, e.value])))}>Registrarte</BtnRegistrarse>
        </Fondo >
    )
}

function useInput(name, index) {
    const [value, setValue] = useState("")
    return {
        name,
        value,
        input: (
            <View key={index} style={{ alignItems: "flex-start" }}>
                <TextoPrincipal>{name.toUpperCase()}</TextoPrincipal>
                <InputContainer>
                    <InputText
                        value={value}
                        onChangeText={setValue}
                    ></InputText >
                </InputContainer>
            </View >
        )
    }
}

const Fondo = styled.View`
background-color: '#ccc';
flex: 1;
position: absolute;
width: 100%;
height: 100%;
justify-content: left;

`
//Rodea todos los inputs
const Formularios = styled.View`
display: flex;
background-color: #FFFFFF;
width: 90%;
margin: 5%;
box-shadow: 5px 5px 10px grey;
borderRadius: 5px;

`
//Rodea tanto NOMBRE, APELLIDO, etc. como el input
const InputContainer = styled.View`
align-items: center;
display: flex;
flex-direction: row;
width: 100%;
`
//NOMBRE, APELLIDO, etc
const TextoPrincipal = styled.Text`
    color:#000144;
    font-weight: bold;
    margin: 10px;
    padding-left: 20px;
    margin-bottom: 1px;

`
//input
const InputText = styled.TextInput`
height: 30px;
width: 100%;

border-color: #C8C8C8;
border-width: 1px;
border-radius: 5px;

margin: 10px
margin-top: 1px;
padding-left: 20px;
display: flex";
color: #262626;
`


const BtnRegistrarse = styled.Text`
height: 40px;
width: 90%;
borderRadius: 5px;

background-color: #4180ED;
color: white;

paddingTop:10px;
margin:10px auto;
textAlign:center

`

export default connect(null, null)(backgroundRegister)
