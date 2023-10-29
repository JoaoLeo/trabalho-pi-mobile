import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AnaliseGastos from './AnaliseGastos';
const Stack = createNativeStackNavigator();
const AnaliseGastosStack = () => {
  return (
    <>
        <Stack.Navigator>
          <Stack.Screen name="Gastos por estado" component={AnaliseGastos} options={{ title: "Gastos por estado" }} />
        </Stack.Navigator>
    </>
  )
}

export default AnaliseGastosStack