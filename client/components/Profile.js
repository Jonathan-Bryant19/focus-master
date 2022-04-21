import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Profile({route}) {
    // console.log(route.params.user)
    const navigation = useNavigation()
    const profileImageIdle = require('../assets/characters/Robot_Idle.gif')
    const profileImageCrouch = require('../assets/characters/Robot_Crouch.gif')
    const profileImageDie = require('../assets/characters/Robot_Die.gif')
    const [user, setUser] = useState(null)
    const [profileImage, setProfileImage] = useState(profileImageIdle)

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
        function logoutTransition() {
            setUser(null)
            navigation.navigate('Login')
            setTimeout(() => setProfileImage(profileImageIdle), 800)
        }
        fetch('http://localhost:3000/logout', {
            method: 'DELETE'
        }).then(r => {
            if (r.ok) {
                setProfileImage(profileImageCrouch)
                setTimeout(() => logoutTransition(), 1500)
            }
        })
    }

    function deleteAccount() {
        function handleConfirmDelete() {
            function deleteAccountTransition() {
                setUser(null)
                navigation.navigate('Login')
                setTimeout(() => setProfileImage(profileImageIdle), 1000)
            }
            fetch('http://localhost:3000/deleteaccount', {
                method: 'DELETE'
            }).then(r => {
                if (r.ok) {
                    setProfileImage(profileImageDie)
                    setTimeout(() => deleteAccountTransition(), 1500)
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
            <Image
                style={styles.profileImage}
                source={profileImage} />
            <Pressable style={styles.button} onPress={onLogout}>
                <Text style={styles.buttonText} >Logout</Text>
            </Pressable>
            <Pressable style={[styles.button, {backgroundColor: 'red', marginTop: 30}]} onPress={deleteAccount}>
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
        marginBottom: 40,
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginTop: 0,
        marginBottom: -10,
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
        marginTop: 10,
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
    },
    profileImage: {
        marginBottom: 10,
        height: 250,
        width: 250,
        overflow: 'visible'
    }
});

