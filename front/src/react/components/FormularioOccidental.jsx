import React from 'react'
import styled from 'styled-components/native'
import { View, Text } from 'react-native'
import Boton from '../ui/Button'


export default ({ alerta, user, handlerNombre, handlerApellido, handlerTel, handlerDireccion, nombre, apellido, tel, direccion, submit
}) => {
  console.log(user, "Aca esta el usuario ")
  return (
    <Wrapper >
      <StyledView
        style={{ shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6 }}
      >
        <ViewInfo>
          <ViewInput>

            <StyledTitles>Nombre*</StyledTitles>
            <StyledInput
              value={nombre}
              onChangeText={(nombre) => (handlerNombre(nombre))}
            />

          </ViewInput>

          <ViewInput>
            <StyledTitles>Apellido*</StyledTitles>
            <StyledInput
              value={apellido}
              onChangeText={(apellido) => (handlerApellido(apellido))}

            />

          </ViewInput>

          <ViewInput>
            <StyledTitles>Teléfono Móvil de contacto*</StyledTitles>
            <StyledInput
              value={tel}
              placeholder={"+549-11-5555-5555"}
              onChangeText={(tel) => (handlerTel(tel))}

            />
          </ViewInput>

          <ViewInput>
            <StyledTitles>Dirección*</StyledTitles>
            <StyledInput
              value={direccion}
              placeholder={"Av Congreso 1332"}
              onChangeText={(dir) => (handlerDireccion(dir))}

            />
          </ViewInput>
        </ViewInfo>

      </StyledView>
      <ViewButton>
        <Boton
          onPress={() => { submit() }}
          bg="#4A94EA"
          color="#F7F7F7"
          mt="5px"
        >Mas Info.
       </Boton>

      </ViewButton>
      {alerta ? (<AlertaTexto>¡Cuidado! Verifique su contenido...</AlertaTexto>) : (null)}




    </Wrapper>
  )
}


const ViewInput = styled.View`
  margin-bottom:5px;
`
const ViewButton = styled.View`
  margin-bottom:8px;
`
const StyledTitles = styled.Text`
  color : #000144;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 12px;
`
const AlertaTexto = styled.Text`
  color: #c70039;
  text-align:center;

`
const ViewInfo = styled.View`
padding: 18px;
`



const StyledInput = styled.TextInput`
  padding-left : 3%;
  height: 35px;
  line-height: 20px;
  border-radius: 5px;
  margin : 5px 0;
  text-transform: capitalize;
  background-color: white;
  color : ${props => props.error == "true" ? "red" : "#262626"};
  border: solid 1px ${props => props.error == "true" ? "red" : "#bfbfbf"};

`

const Label = styled.Text`
	height: 36px;
	font-size: 16px;
	line-height: 36px;
	text-transform: capitalize;
`
const TextOption = styled(Label)`
	font-size: 12px;
	color: #b2b2b2;
	text-transform: none;
`
const Divider = styled.View`
  height: 1px;
  width: 100%;
  background-color: #b2b2b2;
  margin-bottom: 10px;
`


const Option = styled.TouchableOpacity`
`

const Error = styled.Text`
  color: red;  
`
const BadgeWrapper = styled.View`
width: 51px;
justify-content: center;
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

const Tick = styled.Image`
	width: 21px;
	height: 21px;
	border-radius: 50px;
	align-self: center;
	background-color: #4A94EA;
`


const Badge = styled.Text`
	width: 21px;
	height: 21px;
	border-radius: 50px;
	background-color: ${props => props.showed == "true" ? "#4A94EA" : "white"};
	border: ${props => props.showed == "true" ? "none" : "solid 1px #b2b2b2"};
	color: ${props => props.showed == "true" ? "white" : "#b2b2b2"};
	font-size: 12px;
	line-height: 21px;
	align-self: center;
	text-align: center;
`