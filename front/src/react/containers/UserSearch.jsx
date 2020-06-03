import React, {useEffect, useState} from "react";
import {View, Text, Image, ScrollView} from "react-native";
import styled from "styled-components/native";
import Button from "../ui/Button";
import Loading from "../components/Loading";
import { searchUsers, requestSpaceConfirmation } from '../../redux/actions/user';

import Modal from "../components/Modal";

export default function ({navigation, route}) {

    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("")

    useEffect(() => {
        if (input.length < 4) return setUser({});
        setLoading(true);
        searchUsers(input)
            .then(setUser)
            .then(()=>setLoading(false));
    },[input])
    
    const { Modal: Register, call, hide } = Modal(useState(null));

    function getConfirmation() {

        requestSpaceConfirmation(route.params.propertyId, user.uid)
        .then(()=>{
            navigation.pop();
        })
        .catch(setError)
    }

    return (
        <View style={{height: "100%"}}>
          <Register/>
          <ScrollView>
            <Wrapper>
                <Title>Registrar inquilino</Title>
                <SearchBar onChangeText={setInput} value={input} placeholder={"Busca aquí"}/>
              {loading ?
                <Loading/> :
                <UserWrapper>
                    <Text>{user.email}</Text>
                </UserWrapper>
              }
              {
                user.uid ? <View>
                    <Text>
                        ¿Estás seguro de que quiere notificar al usuario para confirmar su estadía en tu espacio?
                    </Text>
                    {
                        error ? <Error>Hubo un error enviando la confirmación</Error> : null
                    }
                    <Button mt={"20px"} onPress={getConfirmation}>Confirmar</Button>
                </View> : null
            }
            </Wrapper>
          </ScrollView>
        </View>
      )

}

function UserCard({user, input, call}) {
    let last = <Text>{user.lastName}</Text>, 
        first = <Text>{user.firstName}</Text>, 
        email = <Text>{user.email}</Text>;

    if (user.match == "firstName")  first = <Text><Strong>{user.firstName.slice(0,input.length)}</Strong>{user.firstName.slice(input.length,user.firstName.length)}</Text>;
    else if (user.match == "lastName") last  = <Text><Strong>{user.lastName.slice(0,input.length)}</Strong>{user.lastName.slice(input.length,user.lastName.length)}</Text>;
    else if (user.match == "fullName") {
    first = <Strong>{user.firstName}</Strong>;
    last = <Text><Strong>{user.lastName.slice(0, input.length-user.firstName.length-1)}</Strong>{user.lastName.slice(input.length-user.firstName.length-1,user.lastName.length)}</Text>;
    }
    else if (user.match == "email") {
        email = <Text><Strong>{user.email.slice(0,input.length)}</Strong>{user.email.slice(input.length,user.email.length)}</Text>;
    }

    function callModal () {
        console.log("eu")
        call(()=>{
            <FullName>{user.firstName}</FullName>

        })

    }

    return <UserWrapper onPress={callModal}>
        <FullName>{first} {last}</FullName>
        <Text>{email}</Text>
    </UserWrapper>



}

const Wrapper = styled.View`
  margin: 0px auto;
  width: 100%;
  padding: 0 8px;
  max-width: 500px;
`

const SearchBar = styled.TextInput`
    padding: 12px;
    border-radius: 36px;
    border: solid 1px #DDD;
    margin-bottom: 12px;
    margin-top: 12px;
`

const FullName = styled.Text`
    font-size: 14px;
`

const Strong = styled.Text`
    font-weight: 700;
`

const UserWrapper = styled.TouchableOpacity`

    padding: 6px 12px;
    margin: 6px 0;

`

const Title = styled.Text`
    font-weight: 500;
    font-size: 20px;
`

const Error = styled.Text`
    color: red;
`

