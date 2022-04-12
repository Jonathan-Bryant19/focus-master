import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native'

export default function Focus() {
    const [duration, setDuration] = useState(0.16666)
    const [interval, setInterval] = useState(0.03333)
    const navigation = useNavigation();

    const onStartFocusSession = () => {
        console.log("Starting Focus Session...")
        navigation.navigate("FocusSessionNavigator", {
            screen: 'FocusSession',
            params: {
                duration,
                interval
            }
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.heading}>Focus</Text>
                <Text style={styles.subheading}>Duration:</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={duration}
                        onValueChange={currentDuration => setDuration(currentDuration)}>
                        <Picker.Item label='10 seconds' value={0.16666} />
                        <Picker.Item label='15 minutes' value={15} />
                        <Picker.Item label='30 minutes' value={30} />
                        <Picker.Item label='60 minutes' value={60} />
                    </Picker>
                <Text style={styles.subheading}>Interval:</Text>
                    <Picker
                        style={styles.picker}
                        selectedValue={interval}
                        onValueChange={currentInterval => setInterval(currentInterval)}>
                        <Picker.Item label='2 seconds' value={0.03333} />
                        <Picker.Item label='5 minutes' value={5} />
                        <Picker.Item label='10 minutes' value={10} />
                        <Picker.Item label='15 minutes' value={15} />
                    </Picker>
                <Button 
                    onPress={onStartFocusSession}
                    title="Focus!"
                    color="blue"
                    accessibilityLabel='Start Focus Session button'    
                />
            </ScrollView>
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
        fontWeight: 'bold',
    },
    subheading: {
        marginTop: 10,
        marginBottom: 20,
        fontSize: 40,
        fontWeight: 'bold'
    },
    picker: {
        marginTop: -80
    }
});