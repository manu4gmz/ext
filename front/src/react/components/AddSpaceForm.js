import React from 'react'
import { connect } from 'react-redux'

import { StyleSheet, Text, Image, ScrollView } from 'react-native'
import styled from "styled-components/native";
import Button from "../ui/Button";

const backgroundHome = ({ navigation, Onsubmit }) => {
  return (
    <ScrollView>
      <Wrapper>
        <StyledView>
          <StyledText>Datos del espacio</StyledText>
          <View style={styles.lineStyle}></View>
          <View>
            <StyledTitles>Ciudad*</StyledTitles>
            <StyledInput
              placeholder=' Buenos Aires , Cordoba , San Luis..'
            />
          </View>

          <View>
            <StyledTitles>Barrio*</StyledTitles>
            <StyledInput
              placeholder=' Palermo , Flores , Saavedra..'
            />
          </View>

          <View>
            <StyledTitles>Tipo de Espacio*</StyledTitles>
            <StyledInput
              placeholder=' Salon, Oficina , Habitacion , Quinta , Taller..'
            />
          </View>

          <DoubleWraper >
            <View style={styles.doubleView}>
              <StyledTitles>Tamano <SmallText>(mtr2)</SmallText>*</StyledTitles>
              <StyledInput
                style={{ marginRight: 5 }}
                placeholder=' Palermo , Flores...'
              />
            </View>

            <View style={styles.doubleView}>
              <StyledTitles>Capacidad*</StyledTitles>
              <StyledInput
                style={{ marginLeft: 5 }}
                placeholder=' Salon, Oficina...'
              />
            </View>
          </DoubleWraper>

          <View>
            <StyledTitles>Caracteristicas*</StyledTitles>
            <StyledInput
              placeholder=' Wifi, Cafe, Snacks, TV, Aire Acond..'
            />
          </View>

          <View>
            <StyledTitles>Observaciones</StyledTitles>
            <StyledInput
              placeholder=' Aclaraciones, Horarios...'
            />
          </View>

          <DoubleWraper >
            <View style={styles.doubleView}>
              <StyledTitles>  Valor hora ($)</StyledTitles>
              <StyledInput
                style={{ marginRight: 5 }}
                placeholder=' $560'
              />
            </View>

            <View style={styles.doubleView}>
              <StyledTitles>  Tasa limpieza ($)*</StyledTitles>
              <StyledInput
                style={{ marginLeft: 5 }}
                placeholder=' $180'
              />
            </View>
          </DoubleWraper>

          <View>
            <StyledTitles>Agregar Fotos</StyledTitles>
            <Button
              bg="#4A94EA"
              color="#F7F7F7"
            > <Image
                style={{ width: '30px', height: '30px' }}
                source={require('../../public/icons/lcd.png')}
              />
            </Button>
          </View>

          <View>
            <StyledTitles>Reglas de Convivencia</StyledTitles>
            <StyledInput
              placeholder=' Limites, reglas del lugar...'
            />
          </View>

          <View>
            <Button
              bg="#F77171"
              color="#F7F7F7"
              mt="4%"
              onPress={Onsubmit}
            > Ofrecer
          </Button>
          </View>
        </StyledView>
      </Wrapper >
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: 10,
    marginTop: 10
  },

  doubleView: {
    flexGrow: 1,
    width: 50
  }
});

const Wrapper = styled.View`
  flex : 1;
  margin: 0px 10px;
`
const StyledView = styled.View`
  margin: 10px 0;
  background-color: #F7F7F7;
  padding : 20px 20px 15px;
  border-radius: 10px
`
const StyledTitles = styled.Text`
color : #000144;
text-transform: uppercase;
padding-left : 3%;
`
const StyledText = styled.Text`
color : #262626;
padding-left : 3%;
`
const SmallText = styled.Text`
color : #262626;
font-size : 12px;
`
const StyledInput = styled.TextInput`
color : #262626;
padding-left : 3%;
height: 40px;
border-color: #E9E9E9;
border-radius : 5px;
border-width: 1px;
margin : 2% 0;
`
const DoubleWraper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`
const View = styled.View`
margin : 2% 0;
`


export default connect(null, null)(backgroundHome)





