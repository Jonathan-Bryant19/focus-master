import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar, Image, ScrollView } from 'react-native'

export default function FocusSession({ route }) {
    const { duration, interval } = route.params
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [monsterImage, setMonsterImage] = useState('')

    function titleHelper() {
        setTitle("Attention attack!")
        setMonsterImage(`require../assets/monster.png`)
    }
// STOPPED RIGHT ABOVE HERE TRYING TO FIGURE OUT HOW TO SET THE IMAGE TO STATE USING THE REQUIRE SYNTAX
    console.log("Interval: ", interval, " Duration: ", duration)
    useEffect(() => {
        setTimeout(() => setTitle("Attention attack!"), 3000)
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require('../assets/monster.png')} style={styles.monster} />
            <Text style={styles.heading}>{title}</Text>
            <Text style={styles.subheading}>{subtitle}</Text>
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