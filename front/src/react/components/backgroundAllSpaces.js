import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";

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

export default ({ allSpaces, navigation, total, pages, user, setIndex, scrollView, index, sendId, filter, removeFilter, loading, showComments, markers }) => {
  const [mode, setMode] = useState(false);

  // console.log("favs", favs)
  return (
    <ScrollView ref={scrollView}>
      <View>
        <ListaYMapa>
          <Lista active={!mode + ""} onPress={() => setMode(false)}>
            Lista
          </Lista>
          <Lista active={mode + ""} onPress={() => setMode(true)}>
            Mapa
          </Lista>
        </ListaYMapa>

        {
          !mode ?
          <BadgeWrapper>
            {
              mapBadge(filter, removeFilter)
            }
          </BadgeWrapper> : null
        }
        {
          !loading && !mode ?
            <TextoBusquedas>
              {`${total} espacios encontrados`}
            </TextoBusquedas> : null
        }
      </View>

      {
        !loading ?

          !mode ? <Wrapper>
            {allSpaces.map((espacio, index) => <SpaceCard key={index} {...({espacio, user, index, navigation, showComments, sendId})}/>)}
            <PaginationWrapper>
              {
                index > 1 ?
                  <TouchableOpacity onPress={() => setIndex(index - 1)}>
                    <PaginationText>Anterior</PaginationText>
                  </TouchableOpacity> : null
              }
              {
                indexes(index, pages).map((i) => (
                  <TouchableOpacity key={i} onPress={() => setIndex(i)}>
                    <PaginationText bold={(index == i) + ""}>{i}</PaginationText>
                  </TouchableOpacity>
                ))
              }
              {
                index < pages ?
                  <TouchableOpacity onPress={() => setIndex(index + 1)}>
                    <PaginationText>Siguiente</PaginationText>
                  </TouchableOpacity> : null
              }
            </PaginationWrapper>
          </Wrapper>
          :
          <Map navigation={navigation} allSpaces={{properties:allSpaces, markers}}></Map>

          : <Loading />
      }
    </ScrollView>
  );
};

const ListaYMapa = styled.View`
  background-color: #4a94ea;
  flex-direction: row;
  box-shadow: 0px 1px 20px grey;
`

const Wrapper = styled.View`
  flex: 1;
  margin: 0px auto;
  width: 100%;
  padding: 0 8px;
  max-width: 500px;
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
const TextoBusquedas = styled.Text`
  font-size: 18px;
  text-align : center;
  color: black;
  font-weight: 600;
`;

const PaginationWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`;

const PaginationText = styled.Text`
  font-size: 14px;
  color: #4082d1;
  padding: 10px;
  font-weight: ${p => p.bold == "true" ? 700 : 100};
`;

const Badge = styled.View`
  height: 24px;
  background-color: #F77171;
  padding: 4px;
  border-radius: 6px;
  flex-direction: row;
  margin-bottom: 6px;
  margin-right: 6px;
`;

const BadgeText = styled.Text`
  font-size: 12px;
  color:white;
  line-height: 16px;
  flex: 1;
  text-transform: capitalize;
  margin-right: 4px;
`;
const BadgeRemove = styled.Image`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`;
const BadgeWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 12px;
  margin-bottom: 12px;
  margin-left: 12px;
  flex-wrap: wrap;
`;
