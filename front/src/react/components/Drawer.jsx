import React from 'react';
import Navbar from './Navbar';
//navigation

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { useNavigation } from "@react-navigation/native"
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




const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();



function Root(){
  const titulo = (title) => ({
    header: (props) => <Navbar {...props} title={title}/>,
    headerStyle: {
      backgroundColor: "transparent"
    }
  })
  return (
    <Stack.Navigator inicialRouteName="Home">
      <Stack.Screen name="Home" component={HomePage} options={{header: ()=> null}}/>
      <Stack.Screen name="SerchSpace" component={SerchSpace} options={{header: ()=> null}, titulo("Busca tu espacio")}/>
      <Stack.Screen name="Register" component={RegisterPage} options={{header: ()=> null},titulo("Crea tu cuenta")}/>
      <Stack.Screen name="Payment" component={PaymentPage} options={{header: ()=> null}, titulo("Elegi tu plan")}/>
      <Stack.Screen name="SpaceForm" component={SpaceForm} options={{header: ()=> null},titulo("Encontra tu espacio")}/>
      <Stack.Screen name="OwnerForm" component={OwnerForm} options={{header: ()=> null}, titulo("Ofrece tu espacio")}/>
      <Stack.Screen name="SingleView" component={SingleViewPage} options={{header: ()=> null},titulo("Single view")}/>
      <Stack.Screen name="AllSpaces" component={AllSpaces} options={{header: ()=> null},titulo("Espacios")}/>
    </Stack.Navigator>
  )
}

export default (props) => {
    console.log("Props!!",props)
    return (
        
         <Drawer.Navigator  inicialRouteName="Login" hideStatusBar="true" drawerType="slide" drawerStyle={{ width: 150 }}>
            <Drawer.Screen name="Login" component={LoginPage}/>
            <Drawer.Screen name="Root" component={Root} options={{drawerLabel: "Salir"}}/>
          </Drawer.Navigator>
    )
}






