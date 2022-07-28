import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import {useNavigation} from '@react-navigation/native'

import Feather from 'react-native-vector-icons/Feather'

function Header({title, color}) {

    const navigation = useNavigation()

    return (
        <View style={styles.header}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 18
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather
                        name="arrow-left"
                        size={32}
                        color={color}
                    />
                </TouchableOpacity>
                <Text style={[styles.titleHeader]}>{title}</Text>
            </View>
        </View>
    )
}
export default Header

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#E47004',
        height: 70,
        paddingHorizontal: 10,
    },
    titleHeader: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: 15
    }
})