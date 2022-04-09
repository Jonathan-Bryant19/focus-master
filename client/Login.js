import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   useEffect(() => {
//     fetch('http://localhost:3000/hello', {
//       method: "GET",
//       credentials: "include"
//     })
//       .then((r) => r.json())
//       .then((data) => setCount(data.count))
//   }, [])

  const Stack = createStackNavigator();
  const navigation = useNavigation();

  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Focus Master</Text>
        <Text style={styles.subheading}>Login</Text>
        <TextInput
          style={styles.input}
          label="Username"
          placeholder="Type your username here"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          label="Password"
          placeholder="Type your password here"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          onPress={() => {}}
          title="Login"
          color="blue"
          accessibilityLabel="Login button"
        />
        <Button
          onPress={() => navigation.navigate('Signup')}
          title="Sign Up"
          color="red"
          accessibilityLabel="Sign Up button"
        />
        <StatusBar style="auto" />
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
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});