import React from 'react'
import styled from 'styled-components/native'
import { View, Button } from 'react-native'

export default ({ onSubmit, user, handlerNombre, handlerApellido, handlerTel, handlerEmail, handlerDireccion, nombre, apellido, tel, direccion, email, submit
}) => {
  console.log(user, "Aca esta el usuario ")
  return (
    <View style={{ zIndex: 1 }}>
      <View>
        <StyledTitles>Nombre*</StyledTitles>
        <StyledInput
          value={nombre}
          onChangeText={(nombre) => (handlerNombre(nombre))}
        />
      </View>

      <View>
        <StyledTitles>Apellido*</StyledTitles>
        <StyledInput
          value={apellido}
          onChangeText={(apellido) => (handlerApellido(apellido))}

        />

      </View>

      <View>
        <StyledTitles>Teléfono Móvil de contacto*</StyledTitles>
        <StyledInput
          value={tel}
          placeholder={"+549-11-5555-5555"}
          onChangeText={(tel) => (handlerTel(tel))}

        />
      </View>

      <View>
        <StyledTitles>Mail*</StyledTitles>
        <StyledInput
          value={email}
          defaultValue={user.email}
          onChangeText={(email) => (handlerEmail(email))}

        />
      </View>

      <View>
        <StyledTitles>Dirección*</StyledTitles>
        <StyledInput
          value={direccion}
          placeholder={"Av. Congreso 1332"}
          onChangeText={(dir) => (handlerDireccion(dir))}

        />
      </View>
      <Button onPress={submit} title="enviar" />
    </View>
  )
}

const StyledTitles = styled.Text`
  color : #000144;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: 12px;
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


const Option = styled.TouchableOpacity`
`

const Error = styled.Text`
  color: red;  
`