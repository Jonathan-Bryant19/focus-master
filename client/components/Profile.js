import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Profile({route}) {
    // console.log(route.params.user)
    const navigation = useNavigation();

    const onLogout = () => {
        fetch('http://localhost:3000/logout', {
            method: 'DELETE'
        }).then(r => {
            if (r.ok) {
                // setUser(null)
                navigation.navigate('Login')
            }
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Profile</Text>
            <Text style={styles.subheading}>This is the Profile screen</Text>
            <Pressable style={styles.button} onPress={onLogout}>
                <Text style={styles.buttonText} >Logout</Text>
            </Pressable>
        {/* <Button 
            onPress={onLogout}
            title="Logout"
            color="red"
            accessibilityLabel='Logout button'
        /> */}
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

