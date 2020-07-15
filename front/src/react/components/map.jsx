import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import Carousel from "../components/Carousel";
import Button from "../ui/Button";
import { Animated, Easing } from "react-native";
import styled from 'styled-components/native';
import { fetchSpace } from "../../redux/actions/spaces";
import * as Location from 'expo-location';
import Loading from "../components/Loading";

import {ColumnsWrapper, Column, SuggestedTitle} from "./SpacesMosaic/column";
import cardList from "./SpacesMosaic/cardList";

const Mapa = ({ allSpaces, navigation, centroide, fetchSpace, setMode }) => {
  const [callout, setCallout] = useState(false);
  const [calloutSpace, setCalloutSpace] = useState({});
  const mapRef = useRef(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [enabledLocation, setEnabledLocation ] = useState(null);
  const [location, setLocation ] = useState(null);
  
  useEffect(()=>{
    Animated.timing(fadeAnim,{
      toValue: +!!callout,
      duration: 300,
      useNativeDriver: true,
    }).start();
    //window.toggle = ()=> setCallout(p=>!p);
    //window.set = (i)=>  setCalloutSpace( allSpaces.properties[i] || allSpaces.properties[0] );
  },[callout])
  
  useEffect(()=>{
    Location.hasServicesEnabledAsync()
    .then((enabled)=>{

      if (enabled) return Location.requestPermissionsAsync();
      else return { status: "unabled" };
    })
    .then(({status}) => {
      if (status !== 'granted') setEnabledLocation(false);
      else {
        setEnabledLocation(true);
        Location.getCurrentPositionAsync({})
        .then(location => {
          setLocation(location.coords);
        })
      }
    });
  }, []);

  function sendId(id) {
    //fetchId(id)
    return navigation.navigate(`SingleView`, { propertyId: id })
  }

  window.moveTo = (xOffset, yOffset) => moveTo(calloutSpace.location[0].lat+yOffset,callout.location[0].lng+xOffset)

  function moveTo(latitude, longitude) {
      mapRef.current.animateToRegion({
      latitude,
      longitude,
    });
  }

  function handleMapPress() {
    setCallout(false);
  }
  
  function handleMarkerPress(space) {
    console.log(space);
    if (space.lat) moveTo(space.lat, space.lng || space.lon);
    
    setCalloutSpace({});
    
    fetchSpace(space.id)
    .then(space => {
      console.log(space);
      moveTo(Number(space.location[0].lat), Number(space.location[0].lng));
      setCalloutSpace(space);
      if (callout == false) setCallout(space);
    })
  }

  function sendId(id) {
    return navigation.navigate(`SingleView`, { propertyId: id })
  }
  //const [vw, vh] = [100, 120];
  const { width: vw, height: vh } = Dimensions.get("window");

  if (enabledLocation == null || (enabledLocation && !location)) return <Loading />;
  return (
    <View
    style={{ overflow:"hidden", height: vh - 102, zIndex: -1 }}>
      <MapView 
        style={styles.mapAll}
        ref={mapRef}
        initialRegion={{
          latitude: centroide ? Number(centroide.lat) : (location.latitude || -34.579304),
          longitude: centroide ? Number(centroide.lng || centroide.lon) : (location.longitude || -58.471115),
          latitudeDelta: centroide ? centroide.latitudeDelta : 0.0922,
          longitudeDelta: centroide ? centroide.longitudeDelta : 0.0421,
        }}
        onPress={handleMapPress}>
        {(allSpaces.markers || []).map((property, index) => {
          return (
            <MapView.Marker
              key={index}
              identifier={property.id}
              onClick={()=>handleMarkerPress(property)}
              onPress={()=>handleMarkerPress(property)}
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
            outputRange: [270, 0]  // 0 : 150, 0.5 : 75, 1 : 0
          }),
        }],
        backgroundColor: 'red',
        width:"100%"
	  }}>
        <Callout>
          <ScrollView horizontal style={{width: vw - 24}}>
            <CardRow>
              {
                callout && callout.id ? 
                  cardList([callout], (space) => navigation.push("SingleView", {propertyId: space.id}))
                  : <Card>
                    <Loading />  
                  </Card>
              }
              {
                cardList(
                  allSpaces.properties
                    .filter(s => !callout || s.id != callout.id), 
                  (space) => navigation.push("SingleView", {propertyId: space.id})
                )
              }
              <Card>
                <TouchableOpacity onPress={() => setMode(false)}>
                  <LoadMore>Ver más</LoadMore>
                </TouchableOpacity>
              </Card>
            </CardRow>
          </ScrollView>
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

const Card = styled.View`
  height: 240px;
  width: 160px;
  flex-direction: row;
  align-items: center;
`;

const CalloutWrapper = styled.View`
  padding: 10px 20px;
`

const Callout = styled.View`
`

const LoadMore = styled.Text`
  border-radius: 50px;
  font-size: 16px;
  padding: 6px 12px;
  margin-left: 24px;
  color: white;
  background-color: #4a94ea;
`

const WideButton = styled.Text`
  flex: 1;
  color: white;
  background-color: #4a94ea;
  text-align: center;
  margin: 6px 12px;
  box-sizing: border-box;
  padding: 18px;
  line-height: 0px;
  height: 50px;
  border-radius: 5px;
`

const CardRow = styled(ColumnsWrapper)`
  width: 100%;
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
    flex: 1,
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
