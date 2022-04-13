import React, {useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
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
    console.log("myUser: ", myUser)
    console.log("MainNavigator: ", user)
    
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} initialParams={{user: myUser}}/>
            <Tab.Screen name="Focus" component={Focus} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    )
  }

