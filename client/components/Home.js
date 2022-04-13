import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'

export default function Home({route}) {
    // route.params ? console.log("Home user: ", route.params.user.username) : console.log("loading...")
    console.log("Home.js: ", route)
    return (
        <View style={styles.container}>
            {/* <Text style={styles.heading}>Welcome, {route.params.user.username}!</Text> */}
            <Text style={styles.subheading}>This is the Home screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    heading: {
        marginTop: 50,
        marginBottom: 50,
        fontSize: 70,
        fontWeight: 'bold'
    },
    subheading: {
        marginTop: 20,
        marginBottom: 20,
        fontSize: 40,
        fontWeight: 'bold'
    }
});