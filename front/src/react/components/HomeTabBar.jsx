import React, { useEffect } from "react";
import { Button, Text, View, Image, TouchableOpacity  } from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
import Icon from "../ui/Icon";

export default ({ navigation }) => {
  console.log(navigation)
  return (
    <Footer>

      <Tab>
        <TabIcon
          source={require('../../public/icons/settings.png')}
          onPress={()=>navigation.push("Settings")}
        />
      </Tab>
      <Tab>
        <TabIcon
          source={require('../../public/icons/history.png')}
          onPress={()=>navigation.push("History")}
        />
      </Tab>
      <Tab>
        <TabIcon
          source={require('../../public/icons/search.png')}
          onPress={()=>navigation.push("Search")}
        />
      </Tab>
      <Tab>
        <TabIcon
          source={require('../../public/icons/user.png')}
          onPress={()=>navigation.push("Login")}
        />
      </Tab>
    </Footer>
  );
}


/*
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
*/
const Footer = styled.View`
  flex-direction: row;
  background-color: rgba(255,255,255,0.72);
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 60px;
  align-items: center;
  padding: 0 20px;

`

const Tab = styled.View`
  flex: 1;
  flex-grow: 1;
`

const TabIcon = styled(Icon)`
  align-self: center;
`