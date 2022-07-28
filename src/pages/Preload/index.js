import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
    SafeAreaView,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet
} from 'react-native'

import { useStateValue } from '../../contexts/StateContext'
import api from '../../services/api'

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue()

    useEffect(() => {
        const checkLogin = async () => {
            let token = await api.getToken()
            if (token) {
                let result = await api.validationToken();
                if (result.error === '') {
                    dispatch({
                        type: 'setUser',
                        payload: {
                            user: result.user
                        }
                    })
                    navigation.reset({
                        index: 1,
                        routes: [{ name: 'ChoosePropertyScreen' }]
                    })
                } else {
                    console.log(result.error)
                    dispatch({
                        type: 'setToken',
                        payload: {
                            token: ''
                        }
                    })
                    navigation.reset({
                        index: 1,
                        routes: [{ name: 'SignIn' }]
                    })
                }
            } else {
                navigation.reset({
                    index: 1,
                    routes: [{ name: 'SignIn' }]
                })
            }
        }
        checkLogin();
    }, [])

    async function logout(){
        await api.logout()
        navigation.reset({
            index: 1,
            routes: [{ name: 'SignIn' }]
        })
    }

    return (
        <SafeAreaView>
            <ActivityIndicator color="#00FF75" size="large" />
            <TouchableOpacity title="sair" onPress={logout} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }
})