import React, { useState } from "react";

import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    ActivityIndicator
} from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

function ModalNewRoom({ setVisible, setUpdateScreen }) {

    const [roomName, setRoomName] = useState("")

    const [loading, setLoading] = useState(true)
    const [loadingAuth, setLoadingAuth] = useState(false)

    const user = auth().currentUser.toJSON()

    function handleButtonCreate() {
        if (roomName === '') return;
        setLoadingAuth(true)
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
                if (myRoom >= 3) {
                    Alert.alert(
                        "Ops!",
                        "Você já obteve o limíte máximo de salas criadas (3)",
                        [

                            {
                                text: 'Sair',
                                onPress: () => { }
                            }
                        ]
                    )
                } else {
                    createRoom()
                }
                setLoadingAuth(false)
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
                    text: `Bate Papo  "${roomName}" criado. Seja Bem vindo(a)!`,
                    createdAt: firestore.FieldValue.serverTimestamp()
                }
            })
            .then((docRef) => {
                docRef.collection('MESSAGES').add({
                    text: `Bate Papo ${roomName} criado. Seja Bem vindo(a)!`,
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
                <Text style={styles.title}>Deseja criar um {'\n'}novo chat?</Text>
                <TextInput
                    style={styles.input}
                    value={roomName}
                    onChangeText={(text) => setRoomName(text)}
                    placeholder="Nome do chat"
                />
                <TouchableOpacity
                    style={styles.buttonCreate}
                    onPress={handleButtonCreate}
                >
                    {loadingAuth ? (
                        <ActivityIndicator size={20} color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Criar sala</Text>
                    )}
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
        color: '#E47004',
        marginTop: 20,
        fontWeight: 'bold',
        fontSize: 22
    },
    input: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#ddd',
        marginVertical: 15,
        fontSize: 16,
        paddingHorizontal: 15,
    },
    buttonCreate: {
        borderRadius: 4,
        height: 45,
        backgroundColor: '#E47004',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#fff'
    }
})