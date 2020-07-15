import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import DrawerContainer from './src/react/containers/DrawerContainer';

import { Text } from 'react-native';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <DrawerContainer />
        </NavigationContainer>
      </Provider>
    );
  }
}