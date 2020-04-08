import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Button, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux'

const Mapa = ({ allSpaces, navigation }) => {
    console.log(navigation, "ACA ESTA EL NAVIGATION")
    function sendId(id) {
        //fetchId(id)
        return navigation.navigate(`SingleView`, { propertyId: id })
    }
    return (
        <View>
            <MapView style={styles.mapAll}
                initialRegion={{
                    latitude: -34.574983,
                    longitude: -58.428226,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                {allSpaces.properties.map((properties, index) => {
                    return (

                        <Marker
                            key={index}

                            coordinate={
                                {
                                    latitude: Number(properties.location[1].lat),
                                    longitude: Number(properties.location[1].lon),
                                }} >
                            <Callout  >
                                <View style={styles.customCallOut}>

                                    <Text style={styles.textoCallOut}>{properties.title}</Text>
                                    <Text style={{
                                        padding: 2, color: "#FFF"
                                    }}>{properties.description}</Text>
                                </View>

                            </Callout>


                        </Marker>

                    )
                }
                )}

            </MapView>

        </View>
    )

}






const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    boton: {
        height: 20,
        width: 20
    },
    mapAll: {
        marginTop: 2,
        maxWidth: 500,
        height: 600
    },
    callOutContainer: {
        height: 150,
        width: "100%",



    },
    imagen: {
        height: "100%",
        width: "100%"

    },
    roundMarker: {

        height: 30,
        width: 30,

    },
    roundImage: {
        height: 30,
        width: 30,

    },
    customCallOut: {
        width: 250,
        backgroundColor: "#F77171",



    },
    textoCallOut: {
        padding: 2,
        textAlign: "center",
        color: "#FFF"


    }
})
export default connect(null, null)(Mapa);

/*
<View style={styles.callOutContainer} >
                                        <Image
                                            style={styles.imagen}
                                            source={{
                                                uri: 'https://reactnative.dev/img/tiny_logo.png',
                                            }}
                                        />
                                    </View>
                                    */