import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import { Rating } from 'react-native-ratings';
import Boton from './../ui/Button'
import Carousel from "../components/Carousel";
import FadeInView from "../components/FadeInView";
import Loading from "../components/Loading";


function indexes(index, total) {
    let indexes = [];
    let start = index-2 < 1 ? 1 : index-2;
    if (total-4 >= 1 && start+3 >= total) start = total-4;
    for (let i = start; i < start+5 && i <= total; i++) indexes.push(i);
    return indexes;
}


function mapBadge(filter, remove) {
  const map = {
    v: _ => "Solo verificados",
    photos: _ => "Solo con fotos",
    t: val => val,
    p: val => val == "ciudad autónoma de buenos aires" ? "capital federal" : val,
    n: val => val,
    min: val => "Minimo $"+val,
    max: val => "Máximo $"+val,

  }

   return Object.keys(filter).map((key,i) => {
    const text = map[key](filter[key])

    return (
      <Badge key={i}>
        <TouchableOpacity onPress={()=>remove(key)}>
          <BadgeRemove  source={require("../../public/icons/cross.png")}/>
        </TouchableOpacity>
        <BadgeText>{text}</BadgeText>
      </Badge>
    )
   })

}

export default ({ allSpaces, navigation, total, pages,user, setIndex, scrollView, index, sendId,favorites,favs, filter, removeFilter, loading }) => {
  const [mode, setMode] = useState(false);

  console.log("favs",favs)
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

        <BadgeWrapper>
        {
          mapBadge(filter, removeFilter)
        }
        </BadgeWrapper>
        {
          !loading ? 
          <TextoBusquedas>
            {`${total} espacios encontrados`}
          </TextoBusquedas> : null
        }
      </View>

      {
        !loading ? 

      <Wrapper>
        { allSpaces.map((espacio, index) => {
          return (
                <FadeInView key={index} order={index}>
            <StyledView
              
              style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}
            >
              <View>
                <View style={{
                  width: '100%',
                  height: (espacio.photos || []).length ? 250 : "auto",
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  overflow: "hidden"
                }} >
                  <Carousel images={espacio.photos || []} height={250}/>
                  {espacio.verified ? (<Verified style={{ position: "absolute", bottom: 5, right: 2, zIndex: 9 }}>
                    <Image source={require("../../public/icons/verificado-ve.png")} style={{ width: 40, height: 40 }} />
                  </Verified>) : null}
                </View>
                <ViewInfo>
                  <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <TouchableOpacity
                      style={{flex:1}}
                      onPress={() => { return sendId(espacio.id) }}
                    >
                      <Titulo>{espacio.title}</Titulo>
                      {espacio.province === 'ciudad autónoma de buenos aires'
                        ? <Subtitulo>{`${espacio.neighborhood} - Capital Federal - ${espacio.size}mtr2`}</Subtitulo>
                        : <Subtitulo>{`${espacio.neighborhood} - ${espacio.province} - ${espacio.size}mtr2`}</Subtitulo>
                      }
                      <View style={{ margin: 0, alignItems: "flex-start", marginLeft: 2 }}>
                        <Rating
                          type='custom'
                          ratingBackgroundColor='#c8c7c8'
                          ratingCount={5}
                          imageSize={15}
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>favorites(espacio.id,user.uid)}>
                      <Image
                        style={{ width: 30, height: 30, marginRight: 2 }}
                        
                        source={favs.includes(espacio.id)? (require("../../public/icons/corazon-ro.png")):(require("../../public/icons/corazon-ne.png"))}
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
            <TouchableOpacity onPress={()=>setIndex(index-1)}>
              <PaginationText>Anterior</PaginationText>
            </TouchableOpacity> : null
          }
          {
            indexes(index,pages).map((i) => (
              <TouchableOpacity key={i} onPress={()=>setIndex(i)}>
                <PaginationText bold={(index==i)+""}>{i}</PaginationText>
              </TouchableOpacity>
            ))
          }
          {
            index < pages ?
            <TouchableOpacity onPress={()=>setIndex(index+1)}>
              <PaginationText>Siguiente</PaginationText>
            </TouchableOpacity> : null
          }
        </PaginationWrapper>
      </Wrapper>
      
        : <Loading/>
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
const Thumbnail = styled.Image`
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
  margin-left: 12px;
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
  font-weight: ${p=> p.bold=="true" ? 700 : 100};
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


























/* import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import styled from "styled-components/native";
import { Rating } from 'react-native-ratings';


export default ({ espacios, sendId, toggleLike, allSpaces, total, pages, navigation }) => {
  const [mode, setMode] = useState(false);

  return (
    <ScrollView>
      <View style={{ backgroundColor: "#E9E9E9" }}>
        <ListaYMapa>
          <Lista active={!mode + ""} onPress={() => setMode(false)}>
            Lista
          </Lista>
          <Lista active={mode + ""} onPress={() => setMode(true)}>
            Mapa
          </Lista>
        </ListaYMapa>
        <View>
          <TextoBusquedas>
            {`${allSpaces.length} espacios encontrados`}
          </TextoBusquedas>
          <Wrapper>
            {allSpaces.map((espacio, index) => {
              const screenWidth = Math.round(Dimensions.get('window').width);
              const screenHeight = Math.round(Dimensions.get('window').height);
              let ancho = screenWidth / 2
              let alto = screenHeight / 5
              return (
                <StyledView
                  key={index}
                /* style={styles.imp}
                >

                  <TouchableOpacity onPress={() => { return sendId(espacio.id) }} style={{ display: "flex", flexDirection: "row", height: alto }} >
                    <View style={{ width: "50%" }}>
                      <Thumbnail
                        source={{ uri: espacio.photos[0] }}
                        resizeMode="cover"
                        style={
                          { width: ancho, height: alto }
                        }
                      />
                      {espacio.verified ? (<Verified style={{ position: "absolute", bottom: 5, right: 2, zIndex: 9 }}>
                        <Image source={require("../../public/icons/verificado-ve.png")} style={{ width: 40, height: 40 }} />
                      </Verified>) : null}
                    </View>
                    <View
                      style={{
                        width: "50%",
                        marginTop: 15,
                        marginLeft: 10,
                        marginRight: 5
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Precio>{`$${espacio.price}`}</Precio>
                        <Text
                          style={{
                            marginLeft: 3,
                            marginTop: "auto",
                            marginBottom: 3,
                            fontSize: 15,
                            color: "grey"
                          }}
                        >
                          +imp
                        </Text>

                        <TouchableOpacity
                          style={{ margin: "auto" }}
                        >
                          <Image
                            style={{ width: 30, height: 30 }}
                            source={require("../../public/icons/corazon-ne.png")}
                          />
                        </TouchableOpacity>
                      </View>
                      <Titulo>{espacio.title}</Titulo>
                      <Subtitulo>{`${espacio.neighborhood}-${espacio.province}`}</Subtitulo>
                      <Subtitulo>{`${espacio.size} mtr2`}</Subtitulo>
                    </View>
                  </TouchableOpacity>
                  <Descripcion>{`${(espacio.description || "").slice(
                    0,
                    100
                  )}...`}</Descripcion>
                  <Comentarios>
                    <Rating
                      type='custom'
                      // ratingImage={require("../../public/icons/estrella-az.png")}
                      // ratingColor='#3498db'
                      ratingBackgroundColor='#c8c7c8'
                      ratingCount={5}
                      imageSize={15}
                      style={{ paddingVertical: 10 }}
                    />
                    <Text
                      style={{ color: "grey", fontWeight: "bold", padding: 10 }}
                    >{`${(espacio.location || "").length || 0}  Ver comentarios`}
                    </Text>
                  </Comentarios>
                  <ContenedorIconos>
                    {(espacio.services || []).map((caracteristica, index) => (
                      <ContenedorIcono key={index}>
                        <Icono source={caracteristica === "wifi" ?
                          (require("../../public/icons/wifi-ne.png"))
                          :
                          (caracteristica === "Aire Acondicionado" ?
                            (require("../../public/icons/proyector-ne.png"))
                            :
                            caracteristica === "Cafe" ?
                              (require("../../public/icons/cafe-ne.png"))
                              :
                              caracteristica === "Ducha" ?
                                (require("../../public/icons/ducha-ne.png"))
                                :
                                null)
                        } />
                      </ContenedorIcono>
                    ))}
                  </ContenedorIconos>
                  <ContenedorContacto>
                    <Contacto
                      style={{
                        backgroundColor: "#000144",
                        borderColor: "#000144"
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Llamar
                        </Text>
                    </Contacto>
                    <Contacto
                      style={{
                        backgroundColor: "#4A94EB",
                        borderColor: "#4A94EB"
                      }}
                    >
                      <Text style={{ color: "white", fontSize: 16 }}>
                        Mensaje
                        </Text>

                    </Contacto>
                    <Contacto
                      style={{
                        backgroundColor: "#00A527",
                        borderColor: "#00A527"
                      }}
                    >
                      <Image style={{ height: 24, width: 24 }} source={require("../../public/icons/whatsapp1.png")} />
                    </Contacto>
                  </ContenedorContacto>
                </StyledView>
              );
            })}
          </Wrapper>
        </View>
      </View>
    </ScrollView>
  );
};

const ListaYMapa = styled.View`
  background-color: #4a94ea;
  flex-direction: row;
  box-shadow: 0px 1px 20px grey;
`;

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
`;

const TextoBusquedas = styled.Text`
  text-align: center;
  padding: 1%;
  margin-bottom: 1%;
  color: #848484;
  border-bottom-color: #848484;
  border-bottom-width: 1px;
  margin: 0px;
`;

const Thumbnail = styled.Image`
`;

const Verified = styled.View`
`

const Precio = styled.Text`
  font-size: 30px;
  margin: 3px;
`;
const Titulo = styled.Text`
  font-size: 17px;
  margin: 3px;
`;
const Subtitulo = styled.Text`
  font-size: 15px;
  font-weight: 100;
  color: grey;
  margin: 3px;
`;
const Descripcion = styled.Text`
  margin: 20px 10px 10px 10px;
`;

const Comentarios = styled.View`
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-self: flex-start;
`

const ContenedorIconos = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  width: 100%;
  justify-content: space-evenly;
`;

const ContenedorIcono = styled.View`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
  margin: 10px;
  width: 25px;
  height: 70px;`;

const Icono = styled.Image`
    background-color: #F7F7F7;
    border-radius: 100px;
    border-width: 1px;
    border-color: #F7F7F7

    height: 45px;
    width: 45px;
`;

const ContenedorContacto = styled.View`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-evenly;
`;

const Contacto = styled.View`
  width: 120px;
  height: 40px;
  border-radius: 5px;
  margin: 10px 5px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.View`
  flex: 1;
  margin: 0px auto;
  width: 100%;
  padding: 0 10px;
  max-width: 500px;
`
const StyledView = styled.View`
  margin: 10px 0;
  background-color: #F7F7F7;
  padding : 20px 25px 15px;
  border-radius: 5px
`

// DUDA: como hacer box-shadow en stylesheet
const styles = StyleSheet.create({
  imp: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 10,
<<<<<<< HEAD
    borderBottomColor: "#D9D5C8"
  },
  // sombra: {
  //   boxShadow: [0, 1, 20, 0, "grey"]
  // }
})


const PaginationWrapper = styled.View`
  width: 100%;
  height: 36px;
  flex-direction: row;
  justify-content: center;
`

const PaginationText = styled.Text`
  font-size: 14px;
  color: #4082d1;
  padding: 10px;
`

=======
    borderBottomColor: "#D9D5C8",
  }
}) */
