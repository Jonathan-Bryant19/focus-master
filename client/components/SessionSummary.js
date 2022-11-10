import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ProgressChart from './ProgressChart'

export default function SessionSummary({ route }) {
    const { total, onTask } = route.params    
    const [user, setUser] = useState(null)
    const [errors, setErrors] = useState(null)
    const [userData, setUserData] = useState(null)
    const navigation = useNavigation();
    const userScores = []

    useEffect(() => {
        (fetch('http://localhost:3000/me').then(r => {
          if (r.ok) {
              r.json().then(user => setUser(user))
            } else {
                if (r.status === 401) {
                    r.json().then(r => setErrors(errors))
                }
            }
        }))
        .then(fetch('http://localhost:3000/userstats').then(r => {
            if (r.ok) {
                r.json().then(data => setUserData(data))
            }
        }))
    }, [])

    function handleOnPress() {
        navigation.navigate('FocusSetup')
    }

    if (userData) analyzeUserScores()

    function analyzeUserScores() {
        for (let i = 0; i < userData.length; i++) {
            userScores.push({x: i+1, y: userData[i].score, marker: "    " + userData[i].score.toString() + "%"})
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Session Summary</Text>
            <Text style={styles.subheading}>You were on task in {onTask} of {total} intervals. That's {(onTask/total)*100}%!</Text>
            <Text style={styles.subheading}>Here's your progress over the past {userScores.length} sessions:</Text>
            <ProgressChart userScores={userScores}/>
            <Pressable style={styles.button} onPress={handleOnPress}>
                <Text style={styles.buttonText} >Again!</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
    },
    chartContainer: {
        flex: 1,
        maxHeight: 240,
        width: 375,
        marginTop: 20,
        marginBottom: 20
    },
    chart: {
        flex: 1
    },
    heading: {
        marginTop: 100,
        marginBottom: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 17,
        width: 375,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
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