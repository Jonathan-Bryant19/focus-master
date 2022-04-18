import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, StatusBar, Image, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function FocusSession({ route }) {
    // props
    const { duration, interval } = route.params
    // state
    const [onTask, setOnTask] = useState(0)
    const [total, setTotal] = useState(0)
    const [rounds, setRounds] = useState(2)
    const [isScreenBlank, setIsScreenBlank] = useState(true)
    const [endOfSession, setEndOfSession] = useState(false)
    const [heroGif, setHeroGif] = useState(require('../assets/characters/Black_Ninja_Idle.gif'))
    const [monsterGif, setMonsterGif] = useState(require('../assets/characters/Boss2_idle.gif'))
    const [heroHP, setHeroHP] = useState(Math.floor((duration/interval) * 0.2))
    const [monsterHP, setMonsterHP] = useState(Math.ceil((duration/interval) * 0.8))
    // variables
    const intervalMiliseconds = (interval * 1000)
    const navigation = useNavigation();
    // let heroHP = Math.floor((duration/interval) * 0.2)
    console.log("heroHP: ", heroHP)
    // let monsterHP = Math.ceil((duration/interval) * 0.8)
    console.log("monsterHP: ", monsterHP)
    // gifs
    const heroIdle = require('../assets/characters/Black_Ninja_Idle.gif')
    const heroAttack = require('../assets/characters/Black_Ninja_Attack2.gif')
    const heroRun = require('../assets/characters/Black_Ninja_Run.gif')
    // const heroHurt = require('')
    const monsterIdle = require('../assets/characters/Boss2_idle.gif')
    const monsterAttack = require('../assets/characters/Boss2_attack2.gif')
    const monsterRun = require('../assets/characters/Boss2_run.gif')
    const monsterHurt = require('../assets/characters/Boss2_hit.gif')
    const monsterDie = require('../assets/characters/Boss2_die.gif')
    

    useEffect(() => {
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
    
    function handleMonsterFlee() {
        setHeroGif(heroRun)
        setMonsterGif(monsterRun)
    }

    function handleMonsterDie() {
        setHeroGif(heroIdle)
        setMonsterGif(monsterDie)
    }

    function handleCorrectImages() {
        setHeroGif(heroAttack)
        setMonsterGif(monsterHurt)
        setMonsterHP(monsterHP - 1)
        if (monsterHP === 0) {
            setTimeout(() => handleMonsterDie(), 1000)
            setTimeout(() => logOnTask(), 5000)
        }
        else if (monsterHP < 2) {
            setTimeout(() => handleMonsterFlee(), 1000)
            setTimeout(() => logOnTask(), 2500)
        } else {
            setTimeout(() => setHeroGif(heroIdle), 1000)
            setTimeout(() => setMonsterGif(monsterIdle), 1000)
            setTimeout(() => logOnTask(), 2500)
        }
    }

    function handleIncorrectImages() {
        setMonsterGif(monsterAttack)
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
            })
        }

    return (
        <View style={styles.container}>
            { isScreenBlank ?
            <Image source={require('../assets/Transparent_Square.png')} />
            :
            <>
                <View style={styles.healthBarContainer}>
                    <View style={styles.healthBar}></View>
                    <View style={styles.healthBar}></View>
                </View>    
                <View style={styles.characterContainer}>
                    <Image source={(heroGif)} style={styles.character} />
                    <Image source={(monsterGif)} style={styles.character}/>
                </View>
                <Text style={styles.subheading}>Are you focused and on task?</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.button} onPress={handleCorrectImages}>
                        <Text style={styles.buttonText} >Yes! 😎</Text>
                    </Pressable>
                    <Pressable style={[styles.button, {backgroundColor: 'red'}]} onPress={handleIncorrectImages}>
                        <Text style={styles.buttonText} >No! 😈</Text>
                    </Pressable>
                </View>
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
        justifyContent: 'center'
    },
    heading: {
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        justifyContent: 'center'
    },
    subheading: {
        marginTop: 40,
        marginBottom: 20,
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia',
        textAlign: 'center'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        marginHorizontal: 10,
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
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    healthBarContainer: {
        flexDirection: 'row',
        marginTop: 20
    },
    healthBar: {
        height: 25,
        width: 125,
        backgroundColor: 'red',
        borderWidth: 3,
        borderColor: 'white',
        marginEnd: 30,
        marginStart: 30,
    },
    characterContainer: {
        flexDirection: 'row'
    },
    character: {
        width: 200,
        height: 200,
        marginTop: 20
    }
});