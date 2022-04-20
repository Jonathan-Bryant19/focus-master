import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function SessionSummary({route}) {
    const {total, onTask, focusSessionId} = route.params    
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState(null)
    const navigation = useNavigation();
    
    useEffect(() => {
        fetch('http://localhost:3000/me').then(r => {
          if (r.ok) {
              r.json().then(user => setUser(user))
          } else {
              if (r.status === 401) {
                  console.log("You're not logged in...")
                  console.log("App.js user: ", user)
              }
          }
      })
    }, [])

    function handleOnPress() {
        console.log("user_id: ", user.id)
        console.log("focus_session_id: ", focusSessionId)
        console.log("score: ", Math.round(onTask/total * 100))
        const myScore = Math.round(onTask/total * 100)
        fetch('http://localhost:3000/newfocus', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: user.id,
                focus_session_id: focusSessionId,
                score: myScore
            })
        }).then(r => {
            if (r.ok) {
                navigation.navigate('Focus')
            } else if (r.status === 422) {
                r.json().then(json => setErrors(json.errors))
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Session Summary</Text>
            <Text style={styles.subheading}>This is the Session Summary screen</Text>
            <Text style={styles.subheading}>You were on task in {onTask} of {total} intervals. That's {(onTask/total)*100}%!</Text>
            <Pressable style={styles.button} onPress={handleOnPress}>
                <Text style={styles.buttonText} >Again!</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    heading: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
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
        backgroundColor: 'blue'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'rexlia'
    }
});