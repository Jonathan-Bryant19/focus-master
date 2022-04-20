import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, Pressable, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Profile({route}) {
    // console.log(route.params.user)
    const navigation = useNavigation();
    const [user, setUser] = useState(null)

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

    function deleteAccount() {
        console.log("delete account...")
        function handleConfirmDelete() {
            fetch('http://localhost:3000/deleteaccount', {
                method: 'DELETE'
            }).then(r => {
                if (r.ok) {
                    setUser(null)
                    navigation.navigate('Login')
                }
            })
        }
        Alert.alert(
            "Warning!",
            "You are about to delete your account. Are you sure you want to continue? You cannot undo this action and it also kinda makes us sad 🥺",
            [
                {text: 'DELETE', onPress: handleConfirmDelete},
                {text: 'CANCEL', onPress: () => console.log("Cancel was pressed"), style: 'cancel'},
            ]
        )

    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Profile</Text>
            {user ? <Text style={styles.subheading}>Hello, {user.username}! This is the Profile screen. From here you can Logout or Delete your account.</Text> : <Text style={styles.subheading}>This is the Profile screen</Text>}
            <Pressable style={styles.button} onPress={onLogout}>
                <Text style={styles.buttonText} >Logout</Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: 'red', marginTop: 50}]} onPress={deleteAccount}>
                <Text style={styles.buttonText} >Delete Account</Text>
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
        marginTop: 80,
        marginBottom: 50,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginTop: 20,
        marginBottom: 175,
        marginHorizontal: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia',
        textAlign: 'justify'
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
        fontFamily: 'rexlia',
        textAlign: 'center'
    }
});

