import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Button, StatusBar, Image, Linking, Pressable } from 'react-native'

export default function Home({route}) {
    // state
    const [user, setUser] = useState(null)
    const [firstRowAnimation, setFirstRowAnimation] = useState(require('../assets/home_transparent_background.png'))
    const [secondRowAnimation, setSecondRowAnimation] = useState(require('../assets/home_transparent_background.png'))
    // icon
    const focusIcon = require('../assets/icons/sword-cross.png')
    // animations
    const empty = require('../assets/home_transparent_background.png')
    const batFlyLeft = require('../assets/characters/bat_fly_left.gif')
    const batFlyRight = require('../assets/characters/bat_fly_right.gif')
    const beeFlyLeft = require('../assets/characters/bee_fly_left.gif')
    const beeFlyRight = require('../assets/characters/bee_fly_right.gif')
    const foxRunLeft = require('../assets/characters/fox_run_left.gif')
    const foxRunRight = require('../assets/characters/fox_run_right.gif')
    const animationArray = [batFlyLeft, batFlyRight, beeFlyLeft, beeFlyRight, foxRunLeft, foxRunRight]

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

    function sendEmail() {
        Linking.openURL('https://mail.google.com')
    }

    function handleFirstRowClick() {
        console.log("First row click")
        const firstRow = animationArray[Math.floor(Math.random() * animationArray.length)]
        console.log(firstRow)
        setFirstRowAnimation(firstRow)
    }

    function handleSecondRowClick() {
        console.log("First second click")
        const secondRow = animationArray[Math.floor(Math.random() * animationArray.length)]
        console.log(secondRow)
        setSecondRowAnimation(secondRow)
    }

    return (
        <View style={styles.container}>
            {user ? <Text style={styles.heading}>Welcome to Focus Master, {user.username}!</Text> : <Text style={styles.heading}>Welcome!</Text>}
                <Pressable onPress={handleFirstRowClick} ><Text style={styles.subheading}>This app is designed to leverage the concepts of self-observation and self-recording in order to train the mind to attend to a specific task.</Text></Pressable>
            <View style={styles.animationContainer}>
                <Image source={firstRowAnimation} style={styles.animation}/>
            </View>
            <Text style={styles.subheading}>
                <Pressable onPress={handleSecondRowClick} style={{marginEnd: -30, marginStart: 50}}>
                    <Text style={styles.secondSubheading}>To start a session, choose an interval and duration from the Focus menu ({<Image source={focusIcon} style={styles.icon}/>}) and get to work! A "check in" will happen at your chosen intervals. Select your response and work to defeat the monster!</Text>
                </Pressable>
            </Text>
            <View style={styles.animationContainer}>
                <Image source={secondRowAnimation} style={[styles.animation, {marginTop: -15}]}/>
            </View>
            <Text style={[styles.subheading, {marginTop: -25}]}>Feedback is appreciated! Shoot me an email by clicking the button below:</Text>
            <Pressable style={[styles.button, {backgroundColor: 'blue'}]} onPress={sendEmail}>
                <Text style={styles.buttonText}>Contact Me!</Text>
            </Pressable>
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
        marginTop: 70,
        marginBottom: 35,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginHorizontal: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia',
        textAlign: 'justify'
      },
    secondSubheading: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia',
        textAlign: 'justify'
    },
    icon: {
          tintColor: 'red',
          height: 20,
          width: 20
      },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        padding: 10,
        width: 150,
        height: 60,
        borderRadius: 15,
        elevation: 3,
        backgroundColor: 'red'
      },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontFamily: 'rexlia'
      },
    animationContainer: {
        flexDirection: 'row',
        height: 40,
        width: 400,
        alignContent: 'center',
    },
    animation: {
        flex: 1,
        width: 10,
        height: 10,
        marginTop: 10,
        overflow: 'visible'
    }
})