import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [errors, setErrors] = useState(null)

  const clearText = () => {
    setUsername('')
    setPassword('')
    setErrors(null)
  }

  const onLogin = e => {
    e.preventDefault()
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then(r => {
        if (r.ok) {
            // What I'm not getting is that user is "null" if you log it here:
            // r.json().then(user => setUser(user))
            clearText()
            navigation.navigate('Home', {
              username: username
            })
        } else {
            if (r.status === 401) {
                r.json().then(json => setErrors(json.error))
            }
        }
    })
}

  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Focus Master</Text>
        <Text style={styles.subheading}>Login</Text>
        <TextInput
          style={styles.input}
          label="Username"
          placeholder="Type your username here"
          value={username}
          onChangeText={setUsername}
          clearButtonMode="always"
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
          onPress={onLogin}
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
        {errors ? 
                <Text>{errors}</Text>
            : 
                <></>
        }
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