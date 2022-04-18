import React from 'react'
import { StyleSheet, Text, View, Button, StatusBar, Image } from 'react-native'

export default function Home({route}) {
    // route.params ? console.log("Home user: ", route.params.user.username) : console.log("loading...")

    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Welcome, {route.params.user.username}!</Text> */}
            <Text style={styles.subheading}>This is the Home screen...</Text>
            <Text style={styles.subheading}>Time since last session</Text>
            <Text style={styles.subheading}>Sessions this week</Text>
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
        marginTop: 30,
        marginBottom: 5,
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginTop: 25,
        marginBottom: 10,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia'
      },
      loginImage: {
        height: 175,
        width: 175,
        marginTop: 5
      }
})