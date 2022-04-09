import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import MainNavigator from './MainNavigator'

export default function Focus() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const Tab = createBottomTabNavigator()
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Focus</Text>
        <Text style={styles.subheading}>This is the Focus screen</Text>
        <MainNavigator /> 
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  heading: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 70,
    fontWeight: 'bold'
  },
  subheading: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bold'
  }
});