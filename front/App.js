import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/redux/store'
import HomePage from './src/react/components/backgroundHome'
import LoginPage from './src/react/components/backgroundLogin'

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <LoginPage />
      </Provider >
    );
  }
}