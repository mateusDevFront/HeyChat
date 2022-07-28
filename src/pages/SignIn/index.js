import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from 'react-native'

import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'

import Header from '../../components/Header'

const SignIn = () => {

  const navigation = useNavigation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(true)
  const [loadingAuth, setLoadingAuth] = useState(false)

  const [type, setType] = useState(false) // ? tela de cadastro : tela de login

  function handleLogin() {
    if (type) {
      //cadastrar novo usuario
      if (name === '' || email === '' || password === '') return;
      setLoadingAuth(true)
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.updateProfile({
            displayName: name
          })
            .then(() => {
              navigation.goBack()
            })
          setLoadingAuth(false)
        })
        .catch((error) => {
          setLoadingAuth(false)
        })
    } else {
      //logar usuario cadastrado
      setLoadingAuth(true)
      auth().signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.goBack()
        })
      setLoadingAuth(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login" color="#fff" />
      <Text style={styles.logo}>HeyChat</Text>
      <Text style={{ marginBottom: 100 }}>Crie Networking com outros dev's</Text>

      {type && (
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Primeiro nome"
          placeholderTextColor="#99999B"
        />
      )}
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="E-mail"
        placeholderTextColor="#99999B"
      />

      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Senha"
        placeholderTextColor="#99999B"
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={[styles.buttonLogin, { backgroundColor: type ? '#E47004' : '#E47004' }]}
        onPress={handleLogin}
      >
        {loadingAuth ? (
          <ActivityIndicator size={20} color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {type ? 'Cadastrar' : 'Acessar'}
          </Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setType(!type)}>
        <Text>
          {type ? 'Já possui uma conta? Faça login!' : 'Deseja criar uma nova conta?'}
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
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E47004'
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