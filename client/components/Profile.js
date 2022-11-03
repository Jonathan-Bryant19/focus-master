import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Alert, Pressable, Image, ScrollView, RefreshControl, processColor } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-charts-wrapper'

export default function Profile() {
    const navigation = useNavigation()
    const profileImageIdle = require('../assets/characters/Robot_Idle.gif')
    const profileImageCrouch = require('../assets/characters/Robot_Crouch.gif')
    const profileImageDie = require('../assets/characters/Robot_Die.gif')
    const [user, setUser] = useState(null)
    const [profileImage, setProfileImage] = useState(profileImageIdle)
    const [userData, setUserData] = useState(null)
    const [refreshing, setRefreshing] = useState(false)
    const userStats = {
        "totalSessions": 0,
        "baselineAverage": 0,
        "currentAverage": 0
    }

    useEffect(() => {
        loadUserData()
    }, [])

    function loadUserData() {
        setRefreshing(true)
        fetch('http://localhost:3000/me').then(r => {
            if (r.ok) {
                r.json().then(user => {
                    setUser(user)
                    setRefreshing(false)
                })
            } else {
                if (r.status === 401) {
                    console.log("You're not logged in...")
                    console.log("App.js user: ", user)
                }
            }
        })
        fetch('http://localhost:3000/userstats').then(r => {
            if (r.ok) {
                r.json().then(setUserData)
            }
        })
    }

    if (userData) {
        const firstTenSessions = userData.slice(0, 10)
        const lastTenSessions = userData.slice(userData.length - 10)
        userStats["totalSessions"] = userData.length
        let total = 0
        firstTenSessions.forEach(session => {
            total += session.score
        })
        userStats["baselineAverage"] = Math.round(total/10)
        total = 0
        lastTenSessions.forEach(session => {
            total += session.score
        })
        userStats["currentAverage"] = Math.round(total/10)
    }

    const onLogout = () => {
        function logoutTransition() {
            setUser(null)
            navigation.navigate('Login')
            // setTimeout(() => setProfileImage(profileImageIdle), 800) // 800
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




    const scores = [{x: 0, y: 50}, {x: 1, y: 70}, {x: 4, y: 75}]
    const dates = ['M', 'T', 'W', 'T', 'F']


    return (
        <ScrollView 
            style={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={loadUserData}
                    tintColor={'red'}
                    title={'Checking for updated data...'}
                    titleColor={'white'}
                />
            }
        >
            <View style={styles.container}>
                <Text style={styles.heading}>Profile</Text>
                {user && userData ? 
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.column1}>Username:  </Text>
                        <Text style={styles.column2}>{user.username}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.column1}>Total Sessions:  </Text>
                        <Text style={styles.column2}>{userStats["totalSessions"]}</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.column1}>Baseline Average:  </Text>
                        <Text style={styles.column2}>{userStats["baselineAverage"]}%</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.column1}>Current Average:  </Text>
                        <Text style={styles.column2}>{userStats["currentAverage"]}%</Text>
                    </View>
                </View> 
                : 
                <Text style={styles.subheading}>This is the Profile screen</Text>}
                <Image
                    style={styles.profileImage}
                    source={profileImage} />




            

                <View style={styles.chartContainer}>
                    <LineChart 
                        style={styles.chart}
                        data={
                            {dataSets: [{
                                label: "On Task", 
                                values: scores,
                                config: {
                                    circleRadius: 5,
                                    circleColor: processColor('red'),
                                    drawCircles: true,
                                    lineWidth: 2,
                                    drawCircleHole: false
                                }
                            
                            }],
                                
                            }
                        }
                        legend={ 
                            {
                                enabled: true,
                                horizontalAlignment: 'CENTER',
                                fontFamily: 'rexlia'
                            } 
                        }
                        marker={
                            {
                                enabled: true,
                                digits: 25,
                                backgroundTint: 'red',
                                markerColor: processColor('red'),
                                textColor: processColor('black'),
                                textSize: 15
                            }
                        }
                        drawGridBackground={true}
                        gridBackgroundColor={processColor('blue')}
                        drawBorders={true}
                        borderColor={processColor('red')}
                        borderWidth={5}
                        xAxis={
                            {
                                enabled: true,
                                position: 'BOTTOM',
                                valueFormatter: dates,
                                fontFamily: 'rexlia',
                                drawGridLines: false,
                                textSize: 12,
                                granularityEnabled: true,
                                granularity: 1,
                            }
                        }
                        yAxis={
                            {
                                left: {
                                    enabled: true,
                                    fontFamily: 'rexlia',
                                    textSize: 12,
                                    granularity: 1
                                },
                                right: {
                                    enabled: false
                                }
                            }
                        }
                        animation={
                            {
                                durationX: 0,
                                durationY: 1500,
                                easingY: 'EaseInOutQuart'
                            }
                        }
                        config={
                            {
                                circleColor: processColor('red')
                            }
                        }
                    />
                </View>








                <Pressable style={styles.button} onPress={onLogout}>
                    <Text style={styles.buttonText} >Logout</Text>
                </Pressable>
                <Pressable style={[styles.button, {backgroundColor: 'red', marginTop: 30}]} onPress={deleteAccount}>
                    <Text style={styles.buttonText} >Delete Account</Text>
                </Pressable>
            </View>
        </ScrollView>
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
        marginBottom: 30,
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
    column1: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'rexlia'
    },
    column2: {
        color: 'red',
        fontSize: 20,
        fontFamily: 'rexlia'
    },
    chartContainer: {
        flex: 1,
        backgroundColor: 'white'
    },
    chart: {
        flex: 1,
        width: 340,
        height: 240
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
    },
    scrollView: {
        backgroundColor: 'black'
    }
});

