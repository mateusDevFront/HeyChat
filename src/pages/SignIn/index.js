import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Platform } from 'react-native'

import auth from '@react-native-firebase/auth'
import {useNavigation} from '@react-navigation/native'

const SignIn = () => {

  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [type, setType] = useState(false) // ? tela de cadastro : tela de login

  function handleLogin(){
    if(type){
      //cadastrar novo usuario
      if(name === '' || email === '' || password === '' ) return;

      auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        user.user.updateProfile({
          displayName: name
        })
        .then(() => {
          navigation.goBack()
        })
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('Email já em uso!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('Email inválido!');
        }
      })
    }else{
      //logar usuario cadastrado
      auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.goBack()
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.log('Email inválido!');
        }
    })
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logo}>HeyChat's</Text>
      <Text style={{ marginBottom: 20 }}>Faça Networking</Text>

      { type && (
        <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="Qual seu nome?"
        placeholderTextColor="#99999B"
      />
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Qual seu email?"
        placeholderTextColor="#99999B"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Qual sua senha?"
        placeholderTextColor="#99999B"
        secureTextEntry={true}  
      />
      <TouchableOpacity
      style={[styles.buttonLogin, {backgroundColor: type? '#f53745' : '#57dd86'}]}
      onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          {type ? 'Cadastrar' : 'Acessar'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={ () => setType(!type)}>
        <Text>
          {type ? 'Já possuo uma conta' : 'Criar uma nova conta'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}
export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  logo: {
    marginTop: Platform.OS === 'android' ? 55 : 80,
    fontSize: 28,
    fontWeight: 'bold'
  },
  input: {
    color: '#121212',
    backgroundColor: '#EBEBEB',
    width: '90%',
    borderRadius: 6,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 50
  },
  buttonLogin: {
    width: '90%',
    /* backgroundColor: '#121212', */
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19
  }
})