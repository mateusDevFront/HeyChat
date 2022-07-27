import React, { useState } from "react";

import { View, Text, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

function ModalNewRoom({ setVisible, setUpdateScreen }) {

    const [roomName, setRoomName] = useState("")

    const user = auth().currentUser.toJSON()

    function handleButtonCreate() {
        if (roomName === '') return;

        //Deixar apenas criar apenas [4] salas
        firestore().collection('MESSAGE_THREADS')
            .get()
            .then((snapshot) => {
                let myRoom = 0

                snapshot.docs.map(docItem => {
                    if (docItem.data().owner === user.uid) {
                        myRoom = myRoom + 1
                    }
                })
                if (myRoom >= 4) {
                    alert('O limite de salas criadas já foi ultrapassado!')
                } else {
                    createRoom()
                }
            })

    }
    //criar nova sala no banco//
    function createRoom() {
        firestore()
            .collection('MESSAGE_THREADS')
            .add({
                name: roomName,
                owner: user.uid,
                lastMessage: {
                    text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                    createdAt: firestore.FieldValue.serverTimestamp()
                }
            })
            .then((docRef) => {
                docRef.collection('MESSAGES').add({
                    text: `Grupo ${roomName} criado. Bem vindo(a)!`,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                    system: true
                })
                    .then(() => {
                        setVisible()
                        setUpdateScreen()
                    })
            })
            .catch((err) => { console.log(err) })
    }


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={setVisible}>
                <View style={styles.modal}></View>
            </TouchableWithoutFeedback>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Criar uma nova sala?</Text>
                <TextInput
                    style={styles.input}
                    value={roomName}
                    onChangeText={(text) => setRoomName(text)}
                    placeholder="Nome para sua sala"
                />
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={handleButtonCreate}
                >
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
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff'
    }
})