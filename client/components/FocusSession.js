import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'

export default function FocusSession({route}) {
    console.log("FocusSession: ", route.params)
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Focus Session</Text>
            <Text style={styles.subheading}>This is the Focus Session screen</Text>
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