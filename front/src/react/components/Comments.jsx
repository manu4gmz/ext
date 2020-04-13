import React from "react";
import { Text, View, ScrollView, TextInput, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default ({ space, handleCommentChange, handleSubmit, user, redirectToUser, redirectToLogin }) => {
  //Para saber si el usuario ya comento
  let existe = false

  return (
    <ScrollView style={{ height: "100%", backgroundColor: "#F7F7F7" }}>
      <View>
        <View>
          {space.comments
            ? space.comments.map((a, index) => {
              if (a.userId === user.id) { existe = true }
              return (
                <Card key={index}>
                  <TouchableOpacity onPress={() => redirectToUser(a.userId)}>
                    <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                      {a.nombre || "Anonymous"}
                    </Text>
                  </TouchableOpacity>
                  <Text
                  >
                    {a.comment}
                  </Text>
                </Card>
              )
            })
            : null}
        </View>
        {user ?
          (
            existe ?
              (
                <View style={{ backgroundColor: "#D9D5C8", padding: 12 }}>
                  <Text> Ya comentaste en esta publicación </Text>
                </View>
              )
              :

              (
                <Card>
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#000144'
                      }}
                    >
                      Escribi tu comentario:
                </Text>
                    <TextInput
                      name="comment"
                      multiline={true}
                      numberOfLines={2}
                      style={{
                        marginBottom: 6,
                        backgroundColor: '#fff',
                        borderWidth: 1,
                        borderColor: '#000144',
                        padding: 6
                      }}
                      onChangeText={text => handleCommentChange(text)}
                    ></TextInput>
                    <Button color="#000144" title="submit" onPress={() => handleSubmit()}>
                      submit
                </Button>
                  </View>
                </Card>
              )
          )
          :
          <View style={{ backgroundColor: "#D9D5C8", padding: 12 }}>
            <Text>Para comentar esta publicacion <TouchableOpacity onPress={() => redirectToLogin()}><span style={{ textDecoration: 'underline' }}>ingresá a tu cuenta</span></TouchableOpacity></Text>
          </View>
        }
      </View>
    </ScrollView >
  );
};

const Card = styled.View`
  background-color: #E9E9E9;
  margin: 12px;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 3px 3px #c2c2c2;
`