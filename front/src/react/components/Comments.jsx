import React, { useState } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Button from "../ui/Button";

export default ({ space, handleCommentChange, handleSubmit, user, redirectToUser, redirectToLogin, handleResponseChange, handleResponse, comments, response, comment }) => {
  //Para saber si el usuario ya comento
  let existe = false

  if (space.userId == user.id && !comments.length) return <Centered><Tit>Todavia no hay comentarios!</Tit></Centered>;

  return (
    <ScrollView style={{ height: "100%", backgroundColor: '#E9E9E9' }}>
      <View style={{marginBottom: 36}}>
        <View>
          {comments
            ? comments.map((a, index) => {
              if (a.userId === user.id) { existe = true }
              return (
                <View key={index}>
                  <Card>
                    <TouchableOpacity onPress={() => redirectToUser(a.userId)}>
                      <OwnerLabel>{a.nombre || "Anonymous"}</OwnerLabel>
                    </TouchableOpacity>
                    <Text
                    >
                      {a.comment}
                    </Text>

                    {
                      a.response ?
                      <Respuesta>
                        <RtaBorder/>
                        <Text style={{flex: 1}}>
                          {a.response}
                        </Text>
                      </Respuesta>
                      :
                      (
                        space.userId === user.id ?
                          <View>
                            <CommentInput
                              name="comment"
                              multiline={true}
                              numberOfLines={response[index] ? 5 : 1}
                              placeholder="Responder"
                              
                              onChangeText={text => handleResponseChange(text, index)}
                              value={response[index] || ""}
                            />
                            {
                              response[index] ?
                              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }}>
                                <TouchableOpacity onPress={() => handleResponse(index)}>
                                  <SendResponse>Enviar Respuesta</SendResponse>
                                </TouchableOpacity>
                              </View>
                              : null
                            }
                          </View>
                          : null
                      )
                    }
                  </Card>

                </View>
              )
            })
            : null}
        </View>
        { 
          space.userId !== user.id ?
          (user.id ?
            (
              existe ?
                (
                  <CommentsAlert>
                    <Text> Ya comentaste en esta publicación </Text>
                  </CommentsAlert>
                )
                :
                (
                  <Card>
                    <View>
                      
                      <CommentInput
                        name="comment"
                        multiline={true}
                        placeholder="Escribe una opinión"
                        numberOfLines={comment ? 5 : 1}
                        value={comment}
                        onChangeText={text => handleCommentChange(text)}
                      />
                      <Button mt="12px" onPress={() => handleSubmit()}>Enviar</Button>
                    </View>
                  </Card>
                )
            )
            :
            <CommentsAlert>
              <Text>Para comentar esta publicacion <TouchableOpacity onPress={() => redirectToLogin()}><span style={{ textDecoration: 'underline' }}>ingresá a tu cuenta</span></TouchableOpacity></Text>
            </CommentsAlert>
          )
          : null
        }
      </View>
    </ScrollView >
  );
};

const Card = styled.View`
  background-color: #F7F7F7;
  margin: 6px 24px;
  border-radius: 5px;
  padding: 12px;
  box-shadow: 0px 5px 5px #c2c2c2;
`
const Respuesta = styled.View`

  margin-top: 5px;
  margin-top: 12px;
  padding: 6px 0px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const OwnerLabel = styled.Text`
  color: #4a94ea;
  font-weight: 700;
  margin-bottom: 2px;
`

const SendResponse = styled.Text`
  background-color: #4a94ea;
  color: white;
  padding: 6px 18px;
  align-self: flex-end;
  border-radius: 75px;
  margin-right: 0;
  line-height: 24px;
  margin-top: 12px;
  margin-left: auto;
`

const CommentInput = styled.TextInput`
  margin-top: 6px;
  background-color: #f7f7f7;
  border-bottom-width: 2px;
  border-bottom-color: #b8b8b8;
  padding: 2px;
`

const RtaBorder = styled.View`
  background-color: #4a94ea;
  width: 3px;
  height: 100%;
  margin-right: 12px;
  border-radius: 3px;
  min-height: 36px;
  align-self: flex-start;
`

const Centered = styled.View`
  flex-direction: row;
  justify-content: center;
  width: 100%;
  align-items: center;
`

const Tit = styled.Text`
  font-size: 20px;
  font-weight: 100;
  color: grey;
  margin-top: 80px;
`

const CommentsAlert = styled.View`
  background-color: #D9D5C8; 
  padding: 12px;
  margin-top: 12px;
`