import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store'

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


//Importando views and components
import HomePage from './src/react/components/backgroundHome'

import LoginPage from './src/react/containers/LoginPage'
import RegisterPage from './src/react/containers/RegisterPage'
import AddSpace from './src/react/containers/AddSpace'
import PaymentPage from './src/react/containers/PaymentPage';
<<<<<<< HEAD
=======
import SingleViewPage from './src/react/containers/SingleViewPage';


>>>>>>> 3c9a6ff37311be9c34ed191022314a02c1ae4f42
import Navbar from "./src/react/components/Navbar";

const Stack = createStackNavigator();

import firebase from "./src/redux/firebase";

export default class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <NavigationContainer>
          <Stack.Navigator inicialRouteName="Login">

<<<<<<< HEAD
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen
              name="Home"
=======
            <Stack.Screen 
              name="Login" 
              component={LoginPage}
              options={{
                header: () => null,
                headerStyle: {        
                  backgroundColor: "transparent"      
                }
              }} />  
            <Stack.Screen 
              name="Home" 
>>>>>>> 3c9a6ff37311be9c34ed191022314a02c1ae4f42
              component={HomePage}
              options={{
                header: () => <Navbar />,
                headerStyle: {
                  backgroundColor: "transparent"
                }
              }}

            />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Payment" component={PaymentPage} />
            <Stack.Screen name="AddSpace" component={AddSpace} />
            <Stack.Screen name="SingleView" component={SingleViewPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider >
    );
  }
}