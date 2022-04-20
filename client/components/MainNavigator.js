import React, {useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native'
import Home from './Home'
import Focus from './Focus'
import Profile from './Profile'

export default function MainNavigator({ route }) {
    const Tab = createBottomTabNavigator()
    const [user, setUser] = useState(null)
    // console.log(route.params.user)
    
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
    
    const myUser = user
    
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
                    // backgroundColor: '#fff',
                    borderRadius: 15,
                    height: 90,
                    ...styles.shadow
                }
                // tabBarActiveTintColor: 'red',
                // tabBarActiveBackgroundColor: 'black'
            }}
        >
            <Tab.Screen name="Home" component={Home} initialParams={{user: myUser}} options={{
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
                        <Text>
                            
                        </Text>
                    </View>
                )
            }}/>
            <Tab.Screen name="Focus" component={Focus} options={{
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