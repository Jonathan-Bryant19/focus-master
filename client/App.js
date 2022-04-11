import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './components/Login'
import Signup from './components/Signup'
import MainNavigator from './components/MainNavigator';
import FocusSessionNavigator from './components/FocusSessionNavigator';

export default function App() {

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} />
        <Stack.Screen name="FocusSessionNavigator" component={FocusSessionNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}