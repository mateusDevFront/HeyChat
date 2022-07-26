import React from "react";

import {
    View,
    Text, StyleSheet,
    TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'

function FabButton({ setVisible, userStatus }) {

    const navigation = useNavigation()

    function handleNavigateButton() {
        userStatus ? setVisible() : navigation.navigate('SignIn')
    }

    return (
        <TouchableOpacity
            style={styles.containerButton}
            activeOpacity={0.9}
            onPress={handleNavigateButton}
        >
            <View>
                <Text style={styles.buttonText}>+</Text>
            </View>
        </TouchableOpacity>
    )
}
export default FabButton;

const styles = StyleSheet.create({
    containerButton: {
        backgroundColor: '#2e54d4',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '4%',
        right: '7%'
    },
    buttonText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    }
})