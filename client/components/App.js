import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import Signup from './Signup'
import MainNavigator from './MainNavigator';
import FocusSessionNavigator from './FocusSessionNavigator';

export default function App() {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null);

  useEffect(() => {
      fetch('http://localhost:3000/me').then(r => {
          if (r.ok) {
              r.json().then(user => setUser(user))
          } else {
              if (r.status === 401) {
                  console.log("You're not logged in...")
                  console.log("App.js user: ", user)
              }
          }
      })
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} initialParams={user} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainNavigator" component={MainNavigator} initialParams={user}/>
        <Stack.Screen name="FocusSessionNavigator" component={FocusSessionNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}