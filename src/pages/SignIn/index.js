import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, SafeAreaView, Platform } from 'react-native'

const SignIn = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [type, setType] = useState(false) // ? tela de cadastro : tela de login

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
        placeholder="Qual sua senha??"
        placeholderTextColor="#99999B"
      />
      <TouchableOpacity style={[styles.buttonLogin, {backgroundColor: type? '#f53745' : '#57dd86'}]}>
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