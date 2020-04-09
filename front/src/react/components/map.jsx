import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import Carousel from "../components/Carousel";
import Button from "../ui/Button";
import { Animated, Easing } from "react-native";
import styled from 'styled-components/native';

const Mapa = ({ allSpaces, navigation, centroide }) => {
    const [callout, setCallout] = useState(false);
    const [calloutSpace, setCalloutSpace] = useState({});
    const mapRef = useRef(null);

    const [fadeAnim] = useState(new Animated.Value(0))

	useEffect(()=>{
		Animated.timing(fadeAnim,{
			toValue: +callout,
			duration: 300,
        }).start();
        window.toggle = ()=> setCallout(p=>!p);
        window.set = (i)=>  setCalloutSpace( allSpaces.properties[i] || allSpaces.properties[0] );
        
       
	},[callout])

    function sendId(id) {
        //fetchId(id)
        return navigation.navigate(`SingleView`, { propertyId: id })
    }
    
    function handleMapPress() {
        console.log(centroide);
        setCallout(false);
        console.log(callout);
    }
    
    function handleMarkerPress(e,space) {
        e.stopPropagation()
        setCallout(true);
        setCalloutSpace(space)
        console.log(callout);

    }

    function sendId(id) {
        //fetchId(id)
        return navigation.navigate(`SingleView`, { propertyId: id })
      }
    return (
        <View>
            <MapView style={styles.mapAll}
                initialRegion={{
                    latitude: centroide.lat || -34.579304,
                    longitude: centroide.lon || -58.471115,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {allSpaces.properties.filter(p => p.location && p.location[0] && p.location[0].lat).map((property, index) => {
                    console.log(property.location[0].lat, property.location[0].lng)
                    return (

                        <MapView.Marker
                            key={index}
                            
                            onPress={(e)=>handleMarkerPress(e, property)}
                            coordinate={
                                {
                                    latitude: Number(property.location[0].lat),
                                    longitude: Number(property.location[0].lng),
                                }} >
                            <Image
                                style={{ width: 34, height: 42 }}
                                source={require("../../public/icons/icono_marker_az.png")}
                            />
                            {/*
                            <Callout  >
                                <View style={styles.customCallOut}>

                                    <Text style={styles.textoCallOut}>{property.title}</Text>
                                    <Text style={{
                                        padding: 2, color: "#FFF"
                                    }}>{property.description}</Text>
                                </View>

                            </Callout>*/}


                        </MapView.Marker>

                    )
                })
                }

            </MapView>
            <Animated.View style={{
                opacity: fadeAnim, // Binds directly
                transform: [{
                translateY: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, -250]  // 0 : 150, 0.5 : 75, 1 : 0
                    }),
                }],
                height: 300,
                width:"100%"
		    }}>
                <Callout>
                    <View style={{
                        width: '100%',
                        height: (calloutSpace.photos || []).length ? 100 : 60,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        overflow: "hidden"
                    }} >
                        <Carousel images={calloutSpace.photos || []} height={100} />
                    </View>
                    <CalloutWrapper>

                    <CalloutTitle>{calloutSpace.title}</CalloutTitle>
                    <Text>{calloutSpace.size}mtr2 - {calloutSpace.type}</Text>
                    <DoubleWraper>
                          <Button
                            onPress={() => sendId(espacio.id) }
                            bg="#4A94EA"
                            color="#F7F7F7"
                            mr="5px"
                            >Mas Info.
                          </Button>

                          <Button
                            bg="#F77171"
                            color="#F7F7F7"
                            ml="5px"
                            >Contacto.
                            </Button>

                        </DoubleWraper>
                    </CalloutWrapper>
                </Callout>
            </Animated.View>
        </View>
    )

}
const CalloutTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 700;
`
const CalloutWrapper = styled.View`
    padding: 10px 20px;
`

const mapStateToProps = (state) => ({
    centroide: state.spaces.centroide
})

export default connect(mapStateToProps, null)(Mapa);

const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`


const Callout = styled.View`
    border-radius: 5px;
    position: absolute;
    flex: 1;
    margin: auto;
    height: 250px;
    background-color: white;
    margin: 0 10px;
`

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