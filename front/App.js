import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store'

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Importando views and components
import HomePage from './src/react/components/backgroundHome'
import LoginPage from './src/react/views/LoginPage'
import AddSpace from './src/react/views/AddSpace'

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator inicialRouteName="AddSpace">
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="AddSpace" component={AddSpace} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider >
    );
  }
}
