import React, { useState } from 'react'
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
import { useNavigation } from "@react-navigation/native"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import FabButton from '../../components/FabButton'
import ModalNewRoom from '../../components/ModalNewRoom'

const ChatRoom = () => {

  const navigation = useNavigation()

  const [modal, setModal] = useState(false)

  function handleSignOut() {
    auth()
      .signOut()
      .then(() => {
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
          <TouchableOpacity onPress={handleSignOut}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Grupos</Text>
        </View>

        <TouchableOpacity>
          <MaterialIcons name="search" size={29} color="#fff" />
        </TouchableOpacity>

      </View>

      <FabButton setVisible={() => setModal(true)} />

      <Modal visible={modal} animationType="slide" transparent={true}>
        <ModalNewRoom setVisible={() => setModal(false)}/>
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