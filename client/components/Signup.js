import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
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

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Sign Up</Text>
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
            <Button
                onPress={onSignup}
                title="Signup"
                color="blue"
                accessibilityLabel="Signup button"
            />
            <Button
                onPress={() => navigation.navigate('Login')}
                title="Cancel"
                color="red"
                accessibilityLabel="Cancel signup"
            />
            {errors ? 
                <Text>{errors}</Text>
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
        backgroundColor: '#fff',
        alignItems: 'center'
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
        padding: 10
    }
  });