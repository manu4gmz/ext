import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store'

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importando views and components
import HomePage from './src/react/components/backgroundHome'
import LoginPage from './src/react/components/backgroundLogin'

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider >
    );
  }
}
