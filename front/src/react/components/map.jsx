import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, Button, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout } from 'react-native-maps';
import { connect } from 'react-redux'

const Mapa = ({ allSpaces, navigation }) => {
    function sendId(id) {
        //fetchId(id)
        return navigation.navigate(`SingleView`, { propertyId: id })
    }
    return (
        <View>
            <MapView style={styles.mapAll}
                initialRegion={{
                    latitude: Number(allSpaces.properties[0].location[1].lat),
                    longitude: Number(allSpaces.properties[0].location[1].lon),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}>
                {allSpaces.properties.map((properties, index) => {
                    return (

                        <Marker
                            key={index}

                            coordinate={
                                {
                                    latitude: Number(properties.location[0].lat),
                                    longitude: Number(properties.location[0].lng),
                                }} >
                            <Image
                                style={{ width: 40, height: 50 }}
                                source={require("../../public/icons/icono_marker_az.png")}
                            />
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