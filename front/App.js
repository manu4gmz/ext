import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native';
import DrawerContainer from './src/react/containers/DrawerContainer';

//Importando views and components
import HomePage from './src/react/containers/HomePage'

import LoginPage from './src/react/containers/LoginPage'
import RegisterPage from './src/react/containers/RegisterPage';
import PaymentPage from './src/react/containers/PaymentPage';
import SingleViewPage from './src/react/containers/SingleViewPage';
import SpaceForm from './src/react/containers/SpaceForm';
import OwnerForm from './src/react/containers/OwnerForm';
import UploadingFiles from './src/react/containers/UploadingFiles';
import Camera from './src/react/components/Camera';
import Navbar from "./src/react/components/Navbar";




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
      <Provider store={store}>
        <NavigationContainer>
          <DrawerContainer />
        </NavigationContainer>
      </Provider>
    );
  }
}