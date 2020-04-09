import React, { useState, useEffect } from "react";
import { View,Text,ScrollView,Image,TouchableOpacity,Linking } from "react-native";
import { useNavigation } from "@react-navigation/native"
import styled from "styled-components/native";
import { Rating } from 'react-native-ratings';
import Boton from './../ui/Button'
import Carousel from "../components/Carousel";
import FadeInView from "../components/FadeInView";
import Loading from "../components/Loading";
import { connect } from "react-redux";
import { fetchFav } from "../../redux/actions/user";
import Axios from "axios";


function Favorites ({user,state}) {
  const navigation = useNavigation();

  const [favs, setFavs] = useState([])
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    fetchFav(user.uid)
      .then(data => {
      return Promise.all(data.data.favoritos.map((spaceId)=> {
      return  Axios.get(`https://ext-api.web.app/api/properties/singleSpace/${spaceId}`)
        .then((data)=> data.data)}))
        
      .then((data)=> setFavs(data))
      .then(()=>setLoading(false))})}
      
      
     , [])

  function deleteFav(id, userId){
    console.log("IdFav",id)
    setFavs([])
    Axios.put(`http://localhost:5001/ext-api/us-central1/app/api/users/favs/${userId}`, {id} )
    .then((data)=> {
      
      data.data.favoritos.map((spaceId)=> {Axios.get(`http://localhost:5001/ext-api/us-central1/app/api/properties/singleSpace/${spaceId}`)
      .then((data)=> data.data)
      .then((data)=> setFavs(favs =>[...favs,data]))
      .then(()=>setLoading(false))})})
        
    
    
  }


  console.log("faaaavs",favs)
  return (
   <ScrollView>    
    {
        !loading ?   
    <Wrapper>
    {favs.map((espacio, index) => {
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
                      <Rating
                        type='custom'
                        ratingBackgroundColor='#c8c7c8'
                        ratingCount={5}
                        imageSize={15}
                      />
                      <TouchableOpacity onPress={() => showComments(espacio.id)}>
                        <Text
                          style={{ color: "grey", fontWeight: "bold", padding: 10 }}
                        >{`${(espacio.comments || "").length || 0}  Ver comentarios`}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => deleteFav(espacio.id, user.uid)}>
                    <Image
                      style={{ width: 30, height: 30, marginRight: 2 }}
                      source={(require("../../public/icons/corazon-ro.png"))}
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
  </Wrapper>
  : <Loading />
      }
    </ScrollView>   
  )
}


const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    return {
      user: state.user.logged,
      state
    }
  }

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
<<<<<<< HEAD
`


export default connect(mapStateToProps, null)(Favorites);