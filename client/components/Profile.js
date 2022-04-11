import React from 'react'
import { StyleSheet, Text, View, TextInput, Button, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export default function Profile() {

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
        <Button 
            onPress={onLogout}
            title="Logout"
            color="red"
            accessibilityLabel='Logout button'
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