import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
//import BackgroundAllSpaces from "../components/backgroundAllSpaces";
import { fetchSpaces, fetchMoreSpaces } from "../../redux/actions/spaces";
import Loading from "../components/Loading";
import Map from "../components/map";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import SpacesMosaic from "../components/SpacesMosaic/index";
import styled from "styled-components/native";
import { Animated, Easing } from "react-native";

import { FlingGestureHandler, Directions } from "react-native-gesture-handler";

function AllSpaces({
  spaces,
  user,
  navigation,
  deleteFav,
  addFav,
  deleteFavs,
  route,
  fetchSpaces,
  state,
  fetchFavs,
  fetchMoreSpaces 
}) {

  const scrollView = useRef(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(2);
  const [oldPos, setOldPos] = useState(0);

  //const [spaces, setSpaces] = useState({ properties: [], total: 0, pages: 0 });

  const [ mode, setMode ] = useState(false);

  useEffect(() => {
    fetchSpaces(route.params.query)
    .then(data => {
      setLoading(false);
    });
  }, [])

  function sendId(id) {
    return navigation.navigate(`SingleView`, { propertyId: id })
  }

  function showComments(id) {
    return navigation.navigate(`Comments`, { propertyId: id })
  }

  const { height: vh, width: vw } = Dimensions.get("window");

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    //const paddingToBottom = 20;
    if ((spaces.properties.length + spaces.suggestions.length) > 9 && layoutMeasurement.height + contentOffset.y >= contentSize.height - 400) {
      endlessScrolling();
    }
  };

  function endlessScrolling () {
    if (page > spaces.pages) return;
    fetchMoreSpaces(route.params.query, page);
    setPage(i => i+1);
  }

  function removeFilter(key) {
    const { query } = route.params;
    delete query[key];

    setLoading(true);
    fetchSpaces(query, 1)
      .then(data => {
        setLoading(false);
        setSpaces(data);
      });

  }

  const [leftAnim] = useState(new Animated.Value(0))

	useEffect(()=>{
		Animated.timing(leftAnim,{
			toValue: +mode,
			duration: 300,
		}).start();
  },[mode]);



  return (
    <View style={{flex:1}}> 
      <Header>
        <HeaderRow>
          <Lista active={!mode + ""} onPress={() => setMode(false)}>
            Lista
          </Lista>
          <Lista active={mode + ""} onPress={() => setMode(true)}>
            Mapa
          </Lista>
        </HeaderRow>
        <Animated.View
          style={{
            transform: [{
              translateX: leftAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, vw/2]  // 0 : 150, 0.5 : 75, 1 : 0
              }),
            }],
          }}>
          <SelectedLine />
        </Animated.View>
      </Header>
      {
        mode ? <Map 
          navigation={navigation}
          allSpaces={{properties:spaces.properties, markers: spaces.markers}}
          setMode={setMode}
        /> : null
      }
      <Animated.ScrollView 
        ref={scrollView}
        onScroll={({nativeEvent}) => {
          isCloseToBottom(nativeEvent)
        }}
        scrollEventThrottle={5}
        style={{
          flex: 1,
          opacity: leftAnim.interpolate({
            inputRange: [0,1],
            outputRange: [1, 0]
          }),
          backgroundColor: 'rgba(255,255,255,0.61)',
          transform: [{
            translateX: leftAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -vw]  // 0 : 150, 0.5 : 75, 1 : 0
            }),
          }],
        }}>
        {
          !loading ?
          <SpacesMosaic
          allSpaces={spaces.properties}
          markers={spaces.markers}
          user={user}
          total={spaces.total}
          pages={spaces.pages}
          navigation={navigation}
          sendId={sendId}
          index={route.params.index}
          filter={route.params.query}
          removeFilter={removeFilter}
          showComments={showComments}
          suggestions={spaces.suggestions}
          advertisements={spaces.ads}
          />
          : <Loading />
        }
      </Animated.ScrollView>
    </View>
  );
}  

const styles = vh => StyleSheet.create({
  listWrapper: {
    position:'absolute',
    top: 30,
    zIndex: 2,
    height: vh,
  }
})

const mapStateToProps = (state, ownProps) => {
  return {
    spaces: state.spaces.allSpaces,
    user: state.user.logged,
    state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchSpaces: (query, index) => (dispatch(fetchSpaces(query, index))),
    fetchMoreSpaces: (query, index) => (dispatch(fetchMoreSpaces(query, index)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSpaces);

const Header = styled.View`
  background-color: #4a94ea;
  box-shadow: 0px 1px 20px grey;
  height: 33px;
`

const HeaderRow = styled.View`
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  height: 30px,
`

const Lista = styled.Text`
  color: ${props => (props.active == "true" ? "white" : "#000144")};
  align-self: center;
  font-size: 18px;
  height: 30px;
  line-height: 30px;
  justify-content: center;
  text-align: center;
  padding-bottom: 5px;
  width: 50%;
`

const SelectedLine = styled.View`
  width: 50%;
  height: 3px;
  background-color: white;
`