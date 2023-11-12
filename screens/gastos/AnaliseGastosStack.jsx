import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import AnaliseGastos from './AnaliseGastos';
const Stack = createNativeStackNavigator();
const AnaliseGastosStack = () => {
  return (
    <>
        <Stack.Navigator>
          <Stack.Screen name="Analise de gastos" component={AnaliseGastos} options={{ title: "Análise de gastos" }} />
        </Stack.Navigator>
    </>
  )
}

export default AnaliseGastosStack