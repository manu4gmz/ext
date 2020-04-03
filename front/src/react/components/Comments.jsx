import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TextInput, Button } from "react-native";

export default ({ space, handleCommentChange, handleSubmit }) => {
  return (
    <ScrollView>
      <View>
        <Text
          style={{
            fontSize: 20,
            borderBottomColor: "black",
            borderBottomWidth: 5
          }}
        >
          Comentarios:
        </Text>
        {space.comments
          ? space.comments.map(a => (
              <View key={a.userId}>
                <Text
                  style={{ borderBottomColor: "black", borderBottomWidth: 1 }}
                >
                  {a.comment}
                </Text>
              </View>
            ))
          : null}
        <View>
          <Text
            style={{
              fontSize: 20,
              borderBottomColor: "black",
              borderBottomWidth: 5
            }}
          >
            Escribi tu comentario:
          </Text>
          <TextInput
            name="comment"
            onChangeText={text => handleCommentChange(text)}
          ></TextInput>
          <Button title="submit" onPress={() => handleSubmit()}>
            Submit
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
