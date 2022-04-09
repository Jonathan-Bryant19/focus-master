import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native';

export default function Home() {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome, User!</Text>
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