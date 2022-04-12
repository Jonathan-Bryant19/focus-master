import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar, Image, ScrollView } from 'react-native'

export default function FocusSession({ route }) {
    const { duration, interval } = route.params

    const [onTask, setOnTask] = useState(0)
    const [total, setTotal] = useState(0)
    const [rounds, setRounds] = useState(0)
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [isScreenBlank, setIsScreenBlank] = useState(true)
    
    const roundedRounds = (Math.round(duration/interval))
    const intervalMiliseconds = (Math.round(interval * 60) * 1000)
    
    useEffect(() => {
        if (interval < 1) {
            setRounds(roundedRounds)            
        } else {
            setRounds(duration/interval)
        }
        setTimeout(() => titleHelper(), intervalMiliseconds)
    }, [])

    console.log("Rounded rounds: ", rounds)
    console.log("Rounds: ", rounds)

    function titleHelper() {
        setTitle("Attention attack!")
        setSubtitle("Are you focused on your current task?")
        setIsScreenBlank(!isScreenBlank)
    }
  
    function logOnTask() {
        setOnTask(onTask + 1)
        setTotal(total + 1)
        setRounds(rounds - 1) 
    }

    function logOffTask() {
        setTotal(onTask + 1)
        setRounds(rounds - 1)
    }

    console.log("onTask: ", onTask, " total: ", total, " rounds: ", rounds)
    // 5. After the interval has expired, the monster, catch phrase, the question, and the form (yes/no buttons) render
    // 6. If the user selects "yes", the 'onTask' and 'total' state variables should increment by 1 and the 'rounds' variable should decrease by 1.
    // 7. If the user selects "no", only the 'total' state variable should increment by 1 and the 'rounds' variable should decrease by 1.
    // 8. The screen blanks out for another setTimout interval (think about a loop for this)
    // 8. When 'rounds' = 0, send a POST request of the user's score to the server and route the user to the summary screen.

    return (
        <View style={styles.container}>
            { isScreenBlank ?
            <Image source={require('../assets/Transparent_Square.png')} />
            :
            <Image source={require('../assets/monster.png')} style={styles.monster}/>
            }
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.subheading}>{subtitle}</Text>
            { isScreenBlank ?
            <></>
            :
            <>
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