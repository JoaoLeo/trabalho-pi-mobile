import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import GastosPorEstados from './GastosPorEstados';

const Stack = createNativeStackNavigator();
const GastosPorEstadosStack = () => {
  return (
    <>
        <Stack.Navigator>
          <Stack.Screen name="Gastos por estado" component={GastosPorEstados} options={{ title: "Gastos por estado" }} />
        </Stack.Navigator>
    </>
  )
}

export default GastosPorEstadosStack