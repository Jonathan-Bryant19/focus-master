import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'


export default function Profile() {

  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
        <Text style={styles.subheading}>This is the Profile screen</Text>
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