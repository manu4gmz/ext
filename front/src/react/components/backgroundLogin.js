import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Image, TextInput, Button, ImageBackground } from 'react-native'
import fondo from '../../public/images/imagen_fondo_mobile_az.jpg'
/* require('../../public/images/imagen_fondo1.jpg') */

const backgroundLogin = () => {
    return (
        <ImageBackground
            style={styles.fondo}
            source={{ uri: fondo }}
            resizeMode='cover'
        >
            <View style={{ padding: 10 }}>


                <TextInput
                    style={styles.inputText}
                    placeholder="Ingrese su email"
                    name="setUsername"
                />
                <TextInput
                    style={{ height: 30, width: 150, borderBottomColor: "black", borderBottomWidth: 1, margin: 10 }}
                    placeholder="Ingrese su password"
                />
                <Text>¿Olvido su contraseña?</Text>
                <Button title=" Inquilino" />
            </View>


        </ImageBackground>
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
        color: "#F7F7F7",
        height: 30,
        width: 150,
        borderColor: "white",
        borderWidth: 1,
        margin: 10
    }
})

export default connect(null, null)(backgroundLogin)





