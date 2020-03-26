import React from 'react';
import Navbar from './Navbar';
//navigation

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';

//Importando views and components
import HomePage from "../containers/HomePage"
import SerchSpace from "../containers/serchSpace"
import RegisterPage from "../containers/RegisterPage"
import PaymentPage from "../containers/PaymentPage"
import SpaceForm from "../containers/SpaceForm"
import OwnerForm from "../containers/OwnerForm"
import SingleViewPage from "../containers/SingleViewPage"
import AllSpaces from "../containers/AllSpaces"
import LoginPage from "../containers/LoginPage"
import { View, StyleSheet } from 'react-native'
import { Avatar, Title, Caption, Paragraph } from 'react-native-paper'
import Camera from "../components/Camera"
import UploadingFiles from "../containers/UploadingFiles";

//importando action creator
import { LogoutUser } from '../../redux/actions/user'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} />  Esto hace que te traiga las rutas del Drawer.Screen  */}
      <View style={styles.userInfoSection}>
        <Avatar.Image
          style={styles.avatarImage}
          source={require("../../public/images/isologotipo-only.png")}
          size={68}
        />
        <Title style={styles.title}>Dawid Duchovny</Title>
        <Caption style={styles.caption}>fox@mulder.com</Caption>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Root', { screen: "Home" }, props)}
      />

      <DrawerItem
        label="Payment"
        onPress={() => props.navigation.navigate('Root', { screen: "Payment" }, props)}
      />

      <DrawerItem
        label="Logout"
        onPress={
          () => LogoutUser().then(() => props.navigation.navigate('Root', { screen: "Login" }))}
      />
    </DrawerContentScrollView>
  );
}
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,

  },
  userInfoSection: {
    paddingLeft: 25,
    paddingTop: 20
  },
  avatarImage: {
    backgroundColor: "white"
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    paddingBottom: 20
  }
});

function Root() {
  const titulo = (title) => ({
    header: (props) => <Navbar {...props} title={title} />,
    headerStyle: {
      backgroundColor: "transparent"
    }
  })
  return (
    <Stack.Navigator inicialRouteName="Login">
      <Stack.Screen name="Login" component={LoginPage} options={{ header: () => null }} />
      <Stack.Screen name="Home" component={HomePage} options={{ header: () => null }} />
      <Stack.Screen name="SerchSpace" component={SerchSpace} options={{ header: () => null }, titulo("Busca tu espacio")} />
      <Stack.Screen name="Register" component={RegisterPage} options={{ header: () => null }, titulo("Crea tu cuenta")} />
      <Stack.Screen name="Payment" component={PaymentPage} options={{ header: () => null }, titulo("Elegi tu plan")} />
      <Stack.Screen name="SpaceForm" component={SpaceForm} options={{ header: () => null }, titulo("Encontra tu espacio")} />
      <Stack.Screen name="OwnerForm" component={OwnerForm} options={{ header: () => null }, titulo("Ofrece tu espacio")} />
      <Stack.Screen name="SingleView" component={SingleViewPage} options={{ header: () => null }, titulo("Single view")} />
      <Stack.Screen name="AllSpaces" component={AllSpaces} options={{ header: () => null }, titulo("Espacios")} />
      <Stack.Screen name="Camera" component={Camera} options={{ header: () => null }} />
      <Stack.Screen name="UploadingFiles" component={UploadingFiles} options={{ header: () => null }} />
    </Stack.Navigator>
  )
}

export default () => {
  return (

    <Drawer.Navigator
      inicialRouteName="Login"
      hideStatusBar="true"
      drawerType="slide"
      drawerStyle={{ width: 150 }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Root"
        component={Root}
      />
    </Drawer.Navigator>
  )
}







