import React from 'react'
import EnvioEmail from './EnvioEmail'
import createNativeStackNavigator from '@react-navigation/native-stack/src/navigators/createNativeStackNavigator';

const Stack = createNativeStackNavigator();
const EmailStack = () => {
  return (
    <>
     <Stack.Navigator>
          <Stack.Screen name="Enviar email" component={EnvioEmail} options={{ title: "Enviar email" }} />
        </Stack.Navigator>
    </>
  )
}

export default EmailStack