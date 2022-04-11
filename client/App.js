import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Login from './components/Login'
import Signup from './components/Signup'
import MainNavigator from './components/MainNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './components/Home'
import Focus from './components/Focus'

export default function App() {
  // const [count, setCount] = useState(0)
  const [user, setUser] = useState(null)

  const Stack = createStackNavigator();

  // const MainNavigator = () => {
  //   const Tab = createBottomTabNavigator()

  //   return (
  //       <Tab.Navigator initialRouteName='Home'>
  //           <Tab.Screen name="Home" component={Home} />
  //           <Tab.Screen name="Focus" component={Focus} />
  //           {/* <Tab.Screen name="Profile" component={Profile} /> */}
  //           <Tab.Screen name="MainNavigator" component={MainNavigator} />
  //       </Tab.Navigator>
  //   )
  // }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} setUser={setUser} />
        <Stack.Screen name="Home" component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}