import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, Image, ImageBackground, ScrollView } from 'react-native'
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
    const [animationGIF, setAnimationGIF] = useState(require('../assets/characters/idle.gif'))
    const [heroHP, setHeroHP] = useState(Math.floor((duration/interval) * 0.2))
    const [monsterHP, setMonsterHP] = useState(Math.ceil((duration/interval) * 0.8))
    // variables
    const intervalMiliseconds = (interval * 1000)
    const navigation = useNavigation();
    console.log("heroHP: ", heroHP)
    console.log("monsterHP: ", monsterHP)
    // gifs
    const idle = require('../assets/characters/idle.gif')
    const monsterAttack = require('../assets/characters/monster_attack.gif')
    const heroAttack = require('../assets/characters/hero_attack.gif')
    const monsterDie = require('../assets/characters/monster_die.gif')
    const monsterFlee = require('../assets/characters/monster_flee.gif')
    const heroFlee = require('../assets/characters/hero_flee.gif')
    const heroDie = require('../assets/characters/hero_die.gif')

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

    function handleCorrectImages() {
        setAnimationGIF(heroAttack)     
        setMonsterHP(monsterHP - 1)
        if (monsterHP === 0) {
            setTimeout(() => setAnimationGIF(monsterDie), 1000)
            setTimeout(() => logOnTask(), 5000)
        } else if (monsterHP < 2) {
            setTimeout(() => setAnimationGIF(monsterFlee), 1000)
            setTimeout(() => logOnTask(), 2500)
        } else {
            setTimeout(() => setAnimationGIF(idle), 1000)
            setTimeout(() => logOnTask(), 2500)
        }
    }

    function handleIncorrectImages() {
        setAnimationGIF(monsterAttack)
        setHeroHP(heroHP - 1)
        if (heroHP <= 0) {
            setTimeout(() => setAnimationGIF(heroDie), 1000)
            setTimeout(() => setAnimationGIF(heroFlee), 3000)
            setTimeout(() => logOffTask(), 5000)
        } else if (heroHP < 2) {
            setTimeout(() => setAnimationGIF(heroFlee), 1000)
            setTimeout(() => logOffTask(), 2500)
        } else {
            setTimeout(() => setAnimationGIF(idle), 1000)
            setTimeout(() => logOffTask(), 2500)
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
                    <Image source={animationGIF} style={styles.character}/>
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
        flexDirection: 'row',
        // width: 400,
        // height: 400,
    },
    character: {
        flex: 1,
        marginTop: -20,
        overflow: 'visible'
    },
});