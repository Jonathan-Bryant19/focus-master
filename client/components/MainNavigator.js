import React, {useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, Image, View } from 'react-native'
import Home from './Home'
import FocusSetup from './FocusSetup'
import Profile from './Profile'

export default function MainNavigator() {
    const Tab = createBottomTabNavigator()
    const [user, setUser] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/me').then(r => {
            if (r.ok) {
                r.json().then(user => setUser(user))
            } else {
                if (r.status === 401) {
                    navigation.navigate('Login')
                }
            }
        })
    }, [])
    
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: 'black',
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../assets/icons/house-solid.png')}
                            resizeMode="contain"
                            style={{
                                width: 33,
                                height: 33,
                                tintColor: focused ? 'red' : 'blue'
                            }}
                        />
                        <Text >
                            
                        </Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="FocusSetup" component={FocusSetup} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../assets/icons/sword-cross.png')}
                            resizeMode="contain"
                            style={{
                                width: 70,
                                height: 70,
                                tintColor: focused ? 'red' : 'blue'
                            }}
                        />
                        <Text>
                            
                        </Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 10}}>
                        <Image 
                            source={require('../assets/icons/user-solid.png')}
                            resizeMode="contain"
                            style={{
                                width: 33,
                                height: 33,
                                tintColor: focused ? 'red' : 'blue'
                            }}
                        />
                        <Text>
                            
                        </Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#ff0000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5 // applicable to android only
    },
    loginImage: {
        height: 175,
        width: 175,
        marginTop: 5
    }
})