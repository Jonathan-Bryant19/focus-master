import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FocusSession from './FocusSession'
import MainNavigator from './MainNavigator';

export default function FocusSessionNavigator({route}) {
    const Stack = createStackNavigator();
    console.log("FocusSessionNavigator: ", route.params)
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="FocusSession" component={FocusSession} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
        </Stack.Navigator>
    )
}  