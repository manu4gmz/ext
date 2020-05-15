import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Animated, Dimensions, ScrollView, Linking, TouchableOpacity } from 'react-native'
import styled from "styled-components/native";
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import Boton from './../ui/Button'
import Icon from './../ui/Icon'
import qs from 'qs'
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import MapView from 'react-native-maps';
import Map from "../components/map";
import Collapsable from "../components/Collapsable";

const icons = {
    "Aire Acondicionado":require("../../public/icons/services/airconditioner.png"),
    "Wifi":require("../../public/icons/services/wifi.png"),
    "LCD":require("../../public/icons/services/lcd.png"),
    "Cafe/Infusiones":require("../../public/icons/services/coffee.png"),
    "Snacks":require("../../public/icons/services/snacks.png"),
    "Música":require("../../public/icons/services/music.png"),
    "Vajilla":require("../../public/icons/services/dishes.png"),
    "Baño":require("../../public/icons/services/toiletes.png"),
    "Ducha":require("../../public/icons/services/ducha.png"),
}

export default ({ space, loading, allSpaces, navigation, propietario, edit, logged, handleEdit, children, preview }) => {
  const [mode, setMode] = useState(false)
  const [services, setServices ] = useState(false);

  const spaceUbication = <Text>{space.street} {space.streetNumber}</Text>

  if (loading) return <Loading />

  async function sendEmail(to, subject, body, options = {}) {
    const { cc, bcc } = options;
    let url = `mailto:${to}`;
    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    const canOpen = await Linking.canOpenURL(url);
    if (!canOpen) throw new Error('Provided URL can not be handled');

    return Linking.openURL(url);
  }

  return (
    <ScrollView>
        {
          !preview ?
            <View style={{ backgroundColor: "#4A94EA", flexDirection: "row" }}>
              <Lista active={(!mode) + ""} onPress={() => (setMode(false))}>Lista</Lista>
              <Lista active={(mode) + ""} onPress={() => (setMode(true))}>Mapa</Lista>
            </View>
          : null
        }
        
          {!mode ? (
             <Wrapper>
             <StyledView style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}>
             <View style={{
                width: '100%',
                height: (space.photos || []).length ? 250 : "auto",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                overflow: "hidden"
              }} >
                <Carousel images={space.photos || []} />
              </View>
              <Container>
                <Titulo>{space.title}</Titulo>
                  {space.province === 'ciudad autónoma de buenos aires'
                    ? <Subtitulo>{space.neighborhood} - Capital Federal - {space.size} m<Exponent>2</Exponent></Subtitulo>
                    : <Subtitulo>{space.neighborhood} - {space.province} - {space.size} m<Exponent>2</Exponent></Subtitulo>
                  }
                  <View style={{ flexDirection: "row" }}>
                    <Precio>{`$${space.price}`}</Precio>
                    <Text style={{ alignSelf: 'center' }}>por hora</Text>
                  </View>
                  <Divider />
                  <TextoComun>{space.description}</TextoComun>
                  <TouchableOpacity onPress={() => navigation.navigate(`Comments`, { propertyId: space.id }) }>
                    <Text
                      style={{ color: "grey", fontWeight: "bold", paddingLeft: 0, paddingTop: 10, paddingBottom: 10 }}
                    >({(space.comments || "").length || 0}) Ver comentarios</Text>
                  </TouchableOpacity>
                  {
                    (space.services || []).length ?
                    <Collapsable title="Servicios" min={90} max={Math.ceil((space.services || []).length/4)*90}>
                      <ServicesWrapper>
                          {
                            (space.services || []).map((service, i) => (
                              <Service key={i}>
                                <ServiceImage source={icons[service]} />
                                <ServiceLabel>{service}</ServiceLabel>
                              </Service>
                            ))
                          }
                      </ServicesWrapper>
                    </Collapsable>
                    : null
                  }
                  <Collapsable title="Observaciones" content={space.observations}/>
                  <Collapsable title="Reglas" content={space.rules}/>

                  {
                    space.location && space.location[0] ? 
                    <View>
                      <TextoCaracteristicas>Ubicacion</TextoCaracteristicas>
                      <Location>
                        <Image style={{width:25, height: 25}} source={require("../../public/icons/location.png")}/>
                        <LocationText>{space.street} {space.streetNumber}, <Capitalize>{space.neighborhood}</Capitalize>, <Capitalize>{space.province === 'ciudad autónoma de buenos aires'
                    ? "capital federal" : space.province}</Capitalize></LocationText>
                      </Location>
                      <MapView style={styles.mapStyle}
                          initialRegion={{
                            latitude: Number(space.location[0].lat),
                              longitude: Number(space.location[0].lng),
                              latitudeDelta: 0.0922,
                              longitudeDelta: 0.0421,
                          }}>
                          <MapView.Marker
                            coordinate={{
                              latitude: Number(space.location[0].lat),
                              longitude: Number(space.location[0].lng),
                            }}
                          >
                              <Image
                                  style={{ width: 40, height: 50 }}
                                  source={require("../../public/icons/icono_marker_az.png")}
                              />
                          </MapView.Marker>
                      </MapView>
                    </View>
                    : null
                  }
                  { 
                    !preview ?
                    
                    ( logged.uid && (propietario.id || propietario.uid) ?
                    <DoubleWraper>
                      {(propietario.contact || {}).email ? <Boton
                        onPress={() =>
                          sendEmail(
                            `${propietario.email}`,
                            `Consulta publicación ${space.title} en Espacio por Tiempo`,
                            `Hola ${propietario.firstName}, \n\n vi tu publicación en Espacio por Tiempo "${space.title}", estoy interesado en alquirla.\n\n Saludos, ${logged.firstName}`)
                            .then(() => {
                              console.log('Our email successful');
                            })
                            .catch(err => console.error(err))
                        }
                        bg="#4A94EA"
                        color="#F7F7F7"
                        mr="5px"
                      >Email
                      </Boton> : null}
                    {(propietario.contact || {}).tel ? <Boton
                      onPress={() => Linking.openURL(`tel:${propietario.phoneNumber}`)}
                      bg="#F77171"
                      color="#F7F7F7"
                      ml="5px"
                      >Llamar
                    </Boton> : null}
                    {(propietario.contact || {}).wpp ? <Boton
                      onPress={() => Linking.openURL(`https://wa.me/${propietario.phoneNumber}?text=Hola ${propietario.firstName}, vi tu publicación en Espacio por Tiempo "${space.title}", estoy interesado en alquirla.\n Saludos, ${logged.firstName}`)}
                      color="#F7F7F7"
                      bg="#25d366"
                      ml="5px"
                    >Whatsapp
                    </Boton> : null }
                  </DoubleWraper>
                  
                    : 
                    <DoubleWraper>
                       <Boton
                        onPress={() => navigation.navigate("Login", {then: "SingleView", params: {propertyId: space.id }})}
                        bg="#4A94EA"
                        color="#F7F7F7"
                        mr="5px"
                      >Iniciá sesión para contactar
                      </Boton>
                    </DoubleWraper>
                  )
                  : null
                  }
                  {
                    preview ? children : null
                  }
                </Container>
              </StyledView>
            </Wrapper>
          ) 
          : 
          <Map navigation={navigation} allSpaces={allSpaces} centroide={space.location && space.location[0]}></Map>
          
          }
        
    </ScrollView>
  )
}
const Lista = styled.Text`
  align-self: center;
  font-size: 18px;
  justify-content:center;
  text-align:center;
  padding-bottom: 5px;
  color: ${props => (props.active == "true" ? "white" : "#000144")};
  border-color:${(props) => props.active == "true" ? "white" : "#4A94EA"};
  border-bottom-width:3px;
  width:50%;
`
const StyledView = styled.View`
  margin: 10px 5px;
  background-color: #F7F7F7;
  padding : 0;
  border-radius: 10px;
`
const Wrapper = styled.View`
  flex: 1;
  margin: 0px auto;
  width: 100%;
  padding: 0 8px;
  max-width: 500px;
`
const Titulo = styled.Text`
font-size: 17px;
text-transform: capitalize;
margin: 3px 3px 0px 3px;
`
const Subtitulo = styled.Text`
font-size: 15px;
font-weight: 100;
color: grey;
margin: 0 3px 0 3px;
`
const Precio = styled.Text`
  font-size: 20px;
  margin: 3px;
`
const Divider = styled.View`
  height: 1px;
  background-color: #b2b2b2;
  margin: 10px 0px;

`



const TextoComun = styled.Text`
font-size: 13px;
font-weight: 600;
margin-bottom: 10px;
`

const TextoCaracteristicas = styled.Text`
    font-size: 17px;
  margin: 10px 0px;
`

const ServicesWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
    overflow: hidden;
`

const Service = styled.View`
    margin: 0 10px 5px;
    height: 90px;
`

const ServiceImage = styled.Image`
    height: 50px;
    width: 50px;
    margin-bottom: 3px;
`

const ServiceLabel = styled.Text`
    width: 50px;
    font-size: 12px;
    line-height: 12px;
    text-transform: capitalize;
    color: #333;
    text-align: center;
`

const Capitalize = styled.Text`
    text-transform: capitalize;
`

const Container = styled.View`
  margin: 10px 12px;
`

const DoubleWraper = styled.View`
flex-direction: row;
justify-content: space-between;
margin: 3% 0px;
`
const Span = styled.Text`
    font-weight: 200;
    font-size: 12px;
`

const Location = styled.View`
  flex-direction: row;
  height: 30px;
  margin-bottom: 12px;
`

const LocationText = styled.Text`
  font-size: 12px;
  flex:1;
  align-self: center;
`

const styles = StyleSheet.create({
  mapStyle: {
    width: "100%",
    overflow: "hidden",
    height: 350
  },
})

const Exponent = styled(Subtitulo)`
  font-size: 12px;
  position: relative;
  top: -3px;
  margin: 0px;
`;