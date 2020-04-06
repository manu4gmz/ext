import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

export default ({ allSpaces }) => {

    return (
        <MapView style={styles.mapStyle}
            initialRegion={{
                latitude: allSpaces[0].location[0].lat,
                longitude: allSpaces[0].location[0].lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >

            {allSpaces.map((lugar, index) => {
                return (
                    <Marker
                        key={index}
                        title={lugar.title}
                        description={lugar.description}
                        coordinate={
                            {
                                latitude: lugar.location[1].lat,
                                longitude: lugar.location[1].lon,
                            }}
                    />
                )
            })}
        </MapView>

    )

}






const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: 500,
        height: 500
    },
})


