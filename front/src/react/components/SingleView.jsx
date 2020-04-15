import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Animated, Dimensions, ScrollView, Linking, TouchableOpacity } from 'react-native'
import styled from "styled-components/native";
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import Boton from './../ui/Button'
import qs from 'qs'
import Carousel from "../components/Carousel";
import Loading from "../components/Loading";
import MapView from 'react-native-maps';
import Map from "../components/map"

export default ({ space, loading, allSpaces, navigation, propietario, edit, handleEdit }) => {
  const [mode, setMode] = useState(false)

  const [description, setDescription] = useState(false)
  const [rules, setRules] = useState(false)
  const [ubication, setUbication] = useState(false)

  const spaceDescription = <Text>{space.description}</Text>
  const spaceRules = <Text>{space.rules}</Text>
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
      <View>
        <View style={{ backgroundColor: "#4A94EA", flexDirection: "row" }}>
          <Lista active={(!mode) + ""} onPress={() => (setMode(false))}>Lista</Lista>
          <Lista active={(mode) + ""} onPress={() => (setMode(true))}>Mapa</Lista>
        </View>
        {!mode ? (
          <Wrapper>
            <StyledView
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}
            >
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
                  ? <Subtitulo>{`${space.neighborhood} - Capital Federal - ${space.size}mtr2`}</Subtitulo>
                  : <Subtitulo>{`${space.neighborhood} - ${space.province} - ${space.size}mtr2`}</Subtitulo>
                }
                <View style={{ flexDirection: "row" }}>
                  <Precio>{`$${space.price}`}</Precio>
                  <Text style={{ alignSelf: 'center' }}>por hora</Text>
                </View>
                <Divider />

                <TextoComun>{space.description}</TextoComun>

                <TextoCaracteristicas >Caracteristicas especiales</TextoCaracteristicas>
                <ServicesWrapper>
                  <Service source={require("../../public/icons/ducha-ne.png")} />
                  <Service source={require("../../public/icons/toiletes-ne.png")} />
                  <Service source={require("../../public/icons/wifi-ne.png")} />
                </ServicesWrapper>

                <View>
                  <Titulo onPress={() => setDescription(!description)}>Descripción</Titulo>
                  {description ? spaceDescription : null}
                </View>

                <View>
                  <Titulo onPress={() => setRules(!rules)}>Reglas</Titulo>
                  {rules ? spaceRules : null}
                </View>

                <View>
                  <Titulo onPress={() => setUbication(!ubication)}>Ubicacion</Titulo>
                  {ubication ? spaceUbication : null}
                </View>

                <DoubleWraper>
                  <Boton
                    onPress={() =>
                      sendEmail(
                        `${propietario.email}`,
                        'Greeting!',
                        'I think you are nice person.')
                        .then(() => {
                          console.log('Our email successful');
                        })
                        .catch(err => console.error(err))
                    }
                    bg="#4A94EA"
                    color="#F7F7F7"
                    mr="5px"
                  >Email
                                    </Boton>

                  <Boton
                    onPress={() => Linking.openURL(`tel:${propietario.phoneNumber}`)}
                    bg="#F77171"
                    color="#F7F7F7"
                    ml="5px"
                  >Llamar
                                    </Boton>
                </DoubleWraper>
              </Container>
              <View style={{
                width: '100%',
                height: "auto",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                overflow: "hidden"
              }} >
                <MapView style={styles.mapStyle}
                  initialRegion={{
                    latitude: Number(space.location[0].lat),
                    longitude: Number(space.location[0].lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <MapView.Marker
                    coordinate={
                      {
                        latitude: Number(space.location[0].lat),
                        longitude: Number(space.location[0].lng),
                      }}>
                    <Image
                      style={{ width: 40, height: 50 }}
                      source={require("../../public/icons/icono_marker_az.png")}
                    />
                  </MapView.Marker>
                </MapView>
              </View>

            </StyledView>
          </Wrapper>
        ) : (<Map navigation={navigation} allSpaces={allSpaces}></Map>)}


      </View>


    </ScrollView >
  )
}


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
text-transform: capitalize;
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
  margin: 10px 8px;

`

const Lista = styled.Text`
align-self: center;
font-size: 18px;
justify-content:center;
text-align:center;
padding-bottom: 5px;
border-color:${(props) => props.active == "true" ? "white" : "#4A94EA"};
border-bottom-width:3px;
width:50%;
`
const TextoComun = styled.Text`
font-size: 13px;
font-weight: 600;
margin: 0 3px 3px 3px;
`

const TextoCaracteristicas = styled.Text`
    font-size: 17px;
    `

const ServicesWrapper = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;
`

const Service = styled.Image`
    height: 45px;
    width: 45px;
    margin-right: 20px;
    margin-bottom: 20px;
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

const styles = StyleSheet.create({
  fondo: {
  },
  imagenInputs: {
    height: 45,
    width: 45,
    marginRight: 20,
    marginBottom: 20,
  },
  contenedorIconos: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: "70%",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#FFFFFF"
  },
  mapStyle: {
    width: '100%',
    height: 350
  },
  mapAll: {
    marginTop: 2,
    maxWidth: 500,
    height: 800
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
