import React from "react";
import FadeInView from "./FadeInView";
import styled from "styled-components/native";
import Carousel from "./Carousel";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Boton from "../ui/Button";
import FavoriteButton from "./FavoriteButton";
import { Rating } from 'react-native-elements';

export default function SpaceCard ({espacio, index, user, navigation}) {

    return <FadeInView order={index}>
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
                onPress={() => navigation.push("SingleView", {propertyId: espacio.id})}
                >
                <Titulo>{espacio.title}</Titulo>
                {espacio.province === 'ciudad autónoma de buenos aires'
                    ? <Subtitulo>{espacio.neighborhood} - Capital Federal - {espacio.size+ "m"}<Exponent>2</Exponent></Subtitulo>
                    : <Subtitulo>{espacio.neighborhood} - {espacio.province} - {espacio.size + "m"}<Exponent>2</Exponent></Subtitulo>
                }
            
                </TouchableOpacity>

                {
                    user.uid ? <FavoriteButton espacio={espacio}/> : null
                }
            </View>
            <View style={{ margin: 0, alignItems: "flex-start", marginLeft: 2 }}>
                <TouchableOpacity onPress={() => navigation.push("Comments", {propertyId: espacio.id})}>
                {
                    espacio.rating ? 
                    <Rating
                        readonly
                        imageSize={14}
                        type='custom'
                        ratingColor={"#4a94ea"}
                        tintColor={"#FFFFFF"}
                        startingValue={ Number(espacio.rating)}
                        style={{ paddingTop: 10, alignItems: "flex-start" }}
                    />
                    : null
                }
                <Text style={{ color: "grey", fontWeight: "bold", paddingLeft: 0, paddingTop: 10, paddingBottom: 10 }}>
                    ({(espacio.comments || 0)}) Ver comentarios
                </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
                <Precio>{`$${espacio.price}`}</Precio>
                <Text style={{ alignSelf: 'center' }}>por hora</Text>
            </View>
                {/*
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
                */}
            </ViewInfo>

        </View>
        </StyledView>
    </FadeInView>
}


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

const StyledView = styled.View`
  margin: 10px 5px;
  background-color: #FFFFFF;
  padding : 0;
  border-radius: 10px;
`

const Subtitulo = styled.Text`
  font-size: 15px;
  font-weight: 100;
  text-transform: capitalize;
  color: grey;
  margin: 0 3px 3px 3px;
`

const Verified = styled.View`
`;
const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
`;


const Exponent = styled(Subtitulo)`
  font-size: 12px;
  position: relative;
  top: -3px;
  margin: 0px;
`;
