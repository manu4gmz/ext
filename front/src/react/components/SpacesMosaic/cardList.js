import React, { useState } from "react";

import {
  View,
  Image,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";

import styled from "styled-components/native";

export default function (spaces, onClick) {
    const star = require("../../../public/icons/star.png");
    const starFilled = require("../../../public/icons/star-filled.png");

    const handleClick = (space) => {
        onClick ? onClick(space) : () => {};  //: navigation.push("SingleView", {propertyId: space.id})
    }

    const {width: vw} = Dimensions.get("window");
    

    return spaces.map(space => 
      space.type != "ad" ?
    <TouchableWithoutFeedback key={space.id} onPress={() => handleClick(space)}>
      <Card vw={vw}>
        <CardBackground vw={vw} source={{uri:(space.photos || [])[0]}}>
          {
            space.verified ? 
            <View style={{ position: "absolute", top: 2, right: 2, zIndex: 9 }}>
              <Image source={require("../../../public/icons/verificado-ve.png")} style={{ width: 32, height: 32 }} />
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
      <Ad vw={vw}>
        <AdBackground source={{uri:space.photo }} vw={vw}>
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


const Card = styled.View`
  margin: 6px;
  border-radius: 12px;
  overflow: hidden;
  width: ${props => (props.vw / 2) - 24}px;
`

const CardBackground = styled.ImageBackground`
  width: 100%;
  height: ${props => props.vw*0.65}px;
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
  width: ${props => (props.vw / 2) - 24}px;
`

const AdBackground = styled.ImageBackground`
  width: 100%;
  height: ${props => props.vw*0.32}px;
  flex-direction: column;
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
`

const AdContent = styled.View`
  background-color: #1116289e;
  padding: 8px;
  flex: 1;
`

const AdSubtitle = styled.Text`
  font-size: 12px;
  color: white;
  margin-top: 12px;
`