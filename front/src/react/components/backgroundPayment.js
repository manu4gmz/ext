import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Image, View, ScrollView, Button } from 'react-native'
import styled from "styled-components/native"
import { connect } from 'react-redux'
import AddSpaceFormProgress from "../components/AddSpaceFormProgress";

const backgorunPayment = ({ navigation }) => {
  return (
   
      <View style={styles.fondo}>
        <ScrollView>
          <View style={{padding: 20}}>
            <AddSpaceFormProgress state={2} title="Elegí un plan"/>
          </View>
          <View style={styles.box1}>
            <Text style={styles.destacado}>Destacado</Text>
            <View style={styles.precio}>
              <Text style={styles.precio1} >$1.350</Text>
              <Text style={{lineHeight:42,color: "#333333"}}> + imp.</Text>
            </View>
              <Text style={styles.aviso}>1 AVISO</Text>
              <Text>Visibilidad estándard</Text>
              <Text>Plan Mensual</Text>
              <View style={styles.but1}>
            <Text style={{color:"#F77171",lineHeight:30}} >Elegir</Text>
            </View>
          </View>

          <View style={styles.box1}>
            <Text style={styles.premium}>Premium</Text>
            <View style={styles.precio}>
              <Text style={styles.precio1}>$1.350</Text>
              <Text style={{lineHeight:42, color: "#333333"}}> + imp.</Text>
            </View>
              <Text style={styles.aviso}>1 AVISO</Text>
              <Text>Visibilidad estándard</Text>
              <Text>Plan Mensual</Text>
              <View style={styles.but1}>
            <Text style={{color:"#F77171",lineHeight:30}} >Elegir</Text>
            </View>
          </View>

          <View style={styles.box3}>
            <Text style={styles.gratis}>Gratis</Text>
            <View style={styles.precio}>
              <Text style={styles.precio2}></Text>
              <Text style={{color:"white"}}></Text>
            </View>
              <Text style={styles.aviso3}>1 AVISO</Text>
              <Text style={{color:"white"}}>Visibilidad estándard</Text>
              <Text style={{color:"white"}}>Plan Mensual</Text>
              <View style={styles.but3}>
            <Text style={{color:"#4A94EA",lineHeight:30}}>Elegir</Text>
            </View>
          </View>

          <PaymentMethodWrapper>
                <PaymentMethodText>Medios de pago: </PaymentMethodText>
                <MpLogo source={require("../../public/images/mercado-pago.png")} />
          </PaymentMethodWrapper>
          <View style={styles.bot4}>
          <Text style={{color:"white",
        textAlign: "center", lineHeight:30}}>Términos y Condiciones</Text>
        
          </View>
        </ScrollView>
      </View>
    
  )
}

const styles = StyleSheet.create({
  fondo: {
    justifyContent: "center",
    width: '100%',
    height: '100%',
    

    
},
   box1: {
    alignItems: "center",
       backgroundColor: "#FFFFFF",
       width: "70%",
       height: 290,
       marginHorizontal: 45,
       marginVertical: 8,
       borderRadius: 9,
       alignSelf: "center",
       shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 18,
   },


   box3: {
    alignItems: "center",
    backgroundColor: "#4A94EA",
    width: "70%",
    height:290,
    marginHorizontal: 45,
    marginVertical: 8,
    borderRadius: 9,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
   },
   
  destacado: {
    fontSize: 18,
    lineHeight:30,
    margin: 15,
    borderRadius: 18,
    textAlign: "center",
    alignSelf: "center",
    width: "85%",
    height: 35,
    color: "white",
    backgroundColor: "#707070"
   },

   premium: {
    fontSize: 18,
    lineHeight:30,
    margin: 15,
    borderRadius: 18,
    textAlign: "center",
    alignSelf: "center",
    width: "85%",
       height: 35,
       color: "white",
       backgroundColor: "#00DC37"
   },

   gratis: {
    fontSize: 18,
    lineHeight:30,
    borderRadius: 18,
    margin: 15,
    textAlign: "center",
        color: "white",
        width: "85%",
        height: 35,
        borderColor: "white",
        borderWidth: 1
        
   },

   precio: {
       flexDirection: "row",
       
       marginTop: 18,
       marginBottom: 15
   },
   
   but1:{
       marginTop: 38,
       alignItems: "center",
       alignSelf: "center",
       width: "85%",
       height: 36,
       borderWidth: 2,
       borderColor: "#F77171",
       borderRadius: 4
   },

   but3:{
    
    marginTop: 77,  
    alignItems: "center",
    alignSelf: "center",
    width: "85%",
    height: 36,
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 4
},

   bot4:{
    
    width: "92%",
    alignSelf: "center",
    marginHorizontal: 7,
    marginBottom: 35,
    backgroundColor: "#B9B6A2",
    height: 35,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 3,
    },
    borderRadius: 5,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    
    elevation: 6,
   },

   precio1:{
    
    
    fontSize: 25,
    fontWeight: "bold"
   },

   precio2:{
    
    color: "white",
    fontSize: 25,
    fontWeight: "bold"
   },

   aviso:{
    
    
    fontSize: 17,
    fontWeight: "bold"
   },
   aviso3:{
    
    color: "white",
    fontSize: 17,
    fontWeight: "bold"
   },
   
 
   
})

const PaymentMethodWrapper = styled.View`
  margin-top: 35;
  margin: 35px 20px;
  flex-direction: row;
  justify-content: center;
`

const PaymentMethodText = styled.Text`
  font-weight: 700;
  margin-right: 10px;
`

const MpLogo = styled.Image`
  width: 128px;
  height: 51px;
  flex-direction: row;
  justify-content: space-around;

`

export default connect(null, null)(backgorunPayment)