import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  StyleSheet,
  Dimensions,
} from "react-native";


import { Rating } from 'react-native-elements';

import styled from "styled-components/native";
import Loading from "../../components/Loading";
import Map from "../../components/map";

import cardList from "./cardList";

import {ColumnsWrapper, Column, SuggestedTitle} from "./column";


export default ({ allSpaces, navigation, total, pages, setIndex, scrollView, index, filter, removeFilter, suggestions, advertisements }) => {

  let usedAds = 0;
  console.log(advertisements);
  // console.log("favs", favs)
  return <View style={{flex: 1}}>
    <ColumnsWrapper>
      <Column>
        {
          cardList((()=>{
            let spaces = [];
            for (let i = 0; i < allSpaces.length; i+=2) {
              if ((i+4)%5 == 0 && advertisements[usedAds]) {
                spaces.push({ ...advertisements[usedAds], type: "ad" });
                usedAds++;
              }
              spaces.push(allSpaces[i]);
            }
            return spaces;
          })(), (space) => navigation.push("SingleView", {propertyId: space.id}))
          
        }
      </Column>
      <Column>
        {
          cardList((()=>{
            let spaces = [];
            for (let i = 1; i < allSpaces.length; i+=2) {
              if ((i-1)%5 == 0 && advertisements[usedAds]) {
                spaces.push({ ...advertisements[usedAds], type: "ad" });
                usedAds++;
              }
              spaces.push(allSpaces[i]);
            }
            return spaces;
          })(), (space) => navigation.push("SingleView", {propertyId: space.id}))
        }
      </Column>
    </ColumnsWrapper>
    {
      suggestions.length ?
      <View style={{flex: 1, flexDirection: "column"}}>
        <SuggestedTitle>Otros espacios que podrían interesarte</SuggestedTitle>

        <ColumnsWrapper>

          <Column>
          {
            cardList((()=>{
              let spaces = [];
              for (let i = 0; i < suggestions.length; i+=2) {
                if ((i+4)%5 == 0 && advertisements[usedAds]) {
                  spaces.push({ ...advertisements[usedAds], type: "ad" });
                  usedAds++;
                }
                spaces.push(suggestions[i]);
              }
              return spaces;
            })(), (space) => navigation.push("SingleView", {propertyId: space.id}))
          }
          </Column>

          <Column>
          {
            cardList((()=>{
              let spaces = [];
              for (let i = 1; i < suggestions.length; i+=2) {
                if ((i-1)%5 == 0 && advertisements[usedAds]) {
                  spaces.push({ ...advertisements[usedAds], type: "ad" });
                  usedAds++;
                }
                spaces.push(suggestions[i]);
              }
              return spaces;
            })(), (space) => navigation.push("SingleView", {propertyId: space.id}))
          }
          </Column>
        </ColumnsWrapper>
      </View>
    : null
    }
  </View>
};

