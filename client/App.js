import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './components/Login'
import Signup from './components/Signup'
import MainNavigator from './components/MainNavigator';

export default function App() {
  // const [count, setCount] = useState(0)

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Home" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}