import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput, Button, Navigator } from 'react-native'
import styled from "styled-components/native"

const backgroundRegister = ({ Username, Password, onChangePassword, onChangeUser, onSubmit }) => {

    const fields = ["nombre", "apellido", "email", "contraseña"].map((a, index) => useInput(a, index))

    return (
        <View style={{ padding: 0, alignItems: "center" }}>
            {fields.map(a => a.input)}
            <BotonIngresar title="Registrarte" name="Registrarte" onPress={() => onSubmit(Object.fromEntries(fields.map(e => [e.name, e.value])))}>Registrarte</BotonIngresar>
        </View >
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
                <View style={styles.inputContainer} >
                    <TextInput
                        style={styles.inputText}
                        value={value}
                        onChangeText={setValue}
                    ></TextInput >
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    fondo: {
        backgroundColor: '#ccc',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'left',
    },
    inputText: {
        height: 40,
        width: "100%",
        borderColor: "#C8C8C8",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 40,
        margin: 10,
        display: "flex",
        color: "black"
    },
    imagenInputs: {
        height: 20,
        width: 20,
        position: "absolute",
        left: 20,
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


const TextoPrincipal = styled.Text`
    color:#000144;
`



const RememberPassword = styled.Text`
    color:#E9E9E9;
    margin: 0 auto;
    fontSize:15px;

 fontFamily: "Georgia, serif"

`

const BotonIngresar = styled.Text`
color: #262626;
height: 40px;
width: 250px;
borderColor:#262626
;
borderWidth: 1px;
borderRadius: 10px;
paddingTop:10px;
margin:10px auto;
textAlign:center
`

export default connect(null, null)(backgroundRegister)





/*

<View style={styles.inputText}>
                    <Image source={require("../../public/images/sobre-bl.png")}
                        style={{ height: 20, width: 20, padding: 10 }} />
                    <TextInput style={{ padding: 10, color: "white" }}
                    ></TextInput >

                </View>
*/