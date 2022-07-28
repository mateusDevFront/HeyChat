import React from 'react'
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import SignIn from '../pages/SignIn'
import ChatRoom from '../pages/ChatRoom'
import Messages from '../pages/Messages'

const AppStack = createNativeStackNavigator()

function AppRoutes(){
    return(
        <AppStack.Navigator initialRouteName="ChatRoom">
            <AppStack.Screen
            name="SignIn"
            component={SignIn}
            options={{
                headerShown: false
            }}
            />
            <AppStack.Screen
            name="ChatRoom"
            component={ChatRoom}
            options={{
                headerShown: false
            }}
            />
            <AppStack.Screen
            name="Messages"
            component={Messages}
            options={({route}) => ({
                headerShown: false
                /* title: 'Chat: ' + route.params?.thread.name */
            })}
            />
        </AppStack.Navigator>
    )
}
export default AppRoutes