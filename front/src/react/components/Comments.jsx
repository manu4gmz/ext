import React, { useState, useRef } from "react";
import { Text, View, ScrollView, TextInput, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Button from "../ui/Button";
import FadeInView from "../components/FadeInView";
import { Rating } from 'react-native-elements';

export default ({ space, handleCommentChange, handleSubmit, user, redirectToLogin, handleResponseChange, handleResponse, comments, response, comment, setResponseComment, setRating, rating }) => {
  //Para saber si el usuario ya comento
  let existe = false;
  const scrollView = useRef(null);

  function handleClickComment(comment) {
    setResponseComment(comment);
    setTimeout(()=>scrollView.current.scrollToEnd({animated: true}), 100);
  }


  //if (space.userId == user.id && !comments.length) return <Centered><Tit>Todavia no hay comentarios!</Tit></Centered>;

  return (
    <ScrollView style={{ height: "100%", backgroundColor: '#E9E9E9' }} ref={scrollView}>
      <View style={{marginBottom: 36}}>
        <View>
          {comments && comments.length ? 
            comments.map((comment, index) => {
              if (comment.author === user.id) existe = true;
              return (
                <FadeInView key={index} order={index/2}>
                  <Card>
                    {
                      space.userId == user.id && !comment.response?
                      <TouchableOpacity onPress={() => handleClickComment(comment)}>
                        <OwnerLabel>{comment.name || "Anonymous"}</OwnerLabel>
                      </TouchableOpacity>
                      : <OwnerLabel>{comment.name || "Anonymous"}</OwnerLabel>
                    }
                    {
                      comment.date ?
                      <Text style={{fontSize: 12, color: "#AAA", marginBottom: 6}}>
                        {
                          (()=>{
                            let date = new Date(comment.date);

                            return `${date.getDate()}/${date.getMonth()}` + (date.getFullYear() != new Date().getFullYear() ? `/${date.getFullYear}` : "" )
                          })()
                        }
                      </Text>
                      : null
                    }
                    {
                      !isNaN(comment.rating) ?
                      <Rating
                      readonly
                      imageSize={14}
                      type='custom'
                      ratingColor={"#4a94ea"}
                      tintColor={"#FFFFFF"}
                      startingValue={ Number(comment.rating)}
                      style={{ paddingVertical: 10, alignItems: "flex-start" }}
                      />
                      : null
                    }
                    <Text style={{fontSize: 16}}>
                      {comment.comment}
                    </Text>

                    {
                      comment.response ? <View>
                        <Bold style={{marginTop: "24px"}}>Respuesta del dueño</Bold>
                        <Text style={{flex: 1, paddingTop: 6, paddingBottom: 0 }}>
                          {comment.response}
                        </Text>
                      </View>
                      :
                      (
                        space.userId === user.id ?
                          <View>
                            {/* <CommentInput
                              name="comment"
                              multiline={true}
                              numberOfLines={response[comment.id] ? 5 : 1}
                              placeholder="Responder"
                              
                              onChangeText={text => handleResponseChange(text, comment.id)}
                              value={response[comment.id] || ""}
                            />
                            {
                              response[comment.id] ?
                              <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "flex-start" }}>
                                <TouchableOpacity onPress={() => handleResponse(comment.id)}>
                                  <SendResponse>Enviar Respuesta</SendResponse>
                                </TouchableOpacity>
                              </View>
                              : null
                            } */}
                          </View>
                          : null
                      )
                    }
                  </Card>

                </FadeInView>
              )
            })
            : <Centered>
                <Tit>Todavia no hay comentarios!</Tit>
              </Centered>
          }
        </View>
        { 
          (space.userId !== user.id  && (space.rents || []).includes(user.id) && (user.rented || []).includes(space.id)) || response.id ?
          (user.uid ?
            (
              existe && !response.id ?
                (
                  <CommentsAlert>
                    <Text> Ya comentaste en esta publicación </Text>
                  </CommentsAlert>
                )
                :
                (
                  <Card>
                    <View>
                      {
                        response.id ? <View>
                          <Text>En respuesta a "{response.comment}"</Text>
                        </View>
                        : (
                          comment ?
                          <Rating
                            imageSize={25}
                            minValue={1}
                            type='custom'
                            ratingColor={"#4a94ea"}
                            tintColor={"#FFFFFF"}
                            onFinishRating={setRating}
                            style={{ paddingVertical: 10, alignItems: "flex-start" }}
                          />
                          : null
                        )
                      }
                      <CommentInput
                        name="comment"
                        multiline={true}
                        placeholder={response.id ? "Escriba su respuesta" : "Escribe una opinión" }
                        numberOfLines={(comment || response.response) ? 5 : 1}
                        value={response.id ? response.response : comment }
                        onChangeText={text => handleCommentChange(text)}
                      />
                      {
                        
                        (comment && rating) || (response.id && response.response) ? 
                          <Button mt="12px" onPress={() => handleSubmit()}>Enviar</Button>
                          : <Button mt="12px">Enviar</Button>
                      }
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
  background-color: #FFFFFF;
  margin: 6px 24px;
  border-radius: 5px;
  padding: 12px;
  box-shadow: 0px 5px 5px #c2c2c2;
`


const Bold = styled.Text`
  font-weight: 500;
` 

const OwnerLabel = styled.Text`
  /* color: #4a94ea; */
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
  background-color: #FFFFFF;
  border-bottom-width: 2px;
  border-bottom-color: #b8b8b8;
  padding: 2px;
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

const RatingLabel = styled.Text`
  color: #c1c1c1;
  margin-bottom: 6px;
  font-size: 16px;
`