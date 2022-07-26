import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native'

import auth from "@react-native-firebase/auth"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import FabButton from '../../components/FabButton'
import ModalNewRoom from '../../components/ModalNewRoom'

const ChatRoom = () => {

  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [modal, setModal] = useState(false)
  const [user, setUser] = useState(null)


  useEffect(() => {
    const hasUser = auth().currentUser ? auth().currentUser.toJSON() : null;
    console.log('has', hasUser)
    setUser(hasUser)

  }, [isFocused])


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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRoom}>

        <View style={styles.headerRoomLeft}>

          {user && (
            <TouchableOpacity onPress={handleSignOut}>
              <MaterialIcons name="arrow-back" size={28} color="#fff" />
            </TouchableOpacity>
          )}

          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcons name="search" size={29} color="#fff" />
        </TouchableOpacity>

      </View>

      <FabButton
        setVisible={() => setModal(true)}
        userStatus={user}
      />

      <Modal visible={modal} animationType="slide" transparent={true}>
        <ModalNewRoom setVisible={() => setModal(false)} />
      </Modal>

    </SafeAreaView>
  )
}
export default ChatRoom

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerRoom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#2e54d4',
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
    color: '#fff',
    paddingLeft: 10
  }
})