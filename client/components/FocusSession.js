import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, StatusBar, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function FocusSession({ route }) {
    const { duration, interval } = route.params
    
    const [onTask, setOnTask] = useState(0)
    const [total, setTotal] = useState(0)
    const [rounds, setRounds] = useState(2)
    const [isScreenBlank, setIsScreenBlank] = useState(true)
    const [endOfSession, setEndOfSession] = useState(false)
    const intervalMiliseconds = (interval * 1000)
    const navigation = useNavigation();
    
    useEffect(() => {
        console.log("useEffect fired...")
        setRounds(duration/interval)
        toggleScreen()
    }, [])

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

    if (endOfSession) {     
        navigation.navigate("SessionSummary", {
            total,
            onTask
        }
    )}

    return (
        <View style={styles.container}>
            { isScreenBlank ?
            <Image source={require('../assets/Transparent_Square.png')} />
            :
            <>
                <Image source={require('../assets/monster.png')} style={styles.monster}/>
                <Text style={styles.subheading}>Are you focused and on task?</Text>
                <Pressable style={styles.button} onPress={logOnTask}>
                    <Text style={styles.buttonText} >Yes! 😎</Text>
                </Pressable>
                <Pressable style={[styles.button, {backgroundColor: 'red'}]} onPress={logOffTask}>
                    <Text style={styles.buttonText} >No! 😈</Text>
                </Pressable>
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
        // alignItems: 'center',
        justifyContent: 'center'
    },
    subheading: {
        marginTop: 20,
        marginBottom: 20,
        // alignItems: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white'
    },
    monster: {
        height: 200,
        width: 200,
        marginTop: 70,
        alignSelf: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        width: 150,
        height: 60,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: 'green'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'rexlia'
    }
});