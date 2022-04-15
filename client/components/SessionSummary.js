import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function SessionSummary({route}) {
    const {total, onTask} = route.params    
    const navigation = useNavigation();

    console.log("total: ", total, "onTask: ", onTask)
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Session Summary</Text>
            <Text style={styles.subheading}>This is the Session Summary screen</Text>
            <Text style={styles.subheading}>You were on task in {onTask} of {total} intervals. That's {(onTask/total)*100}%!</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText} >Home</Text>
            </Pressable>
            {/* <Button 
                onPress={() => navigation.navigate('Home')}
                title="Home"
                color="green"
                accessibilityLabel='Button to return to Home screen'
            /> */}
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
        marginTop: 20,
        marginBottom: 5,
        fontSize: 70,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia'
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
    }
});