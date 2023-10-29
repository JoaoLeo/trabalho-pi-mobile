import React from 'react'
import Deputados from './Deputados'
import DeputadosDetalhes from './DeputadosDetalhes'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();
const DeputadosStack = () => {
  return (
    <>
    <Stack.Navigator>
          <Stack.Screen name="Deputados" component={Deputados} options={{ title: "Deputados" }} />
          <Stack.Screen name="Detalhes-deputados" component={DeputadosDetalhes} options={{ title: "Detalhes-deputados" }} />
        </Stack.Navigator>
    </>
  )
}

export default DeputadosStack