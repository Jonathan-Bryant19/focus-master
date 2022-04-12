import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar, Image, ScrollView } from 'react-native'

export default function FocusSession({ route }) {
    const { duration, interval } = route.params
    
    const [onTask, setOnTask] = useState(0)
    const [total, setTotal] = useState(0)
    const [rounds, setRounds] = useState(3)
    const [isScreenBlank, setIsScreenBlank] = useState(true)
    const [endOfSession, setEndOfSession] = useState(false)
    const roundedRounds = (Math.round(duration/interval))
    const intervalMiliseconds = (Math.round(interval * 60) * 1000)
    
    useEffect(() => {
        if (interval < 1) {
            setRounds(roundedRounds)            
        } else {
            setRounds(duration/interval)
        }
        toggleScreen()
    }, [])

    if (endOfSession) { 
        handleEndOfSession()
    }

    function handleEndOfSession() {
        console.log(`You were on task in ${onTask} of ${total} intervals. That's ${(onTask/total)*100}%!`)
    }

    function toggleScreen() {
        console.log("toggleScreen just fired and rounds = ", rounds)
        function handleTime() {
            setIsScreenBlank(false)
        }
        if ((rounds - 1) > 0) {
            setTimeout(handleTime, intervalMiliseconds)
        } else if ((rounds - 1) === 0) {
            setEndOfSession(true)
        }
    }
    
    function logOnTask() {
        setOnTask(onTask + 1)
        setTotal(total + 1)
        setRounds(rounds - 1)
        setIsScreenBlank(true)
        toggleScreen()
    }

    function logOffTask() {
        setTotal(total + 1)
        setRounds(rounds - 1)
        setIsScreenBlank(true)
        toggleScreen()
    }

    console.log("onTask: ", onTask, " total: ", total, " rounds: ", rounds)

    // 9. When 'rounds' = 0, send a POST request of the user's score to the server and route the user to the summary screen.

    return (
        <View style={styles.container}>
            { isScreenBlank ?
            <Image source={require('../assets/Transparent_Square.png')} />
            :
            <>
                <Image source={require('../assets/monster.png')} style={styles.monster}/>
                <Text style={styles.heading}>Attention Attack!</Text>
                <Text style={styles.subheading}>Are you focused and on task?</Text>
                <Button
                    onPress={logOnTask}
                    title="Yes! 😎"
                    color="green"
                    accessibilityLabel='Button to confirm you are on task'
                />
                <Button
                    onPress={logOffTask}
                    title="No! 😈"
                    color="red"
                    accessibilityLabel='Button to confirm you are off task'
                />
            </>
            }
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
        // marginTop: 50,
        // marginBottom: 50,
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    subheading: {
        // marginTop: 20,
        // marginBottom: 20,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white'
    },
    monster: {
        height: 200,
        width: 200,
        marginTop: 70
    }
});