import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking
} from "react-native";


import { Rating } from 'react-native-elements';

import styled from "styled-components/native";
import Loading from "../components/Loading";
import Map from "../components/map";
import SpaceCard from "../components/SpaceCard";


function indexes(index, total) {
  let indexes = [];
  let start = index - 2 < 1 ? 1 : index - 2;
  if (total - 4 >= 1 && start + 3 >= total) start = total - 4;
  for (let i = start; i < start + 5 && i <= total; i++) indexes.push(i);
  return indexes;
}


function mapBadge(filter, remove) {
  const map = {
    v: _ => "Solo verificados",
    photos: _ => "Solo con fotos",
    t: val => val,
    p: val => val == "ciudad autónoma de buenos aires" ? "capital federal" : val,
    n: val => val,
    min: val => "Minimo $" + val,
    max: val => "Máximo $" + val,

  }

  return Object.keys(filter).map((key, i) => {
    const text = map[key](filter[key])

    return (
      <Badge key={i}>
        <TouchableOpacity onPress={() => remove(key)}>
          <BadgeRemove source={require("../../public/icons/cross.png")} />
        </TouchableOpacity>
        <BadgeText>{text}</BadgeText>
      </Badge>
    )
  })

}

export default ({ allSpaces, navigation, total, pages, user, setIndex, scrollView, index, sendId, filter, removeFilter, loading, showComments, markers, onReachedEnd, suggestions, advertisements }) => {
  const [mode, setMode] = useState(false);
  
  const star = require("../../public/icons/star.png");
  const starFilled = require("../../public/icons/star-filled.png");

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    //const paddingToBottom = 20;
    if ((allSpaces.length+suggestions.length) > 9 && layoutMeasurement.height + contentOffset.y >= contentSize.height - 400) {
      onReachedEnd();
    }
  };

  function mapSpaces (spaces) {
    return spaces.map(space => 
      space.type != "ad" ?
    <TouchableWithoutFeedback key={space.id} onPress={() => navigation.push("SingleView", {propertyId: space.id})}>
      <Card style={{shadowColor: "#000", shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.27, shadowRadius: 4.65, elevation: 6}}>
        <CardBackground source={{uri:(space.photos || [])[0]}}>
          {
            space.verified ? 
            <View style={{ position: "absolute", top: 2, right: 2, zIndex: 9 }}>
              <Image source={require("../../public/icons/verificado-ve.png")} style={{ width: 32, height: 32 }} />
            </View>
            : null
          }
          <CardContent>
            <Title>{space.title}</Title>
            <Subtitle>{space.neighborhood}</Subtitle>
            {
              space.rating != undefined && space.rating != null && !isNaN(space.rating) ?
              
              <View style={{flexDirection: "row", marginTop: 6}}>
              {
                new Array(5).fill(0).map((_,i) =>
                  i+1 <= Number(space.rating) ?
                  <Star source={starFilled}/> 
                  :
                  <Star source={star}/> 
                )
              }
              </View>
              : 
              null
            }
          </CardContent>
        </CardBackground>
      </Card>
    </TouchableWithoutFeedback>
    :
    <TouchableWithoutFeedback>
      <Ad>
        <AdBackground source={{uri:space.photo }}>
          <AdContent>
            <Title>{space.title}</Title>
            <AdSubtitle>
              {space.subtitle}
            </AdSubtitle>
          </AdContent>
        </AdBackground>
      </Ad>
    </TouchableWithoutFeedback>

    )
  }

  let usedAds = 0;
  console.log(advertisements);
  // console.log("favs", favs)
  return (
    <ScrollView ref={scrollView} 
      onScroll={({nativeEvent}) => {
        isCloseToBottom(nativeEvent)
      }}
      scrollEventThrottle={5}
    >
      <View>
        <ListaYMapa>
          <Lista active={!mode + ""} onPress={() => setMode(false)}>
            Lista
          </Lista>
          <Lista active={mode + ""} onPress={() => setMode(true)}>
            Mapa
          </Lista>
        </ListaYMapa>
      </View>

      {
        !loading ?

          !mode ? 
          <View style={{flex: 1}}>
          <ColumnsWrapper>
            <Column>
            {
              mapSpaces((()=>{
                let spaces = [];
                for (let i = 0; i < allSpaces.length; i+=2) {
                  if ((i+4)%5 == 0 && advertisements[usedAds]) {
                    spaces.push({ ...advertisements[usedAds], type: "ad" });
                    usedAds++;
                  }
                  spaces.push(allSpaces[i]);
                }
                return spaces;
              })())
              
            }
            </Column>
            <Column>
            {
              mapSpaces((()=>{
                let spaces = [];
                for (let i = 1; i < allSpaces.length; i+=2) {
                  if ((i-1)%5 == 0 && advertisements[usedAds]) {
                    spaces.push({ ...advertisements[usedAds], type: "ad" });
                    usedAds++;
                  }
                  spaces.push(allSpaces[i]);
                }
                return spaces;
              })())
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
                  mapSpaces((()=>{
                    let spaces = [];
                    for (let i = 0; i < suggestions.length; i+=2) {
                      if ((i+4)%5 == 0 && advertisements[usedAds]) {
                        spaces.push({ ...advertisements[usedAds], type: "ad" });
                        usedAds++;
                      }
                      spaces.push(suggestions[i]);
                    }
                    return spaces;
                  })())
                }
                </Column>
                <Column>

                {
                  mapSpaces((()=>{
                    let spaces = [];
                    for (let i = 1; i < suggestions.length; i+=2) {
                      if ((i-1)%5 == 0 && advertisements[usedAds]) {
                        spaces.push({ ...advertisements[usedAds], type: "ad" });
                        usedAds++;
                      }
                      spaces.push(suggestions[i]);
                    }
                    return spaces;
                  })())
                }
                </Column>
              </ColumnsWrapper>
            </View>
            : null
          }
          </View>
          :
          <Map navigation={navigation} allSpaces={{properties:allSpaces, markers}}></Map>

          : <Loading />
      }
    </ScrollView>
  );
};



const ColumnsWrapper = styled.View`
  margin: 0px auto;
  width: 100%;
  padding: 0 8px;
  max-width: 500px;
  flex-direction: row;
`


const Column = styled.View`
  flex: 1;
  flex-grow: 1;
  flex-direction: column;
`

const Card = styled.View`
  margin: 6px;
  border-radius: 12px;
  overflow: hidden;
`

const SuggestedTitle = styled.Text`
  font-weight: 300;
  font-size: 18px;
  margin: 36px 12px 24px;
`

const CardBackground = styled.ImageBackground`
  width: 100%;
  height: 240px;
  flex-direction: column;
  justify-content: flex-end;

`



const CardContent = styled.View`
  align-self: flex-end;
  margin: 0 6px 12px;
  width: 100%;
  padding-left: 18px;
`

const Title = styled.Text`
  color: white;
  text-align: left;
  font-size: 15px;
  text-shadow: -1px 1px 5px rgba(0, 0, 0, 0.75);

`

const Subtitle = styled.Text`
  color: white;
  text-align: left;
  font-size: 12px;
  font-weight: 100;
  text-transform: capitalize;
  text-shadow: -1px 1px 5px rgba(0, 0, 0, 0.75);

`

const ListaYMapa = styled.View`
  background-color: #4a94ea;
  flex-direction: row;
  box-shadow: 0px 1px 20px grey;
`



const Lista = styled.Text`
  color: ${props => (props.active == "true" ? "white" : "#000144")};
  align-self: center;
  font-size: 18px;
  justify-content: center;
  text-align: center;
  padding-bottom: 5px;
  border-color: ${props => (props.active == "true" ? "white" : "#4A94EA")};
  border-bottom-width: 3px;
  width: 50%;
`

const Star = styled.Image`
  width: 14px;
  height: 14px;
  margin: 2px;
  margin-left: 0px;
`

const Ad = styled.View`
  margin: 6px;
  border-radius: 12px;
  overflow: hidden;
  border: solid 4px #4a94ea;
`


const AdBackground = styled.ImageBackground`
  width: 100%;
  height: 120px;
  flex-direction: column;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`

const AdContent = styled.View`
  background-color: #1116289e;
  padding: 8px;
  flex-wrap: wrap;
  flex: 1;
`

const AdSubtitle = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 12px;
`