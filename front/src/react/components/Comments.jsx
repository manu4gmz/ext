import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, Button, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export default ({ space, handleCommentChange, handleSubmit, user, redirectToUser, redirectToLogin, handleResponseChange, handleResponse, comments }) => {
  //Para saber si el usuario ya comento
  let existe = false

  return (
    <ScrollView style={{ height: "100%", backgroundColor: '#E9E9E9' }}>
      <View>
        <View>
          {comments
            ? comments.map((a, index) => {
              if (a.userId === user.id) { existe = true }
              return (
                <View key={index}>
                  <Card>
                    <TouchableOpacity onPress={() => redirectToUser(a.userId)}>
                      <Text style={{ fontWeight: "bold", textDecorationLine: "underline" }}>
                        {a.nombre || "Anonymous"}
                      </Text>
                    </TouchableOpacity>
                    <Text
                    >
                      {a.comment}
                    </Text>

                    {a.response ?
                      (<Respuesta>
                        <Text>
                          {a.response}
                        </Text>
                      </Respuesta>)
                      :
                      (
                        space.userId === user.id ?
                          (
                            <View>
                              <TextInput
                                name="comment"
                                multiline={true}
                                numberOfLines={2}
                                style={{
                                  marginBottom: 6,
                                  backgroundColor: '#E9E9E9',
                                  borderBottomWidth: 1,
                                  borderBottomColor: '000',
                                  padding: 6
                                }}
                                onChangeText={text => handleResponseChange(text)}
                              ></TextInput>
                              <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleResponse(index)} style={{ marginRight: 0, marginLeft: 'auto' }}>
                                  <Text>Responder</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          )
                          :
                          null
                      )}

                  </Card>

                </View>
              )
            })
            : null}
        </View>
        { user.id ?
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
                        color: '#000144',
                        paddingBottom: 10
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
  background-color: #F7F7F7;
  margin: 12px;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0px 3px 3px #c2c2c2;
`
const Respuesta = styled.View`
border-left-style:solid;
border-left-color: black;
border-left-width: 1px;
padding-left: 10px;
margin-left: 10px;
margin-top: 5px;
`