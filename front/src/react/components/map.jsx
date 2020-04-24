import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import Carousel from "../components/Carousel";
import Button from "../ui/Button";
import { Animated, Easing } from "react-native";
import styled from 'styled-components/native';
import { fetchSpace } from "../../redux/actions/spaces";
        


const Mapa = ({ allSpaces, navigation, centroide, fetchSpace }) => {
    const [callout, setCallout] = useState(false);
    const [calloutSpace, setCalloutSpace] = useState({});
    const [markerRefs, setMarkerRefs] = useState([]);
    const [fadeAnim] = useState(new Animated.Value(0))
    
	useEffect(()=>{
		Animated.timing(fadeAnim,{
			toValue: +callout,
			duration: 300,
        }).start();
        //window.toggle = ()=> setCallout(p=>!p);
        //window.set = (i)=>  setCalloutSpace( allSpaces.properties[i] || allSpaces.properties[0] );
	},[callout])

    function sendId(id) {
        //fetchId(id)
        return navigation.navigate(`SingleView`, { propertyId: id })
    }

    function handleMapPress() {
        setCallout(false);
    }
    
    function handleMarkerPress(e,id) {
        setCallout(false);
        fetchSpace(id)
        .then(space=> {
            setCalloutSpace(space);
            setCallout(true);
        })
    }


    function sendId(id) {
        return navigation.navigate(`SingleView`, { propertyId: id })
    }
    //const [vw, vh] = [100, 120];
    const { width: vw, height: vh } = Dimensions.get("window");
    return (
        <View
        style={{ overflow:"hidden", height: vh - 102 }}>
            <MapView style={styles.mapAll}
                initialRegion={{
                    latitude: Number(centroide.lat) || -34.579304,
                    longitude: Number(centroide.lng || centroide.lon) || -58.471115,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}>
                {(allSpaces.markers || []).map((property, index) => {
                    return (
                        <MapView.Marker
                            key={index}
                            identifier={property.id}
                            onClick={(e)=>handleMarkerPress(e, property.id)}
                            onPress={(e)=>handleMarkerPress(e, property.id)}
                            coordinate={{
                                latitude: Number(property.lat),
                                longitude: Number(property.lng),
                            }}>

                            <Image
                                style={{ width: 40, height: 40 }}
                                source={require("../../public/icons/icono_marker_az.png")}
                            />
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
                <Callout width={vw}>
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
                            onPress={() => sendId(calloutSpace.id) }
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

const mapStateToProps = (state, props) => ({
    centroide: props.centroide || state.spaces.centroide
})

const mapDispatchToProps = (dispatch) => ({
    fetchSpace: (spaceId) => dispatch(fetchSpace(spaceId))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Mapa);

const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`

const CalloutTitle = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 700;
`
const CalloutWrapper = styled.View`
    padding: 10px 20px;
`

const Callout = styled.View`
    border-radius: 5px;
    position: absolute;
    height: 250px;
    background-color: white;
    width: ${p=>p.width- 20}px;
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
        width: "100%",
        margin: "auto",
        overflow: "hidden",
        height: "100%",
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