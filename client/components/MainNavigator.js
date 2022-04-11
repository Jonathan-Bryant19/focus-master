import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import Focus from './Focus'
import Profile from './Profile'


export default function MainNavigator({route}) {
    const Tab = createBottomTabNavigator()
    // console.log(route.params.user)
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} initialParams={route.params}/>
            <Tab.Screen name="Focus" component={Focus} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
  }

