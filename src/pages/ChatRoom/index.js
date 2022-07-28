import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native'

import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore'

import { useNavigation, useIsFocused } from "@react-navigation/native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import FabButton from '../../components/FabButton'
import ModalNewRoom from '../../components/ModalNewRoom'
import ChatList from '../../components/ChatList'

const ChatRoom = () => {

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [modal, setModal] = useState(false)
  const [user, setUser] = useState(null)

  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true)
  const [updateScreen, setUpdateScreen] = useState(false)


  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    /* console.log('has', hasUser) */
    setUser(hasUser)

  }, [isFocused])

  useEffect(() => {
    let isActive = true

    function getChat() {
      firestore()
        .collection('MESSAGE_THREADS')
        .orderBy('lastMessage.createdAt', 'desc')
        .limit(10)
        .get()
        .then((snapshot) => {
          const threads = snapshot.docs.map((documentSnapshot) => {
            return {
              _id: documentSnapshot.id,
              name: '',
              lastMessage: { text: '' },
              ...documentSnapshot.data()
            }
          })
          if (isActive) {
            setThreads(threads)
            setLoading(false)
          }
        })
    }
    getChat()
    return () => {
      isActive = false
    }
  }, [isFocused, updateScreen])

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
        setUser(null)
        navigation.navigate('SignIn')
      })
      .catch(() => {
        console.log('Não possui usuário')
      })
  }

  //deletar uma sala criada//
  function deleteRoom(ownerId, idRoom) {
    /* console.log('deletado') */
    if (ownerId !== user?.uid) return;

    Alert.alert(
      "ATENÇÃO!!!",
      "Tem certeza que deseja deletar esse chat?",
      [
        {
          text: 'Cancelar',
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'Deletar',
          onPress: () => handleDeleteRoom(idRoom)
        }
      ]
    )
  }

  async function handleDeleteRoom(idRoom) {
    /* console.log(idRoom) */
    await firestore()
      .collection('MESSAGE_THREADS')
      .doc(idRoom)
      .delete()
    setUpdateScreen(!updateScreen)
  }

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#fff" />
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>

        <View style={styles.headerRoomLeft}>
          <Text style={styles.title}>Chat's</Text>
        </View>

        {user && (
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="logout" size={30} color="#E47004" />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ChatList data={item} deleteRoom={() => deleteRoom(item.owner, item._id)} userStatus={user} />
        )}
      />

      <FabButton
        setVisible={() => setModal(true)}
        userStatus={user}
      />

      <Modal visible={modal} animationType="slide" transparent={true}>
        <ModalNewRoom
          setVisible={() => setModal(false)}
          setUpdateScreen={() => setUpdateScreen(!updateScreen)}
        />
      </Modal>

    </SafeAreaView>
  )
}
export default ChatRoom

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0'
  },
  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  headerRoomLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#E47004',
  }
})