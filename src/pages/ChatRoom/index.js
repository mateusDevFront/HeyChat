import React from 'react'
import { View, Text, Button } from 'react-native'

import auth from "@react-native-firebase/auth"
import {useNavigation} from "@react-navigation/native"

const ChatRoom = () => {

  const navigation = useNavigation()
  return (
    <View>
      <Text>CHAT ROOM</Text>
      <Button title="login" onPress={() => navigation.navigate('SignIn')}/>
    </View>
  )
}

export default ChatRoom