import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import Firebase from '../config/firebase'
import { updateEmail, updatePassword, login, getUser } from './redux/actions/user'
import { bindActionCreators } from 'redux'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loading from '../src/loading'
import Login from '../src/login'
import Signup from '../src/signup'
import Home from '../src/dashboard'
import Detail from '../src/edit_dlt'
import Chat from '../src/chats'
import Chatting from '../src/chatting'



const Stack = createStackNavigator();
const Auth = createStackNavigator();



 export const Homestack =()=>{

 console.log("home stack");

    console.disableYellowBox = true
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{ title: 'Profile' , headerShown: false  }} />
          <Stack.Screen name="Detail" component={Detail} options={{ title: 'Profile', headerShown: false   }} />
          <Stack.Screen name="Chat" component={Chat} options={{ title: 'Profile', headerShown: false   }} />
          <Stack.Screen name="Chatting" component={Chatting} options={{ title: 'Profile', headerShown: false   }} />
          <Stack.Screen name="Login" component={Login} options={{ title: 'Auth', headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ title: 'Auth', headerShown: false }} />         
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export const Authstack =()=>{

 
  console.log("Auth stack");

  console.disableYellowBox = true
  return (
    <NavigationContainer independent={true}>
      <Auth.Navigator>
          <Auth.Screen name="Login" component={Login} options={{ title: 'Auth', headerShown: false }} />
          <Auth.Screen name="Signup" component={Signup} options={{ title: 'Auth', headerShown: false }} />
          <Auth.Screen name="Home" component={Home} options={{ title: 'Profile' , headerShown: false  }} />
          <Auth.Screen name="Detail" component={Detail} options={{ title: 'Profile', headerShown: false   }} />
          <Auth.Screen name="Chat" component={Chat} options={{ title: 'Profile', headerShown: false   }} />
      </Auth.Navigator>
    </NavigationContainer>
  )
}



