import React, { useState } from "react";

import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

function ModalNewRoom({ setVisible }) {

    const [roomName, setRoomName] = useState('')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={styles.modal}></View>
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Criar um novo grupo?</Text>
                <TextInput
                    style={styles.input}
                    value={roomName}
                    onchangeText={(text) => setRoomName(text)}
                    placeholder="Nome para sua sala"
                />
                <TouchableOpacity style={styles.buttonCreate}>
                    <Text style={styles.buttonText}>Criar sala</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default ModalNewRoom;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(34, 34, 34, 0.4)',
    },
    modal: {
        flex: 1,
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
    },
    title: {
        marginTop: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 19
    },
    input: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#ddd',
        marginVertical: 15,
        fontSize: 16,
        paddingHorizontal: 5
    },
    buttonCreate: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#2e54d4',
        alignItems :'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff'
    }
})