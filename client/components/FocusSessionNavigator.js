import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FocusSession from './FocusSession'
import MainNavigator from './MainNavigator';
import SessionSummary from './SessionSummary';

export default function FocusSessionNavigator() {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="FocusSession" component={FocusSession} />
            <Stack.Screen name="SessionSummary" component={SessionSummary} />
            <Stack.Screen name="MainNavigator" component={MainNavigator} />
        </Stack.Navigator>
    )
}  