import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function SessionSummary({route}) {
    const {total, onTask} = route.params    
    const navigation = useNavigation();

    console.log("total: ", total, "onTask: ", onTask)
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Session Summary</Text>
            <Text style={styles.subheading}>This is the Session Summary screen</Text>
            <Text>You were on task in {onTask} of {total} intervals. That's {(onTask/total)*100}%!</Text>
            <Button 
                onPress={() => navigation.navigate('Home')}
                title="Home"
                color="green"
                accessibilityLabel='Button to return to Home screen'
            />
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