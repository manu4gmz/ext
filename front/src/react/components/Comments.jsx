import React, { useState, useRef } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Button from "../ui/Button";
import FadeInView from "../components/FadeInView";

export default ({ space, handleCommentChange, handleSubmit, user, redirectToLogin, handleResponseChange, handleResponse, comments, response, comment }) => {
  //Para saber si el usuario ya comento
  let existe = false;
  const scrollView = useRef(null);

  function redirectToUser() {
    scrollView.current.scrollToEnd({animated: true});
  }

  if (space.userId == user.id && !comments.length) return <Centered><Tit>Todavia no hay comentarios!</Tit></Centered>;

  return (
    <ScrollView style={{ height: "100%", backgroundColor: '#E9E9E9' }} >
      <View style={{marginBottom: 36}}>
        <View>
          {comments
            ? comments.map((comment, index) => {
              //if (a.userId === user.id) { existe = true }
              return (
                <FadeInView key={index} order={index}>
                  <Card>
                    {
                      space.userId == user.id ?
                      <TouchableOpacity onPress={() => redirectToUser(comment.userId)} ref={scrollView}>
                        <OwnerLabel>{comment.name || "Anonymous"}</OwnerLabel>
                      </TouchableOpacity>
                      : <OwnerLabel>{comment.name || "Anonymous"}</OwnerLabel>
                    }
                    <Rating>{comment.rating || "-"}{" / 5"}</Rating>
                    <Text>
                      {comment.comment}
                    </Text>

                    {
                      comment.response ?
                      <Respuesta>
                        <RtaBorder/>
                        <Text style={{flex: 1}}>
                          {comment.response}
                        </Text>
                      </Respuesta>
                      :
                      (
                        space.userId === user.id ?
                          <View>
                            <CommentInput
                              name="comment"
                              multiline={true}
                              numberOfLines={response[comment.id] ? 5 : 1}
                              placeholder="Responder"
                              
                              onChangeText={text => handleResponseChange(text, comment.id)}
                              value={response[comment.id] || ""}
                            />
                            {
                              response[comment.id] ?
                              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-end" }}>
                                <TouchableOpacity onPress={() => handleResponse(comment.id)}>
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

                </FadeInView>
              )
            })
            : null}
        </View>
        { 
          space.userId !== user.id  && (space.rents || []).includes(user.id) && (user.rented || []).includes(space.id) ?
          (user.uid ?
            (
              false ?
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

const Rating = styled.Text`
  color: #c1c1c1;
  margin-bottom: 6px;
  font-size: 16px;
`