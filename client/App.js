import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import Signup from './Signup'

export default function App() {
  // const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login}  />
        <Stack.Screen name="Signup" component={Signup} setUser={setUser} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}