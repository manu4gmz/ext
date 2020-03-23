import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store'

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Importando views and components
import HomePage from './src/react/containers/HomePage'

import LoginPage from './src/react/containers/LoginPage'
import RegisterPage from './src/react/containers/RegisterPage';
import PaymentPage from './src/react/containers/PaymentPage';
import SingleViewPage from './src/react/containers/SingleViewPage';
import SpaceForm from './src/react/containers/SpaceForm';
import OwnerForm from './src/react/containers/OwnerForm';
import AllSpaces from './src/react/containers/AllSpaces'


import Navbar from "./src/react/components/Navbar";

const Stack = createStackNavigator();

import firebase from "./src/redux/firebase";

const noNavbar = {
  header: () => null,
  headerStyle: {
    backgroundColor: "transparent"
  }
}

const withNavbar = (title) => ({
  header: (props) => <Navbar {...props} title={title} />,
  headerStyle: {
    backgroundColor: "transparent"
  }
})


export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator inicialRouteName="Login">
            <Stack.Screen name="Login" component={LoginPage} options={noNavbar} />
            <Stack.Screen name="Home" component={HomePage} options={withNavbar()} />
            <Stack.Screen name="Register" component={RegisterPage} options={withNavbar("Crea tu cuenta")} />
            <Stack.Screen name="Payment" component={PaymentPage} options={withNavbar("Elegí un plan")} />
            <Stack.Screen name="SpaceForm" component={SpaceForm} options={withNavbar("Ofrecé tu espacio")} />
            <Stack.Screen name="OwnerForm" component={OwnerForm} options={withNavbar("Ofrecé tu espacio")} />
            <Stack.Screen name="SingleView" component={SingleViewPage} options={withNavbar("Espacios")} />
            <Stack.Screen name="AllSpaces" component={AllSpaces} options={withNavbar("Espacios")} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider >
    );
  }
}