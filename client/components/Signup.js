import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Signup() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const navigation = useNavigation();
    const [errors, setErrors] = useState(null)
    const [user, setUser] = useState(null)

    const onSignup = e => {
        e.preventDefault()
        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                email,
                password,
                password_confirmation: passwordConfirmation
            })
        }).then(r => {
            if (r.ok) {
                r.json().then(user => setUser(user))
                navigation.navigate('MainNavigator', {
                    username
                })
            } else if (r.status === 422) {
                r.json().then(json => setErrors(json.errors))
            }
        })
    }

    console.log(errors)
    
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
            <Image
                style={styles.signupImage}
                source={require('../assets/characters/signup_screen.gif')} />
            <Text>Username</Text>
            <TextInput
                style={styles.input}
                label="Username"
                placeholder="Type your username here"
                value={username}
                onChangeText={setUsername}
            />
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                label="Email"
                placeholder="Type your email here"
                value={email}
                onChangeText={setEmail}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                label="Password"
                placeholder="Type your password here"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Text>Confirm Password</Text>
            <TextInput
                style={styles.input}
                label="Confirm password"
                placeholder="Re-type your password here"
                onChangeText={setPasswordConfirmation}
                onSubmitEditing={(e) => {
                confirmPasswordsMatch(e.nativeEvent.text, password);
                }}
                secureTextEntry
            />
            <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 15}}>
                <Pressable style={[styles.button, {backgroundColor: 'blue', marginEnd: 10}]} onPress={onSignup}>
                    <Text style={styles.buttonText} >Signup</Text>
                </Pressable>
                <Pressable style={[styles.button, {marginStart: 10}]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText} >Cancel</Text>
                </Pressable>
            </View>
            {errors ?       
                <View >{errors.map((error, index) => {
                    return <Text style={styles.errors} key={index} >{error}</Text>
                })}</View>
            : 
                <></>
            }
            </View>
    );
}

function confirmPasswordsMatch(confirmationPassword, originalPassword) {
    if (confirmationPassword !== originalPassword) {
      alert('Passwords do not match. Please try again.');
    }
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center'
    },
    heading: {
        marginTop: 30,
        marginBottom: 5,
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    input: {
        height: 40,
        width: 300,
        margin: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        fontFamily: 'rexlia'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
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
        marginTop: 2,
        fontFamily: 'rexlia',
        textAlign: 'center'
      },
      signupImage: {
        height: 250,
        width: 250,
        marginTop: 0,
        marginLeft: 30,
        marginBottom: -50
      }
  });