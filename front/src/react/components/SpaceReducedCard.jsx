import React from "react";
import FadeInView from "./FadeInView";
import styled from "styled-components/native";
import Carousel from "./Carousel";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Button from "../ui/Button";


const tableFields = {
    visible: "Visible",
    province: "Provincia",
    neighborhood: "Localidad",
    street: "Calle",
    streetNumber: "Numero",
    floor: "Piso",
    dpto: "Departamento",
    size: "Tamaño (mtr2)",
    capacity: "Capacidad",
    price: "Precio por hora",
    cleanup: "Tasa de limpieza",
}

const textFields = {
    services: "Servicios",
    description: "Descripcion",
    observations: "Observaciones",
    rules: "Reglas de convivencia",
}

export default function SpaceReducedCard ({espacio, index, navigation, user, favs, favorites, callInfo}) {

    return <FadeInView order={index/2}>
        <StyledView
            onPress={()=>callInfo(()=>{
                return <View>
                    <Titulo style={{marginBottom: 12}}>{espacio.title}</Titulo>
                    <TextButton onPress={()=>navigation.push("SingleView", {propertyId: espacio.id})} bg={"white"}>Ver publicación</TextButton>
                    <TextButton onPress={()=>navigation.push("EditSpace", {propertyId: espacio.id})} bg={"white"}>Editar</TextButton>
                    {
                        espacio.enabled ? 
                        <View>
                            <TextButton onPress={()=>navigation.push("UserSearch", {propertyId: espacio.id})} bg={"white"}>Registrar inquilino</TextButton>
                            <TextButton onPress={()=>navigation.push("Comments", {propertyId: espacio.id})} bg={"white"}>Ver Comentarios ({(espacio.comments || []).length})</TextButton>
                        </View>
                        : (
                            espacio.rejected == true ?
                            <Text style={{color: "#ff5c5c"}}>{espacio.reason || "Este espacio ha sido rechazado. Revise los términos y condiciones."}</Text>
                            : 
                            <Text style={{color: "#c1c1c1"}}>Este espacio está pendiente a que sea aprobado.</Text>
                        )
                    }
                    {
                        espacio.updateData ?
                            <Text style={{color: "#c1c1c1"}}>Este espacio tiene actualizaciones pendientes.</Text>
                        : null
                    }
                    {
                        Object.keys(tableFields).map((key,i) => (
                            espacio[key] ? <TableRow style={{ borderBottomColor: "#DDD", borderBottomWidth: 1}} key={i}>
                                <TableLeft>{tableFields[key]}</TableLeft>
                                <TableRight>{espacio[key]}</TableRight>
                            </TableRow> : null
                        ))
                    }
                    {
                        Object.keys(textFields).map((key,i) => (
                            espacio[key] ? <View key={i}>
                                <TableRow style={{ borderBottomColor: "#DDD", borderBottomWidth: 1}} key={i}>
                                    <TableLeft>{textFields[key]}</TableLeft>
                                </TableRow>
                                <Text>{typeof espacio[key] == "object" ? espacio[key].join(", ") : espacio[key]}</Text>
                            </View> : null
                        ))
                    }
                    
                </View>
            })}
            style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}
        >
            <View style={{flexDirection: "row", flex: 1}}>
                {
                    espacio.photos && espacio.photos.length ?
                    <InlineRow>
                        <Thumbnail source={{uri: espacio.photos[0]}}/>
                    </InlineRow>
                    : null
                }
                <InlineRow style={{alignSelf: "center", marginLeft: espacio.photos && espacio.photos.length ? 0 : 12, paddingTop: 6, paddingBottom: 6}}>

            <Titulo style={{color: espacio.visible ? "#000" : "#666" }}>{espacio.title}{espacio.rejected ? <Text style={{color:"#ff5c5c"}}>(!)</Text> : null}</Titulo>
                    {espacio.province === 'ciudad autónoma de buenos aires'
                        ? <Subtitulo>{espacio.neighborhood} - Capital Federal</Subtitulo>
                        : <Subtitulo>{espacio.neighborhood} - {espacio.province}</Subtitulo>
                    }
                
                </InlineRow>
            </View>
        </StyledView>
        {/* <DoubleWraper>
            <Boton
                onPress={() => navigation.push("SingleView", { propertyId: espacio.id })}
                bg="#4A94EA"
                color="#F7F7F7"
                mr="5px"
                >Mas Info.
            </Boton>

            <Boton
                onPress={() => navigation.push("EditSpace", { propertyId: espacio.id })}
                bg="#F77171"
                color="#F7F7F7"
                ml="5px"
                >Editar
            </Boton>
            
        </DoubleWraper> */}
    </FadeInView>
}

const TextButton = styled.Text`
    flex:1;
    color: #4a94ea;
    padding: 6px 0;
`
const DoubleWrapper = styled.View`
    flex-direction: row;
`

const TableRow = styled.View`
    padding: 6px 0px;
    margin: 12px 0;
    flex-direction: row;
`

const TableLeft = styled.Text`
    flex: 1;
    font-size: 16px;
`

const TableRight = styled(TableLeft)`
    text-align: right;
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
  font-weight: 500;
  text-transform: capitalize;
  margin: 3px 3px 0px 3px;
`

const StyledView = styled.TouchableOpacity`
  margin: 5px;
  background-color: #F7F7F7;
  padding : 0;
  border-radius: 10px;
  overflow: hidden;
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
  margin-bottom: 24px;
`;


const Exponent = styled(Subtitulo)`
  font-size: 12px;
  position: relative;
  top: -3px;
  margin: 0px;
`;

const InlineRow = styled.View`
    flex: 1;
    flex-direction: column;
`

const Thumbnail = styled.Image`
    height: 115px;
    width: 145px;
`