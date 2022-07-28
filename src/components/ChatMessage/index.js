import React, {useMemo} from "react";
import { View, Text, StyleSheet } from 'react-native'

import auth from '@react-native-firebase/auth';

function ChatMessage({ data, route }) {

    const user = auth().currentUser.toJSON()

    const isMyMessage = useMemo(() => {
        return data?.user?._id === user.uid
    }, [data])


    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage ? '#ddf9c1' : '#fff',
                    marginLeft: isMyMessage ? 50 : 0,
                    marginRight: isMyMessage ? 0 : 50
                }
                ]}>

                {!isMyMessage &&
                <Text style={styles.name}>{data?.user?.displayName}</Text>         
                }
                <Text style={styles.message}>{data.text}</Text>

            </View>
        </View>
    )
}
export default ChatMessage

const styles = StyleSheet.create({
    container: {
        padding: 8,
    },
    messageBox: {
        borderRadius: 5,
        padding: 10,
    },
    name: {
        color: '#E47004',
        fontWeight: 'bold',
        marginBottom: 5
    },
    message: {
    }
})