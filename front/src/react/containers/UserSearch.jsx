import React, {useEffect, useState} from "react";
import {View, Text, Image, ScrollView} from "react-native";
import styled from "styled-components/native";

import Loading from "../components/Loading";
import { searchUsers } from '../../redux/actions/user';

import Modal from "../components/Modal";

export default function () {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("")

    useEffect(() => {
        if (input.length < 3) return setUsers([]);
        setLoading(true);
        searchUsers(input)
            .then(setUsers)
            .then(()=>setLoading(false));
    },[input])
    
    const { Modal: Register, call, hide } = Modal(useState(null));


    return (
        <View style={{height: "100%"}}>
          <Register/>
          <ScrollView>
            <Wrapper>
                <SearchBar onChangeText={setInput} value={input} placeholder={"Busca aquí"}/>
              {loading ?
                <Loading/> :
                (users.map((user, index) => (
                    <UserCard user={user} key={index} input={input} call={call}/>
                )))
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