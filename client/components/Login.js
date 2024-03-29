import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const navigation = useNavigation();
  const [errors, setErrors] = useState(null)
  const heroIdle = require('../assets/characters/Black_Ninja_Idle3.gif')
  const heroHit = require('../assets/characters/Black_Ninja_Hit.gif')
  const heroRun = require('../assets/characters/Black_Ninja_Run_Offscreen.gif')
  const [heroImage, setHeroImage] = useState(heroIdle)

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

  function onLogin(e) {
    e.preventDefault()

    function loginTransition() {
      navigation.navigate('MainNavigator')
      setTimeout(() => setHeroImage(heroIdle), 500)
    }
    
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
            setHeroImage(heroRun)
            setTimeout(() => loginTransition(), 1000)
        } else {
            if (r.status === 401) {
                r.json().then(json => setErrors(json.error))
                setHeroImage(heroHit)
                setTimeout(() => setHeroImage(heroIdle), 1500)
            }
        }
    })
  }

  return (
      <View style={styles.container}>
        <Text style={styles.heading}>Focus Master</Text>
        <Image
          style={styles.loginImage}
          source={heroImage} />
        <Text style={styles.subheading}>Login</Text>
        <TextInput
          style={styles.input}
          label="Username"
          placeholder="Type your username here"
          value={username}
          onChangeText={setUsername}
          clearButtonMode="always"
          placeholderTextColor={'black'}
        />
        <TextInput
          style={styles.input}
          label="Password"
          placeholder="Type your password here"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={'black'}
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
    marginTop: 60,
    marginBottom: 20,
    fontSize: 65,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'rexlia'
  },
  subheading: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'rexlia'
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
    fontFamily: 'rexlia'
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
    fontSize: 20,
    fontFamily: 'rexlia'
  },
  errors: {
    color: 'red',
    marginTop: 15,
    fontFamily: 'rexlia'
  },
  loginImage: {
    height: 250,
    width: 250,
    marginTop: -35,
    marginBottom: -45,
    overflow: 'visible'
  }
});