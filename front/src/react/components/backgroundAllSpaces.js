import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";

import styled from "styled-components/native";
import Boton from './../ui/Button'
import Carousel from "../components/Carousel";
import FadeInView from "../components/FadeInView";
import Loading from "../components/Loading";
import Map from "../components/map";



function indexes(index, total) {
  let indexes = [];
  let start = index - 2 < 1 ? 1 : index - 2;
  if (total - 4 >= 1 && start + 3 >= total) start = total - 4;
  for (let i = start; i < start + 5 && i <= total; i++) indexes.push(i);
  return indexes;
}


function mapBadge(filter, remove) {
  const map = {
    v: _ => "Solo verificados",
    photos: _ => "Solo con fotos",
    t: val => val,
    p: val => val == "ciudad autónoma de buenos aires" ? "capital federal" : val,
    n: val => val,
    min: val => "Minimo $" + val,
    max: val => "Máximo $" + val,

  }

  return Object.keys(filter).map((key, i) => {
    const text = map[key](filter[key])

    return (
      <Badge key={i}>
        <TouchableOpacity onPress={() => remove(key)}>
          <BadgeRemove source={require("../../public/icons/cross.png")} />
        </TouchableOpacity>
        <BadgeText>{text}</BadgeText>
      </Badge>
    )
  })

}

export default ({ allSpaces, navigation, total, pages, user, setIndex, scrollView, index, sendId, favorites, favs, filter, removeFilter, loading, showComments, markers }) => {
  const [mode, setMode] = useState(false);
  return (
    <ScrollView ref={scrollView}>
      <View>
        <ListaYMapa>
          <Lista active={!mode + ""} onPress={() => setMode(false)}>
            Lista
          </Lista>
          <Lista active={mode + ""} onPress={() => setMode(true)}>
            Mapa
          </Lista>
        </ListaYMapa>

        {
          !mode ?
          <BadgeWrapper>
            {
              mapBadge(filter, removeFilter)
            }
          </BadgeWrapper> : null
        }
        {
          !loading && !mode ?
            <TextoBusquedas>
              {`${total} espacios encontrados`}
            </TextoBusquedas> : null
        }
      </View>

      {
        !loading ?

          !mode ? <Wrapper>
            {allSpaces.map((espacio, index) => {
              return (
                <FadeInView key={index} order={index}>
                  <StyledView
                    style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}
                  >
                    <View>
                      <View style={{
                        width: '100%',
                        height: (espacio.photos || []).length ? 250 : "auto",
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        overflow: "hidden"
                      }} >
                        <Carousel images={espacio.photos || []} height={250} />
                        {espacio.verified ? (<Verified style={{ position: "absolute", bottom: 5, right: 2, zIndex: 9 }}>
                          <Image source={require("../../public/icons/verificado-ve.png")} style={{ width: 40, height: 40 }} />
                        </Verified>) : null}
                      </View>
                      <ViewInfo>
                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                          <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => { return sendId(espacio.id) }}
                          >
                            <Titulo>{espacio.title}</Titulo>
                            {espacio.province === 'ciudad autónoma de buenos aires'
                              ? <Subtitulo>{`${espacio.neighborhood} - Capital Federal - ${espacio.size}mtr2`}</Subtitulo>
                              : <Subtitulo>{`${espacio.neighborhood} - ${espacio.province} - ${espacio.size}mtr2`}</Subtitulo>
                            }
                            <View style={{ margin: 0, alignItems: "flex-start", marginLeft: 2 }}>
                              <TouchableOpacity onPress={() => showComments(espacio.id)}>
                                <Text
                                  style={{ color: "grey", fontWeight: "bold", paddingLeft: 0, paddingTop: 10, paddingBottom: 10 }}
                                >{`${(espacio.comments || "").length || 0}  Ver comentarios`}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </TouchableOpacity>

                          <TouchableOpacity onPress={() => favorites(espacio.id, user.uid)}>
                            <Image
                              style={{ width: 30, height: 30, marginRight: 2 }}
                              source={favs.includes(espacio.id) ? (require("../../public/icons/corazon-ro.png")) : (require("../../public/icons/corazon-ne.png"))}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row" }}
                        >
                          <Precio>{`$${espacio.price}`}</Precio>
                          <Text style={{ alignSelf: 'center' }}>por hora</Text>
                        </View>
                        <DoubleWraper>
                          <Boton
                            onPress={() => { return sendId(espacio.id) }}
                            bg="#4A94EA"
                            color="#F7F7F7"
                            mr="5px"
                          >Mas Info.
                  </Boton>

                          <Boton
                            onPress={() => Linking.openURL(`tel:${+541123561654}`)}
                            bg="#F77171"
                            color="#F7F7F7"
                            ml="5px"
                          >Contacto.
                  </Boton>

                        </DoubleWraper>
                      </ViewInfo>

                    </View>
                  </StyledView>
                </FadeInView>
              );
            })}
            <PaginationWrapper>
              {
                index > 1 ?
                  <TouchableOpacity onPress={() => setIndex(index - 1)}>
                    <PaginationText>Anterior</PaginationText>
                  </TouchableOpacity> : null
              }
              {
                indexes(index, pages).map((i) => (
                  <TouchableOpacity key={i} onPress={() => setIndex(i)}>
                    <PaginationText bold={(index == i) + ""}>{i}</PaginationText>
                  </TouchableOpacity>
                ))
              }
              {
                index < pages ?
                  <TouchableOpacity onPress={() => setIndex(index + 1)}>
                    <PaginationText>Siguiente</PaginationText>
                  </TouchableOpacity> : null
              }
            </PaginationWrapper>
          </Wrapper>
          :
          <Map navigation={navigation} allSpaces={{properties:allSpaces, markers}}></Map>

          : <Loading />
      }
    </ScrollView>
  );
};

const ListaYMapa = styled.View`
  background-color: #4a94ea;
  flex-direction: row;
  box-shadow: 0px 1px 20px grey;
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

const ViewInfo = styled.View`
padding: 18px;
`
const Precio = styled.Text`
  font-size: 20px;
  margin: 3px;
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
  margin: 0 3px 3px 3px;
`
const Lista = styled.Text`
  color: ${props => (props.active == "true" ? "white" : "#000144")};
  align-self: center;
  font-size: 18px;
  justify-content: center;
  text-align: center;
  padding-bottom: 5px;
  border-color: ${props => (props.active == "true" ? "white" : "#4A94EA")};
  border-bottom-width: 3px;
  width: 50%;
`
const TextoBusquedas = styled.Text`
  font-size: 18px;
  text-align : center;
  color: black;
  font-weight: 600;
`
const Verified = styled.View`
`
const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`

const PaginationWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`

const PaginationText = styled.Text`
  font-size: 14px;
  color: #4082d1;
  padding: 10px;
  font-weight: ${p => p.bold == "true" ? 700 : 100};
`

const Badge = styled.View`
  height: 24px;
  background-color: #F77171;
  padding: 4px;
  border-radius: 6px;
  flex-direction: row;
  margin-bottom: 6px;
  margin-right: 6px;
`
const BadgeText = styled.Text`
  font-size: 12px;
  color:white;
  line-height: 16px;
  flex: 1;
  text-transform: capitalize;
  margin-right: 4px;
`
const BadgeRemove = styled.Image`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`
const BadgeWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 12px;
  flex-wrap: wrap;
`
