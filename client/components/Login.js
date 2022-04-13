import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, StatusBar, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Login({route}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const navigation = useNavigation();
  const [errors, setErrors] = useState(null)

  const clearText = () => {
    setUsername('')
    setPassword('')
    setErrors(null)
  }

  useEffect(() => {
    fetch('http://localhost:3000/me').then(r => {
        if (r.ok) {
            r.json().then(user => setUser(user))
            navigation.navigate('MainNavigator')
        } else {
            if (r.status === 401) {
                navigation.navigate('Login')
            }
        }
    })
}, [])

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
            r.json().then(user => setUser(user))
            clearText()
            navigation.navigate('MainNavigator')
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
        <Image
          style={styles.loginImage}
          source={{uri: 'https://res.cloudinary.com/dhaek7qxl/image/upload/v1649887046/merged_1_icrx4q.gif'}} />
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
        <Pressable style={[styles.button, {backgroundColor: 'blue'}]} onPress={onLogin}>
          <Text style={styles.buttonText} >Login</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.buttonText} >Signup</Text>
        </Pressable>
        <StatusBar style="auto" />
        {errors ? 
                <Text style={styles.errors}>{errors}</Text>
            : 
                <></>
        }
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center'
  },
  heading: {
    marginTop: 70,
    marginBottom: 5,
    fontSize: 65,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  },
  subheading: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 150,
    height: 60,
    borderRadius: 15,
    elevation: 3,
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white',
    fontSize: 20
  },
  errors: {
    color: 'red',
    marginTop: 30
  },
  loginImage: {
    height: 150,
    width: 150,
    paddingBottom: 0,
    paddingTop: 0
  }
});