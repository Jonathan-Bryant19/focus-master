import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert, Pressable, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'

export default function Focus() {
    const [duration, setDuration] = useState(10)
    const [interval, setInterval] = useState(2)
    const [focusSessionId, setFocusSessionId] = useState(null)
    const [errors, setErrors] = useState(null)
    const navigation = useNavigation();

    const onStartFocusSession = () => {
        if ((duration/2) < interval) {
            Alert.alert(
                "Invalid Setup",
                "Please choose an duration/interval combination that produces at least TWO intervals (e.g. A 30-minute duration with 15-minute intervals will run twice).",
                {
                    text: "OK",
                    onPress: () => console.log("Invalid setup acknowledged")
                }
            )
        } else {
            fetch('http://localhost:3000/findfocussessionid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    duration,
                    interval
                })
            }).then(r => {
                if (r.ok) {
                    r.json().then(data => {
                        setFocusSessionId(data) 
                        console.log("Starting Focus Session...")
                        navigation.navigate("FocusSessionNavigator", {
                            screen: 'FocusSession',
                            params: {
                                duration,
                                interval,
                                focusSessionId: parseInt(data)
                            }
                        })          
                    }
                    )
                } else {
                    if (r.status === 401) {
                        r.json().then(json => setErrors(json.error))
                    }
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            
            <Text style={styles.heading}>Focus</Text>
            <Text style={styles.subheading}>Duration:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={duration}
                    onValueChange={currentDuration => setDuration(currentDuration)}
                    itemStyle={{fontFamily: 'rexlia'}}>
                    <Picker.Item label='10 seconds' value={10} color={'red'} style={{fontSize:25}}/>
                    <Picker.Item label='15 minutes' value={900} color={'red'}/>
                    <Picker.Item label='30 minutes' value={1800} color={'red'}/>
                    <Picker.Item label='60 minutes' value={3600} color={'red'}/>
                </Picker>
            <Text style={styles.subheading}>Interval:</Text>
                <Picker
                    style={styles.picker}
                    selectedValue={interval}
                    onValueChange={currentInterval => setInterval(currentInterval)}
                    itemStyle={{fontFamily: 'rexlia'}}>
                    <Picker.Item label='2 seconds' value={2} color={'red'} />
                    <Picker.Item label='5 minutes' value={300} color={'red'}/>
                    <Picker.Item label='10 minutes' value={600} color={'red'}/>
                    <Picker.Item label='15 minutes' value={900} color={'red'}/>
                </Picker>
            <Pressable style={styles.button} onPress={onStartFocusSession}>
                <Text style={styles.buttonText} >Focus!</Text>
            </Pressable>
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
        fontSize: 60,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontFamily: 'rexlia'
    },
    subheading: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        fontFamily: 'rexlia'
    },
    picker: {
        backgroundColor: 'black',
        width: 200,
        height: 200,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: 'blue',
        borderRadius: 10
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