import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'

export default function Home({route}) {
    // route.params ? console.log("Home user: ", route.params.user.username) : console.log("loading...")
    console.log("Home.js: ", route)
    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Welcome, {route.params.user.username}!</Text> */}
            <Text style={styles.subheading}>This is the Home screen...</Text>
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
      }
})