import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import DeputadosStack from './screens/deputados/DeputadosStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AnaliseGastosStack from './screens/gastos/AnaliseGastosStack';
import GastosPorEstadosStack from './screens/gastos-pro-estado/GastosPorEstadosStack';

const Tab = createMaterialBottomTabNavigator();
export default function App() {
  return (
    <>
      <PaperProvider>       
      <NavigationContainer>
      <Tab.Navigator
      barStyle={{ backgroundColor: '#198754' }}>
      <Tab.Screen 
      name='deputados' 
      component={DeputadosStack}
      activeColor="#198754"
      options={{
        tabBarLabel: 'Deputados',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-tie" color={color} size={26} />
        ),
      }}/>
       <Tab.Screen 
      name='analise' 
      component={AnaliseGastosStack}
      activeColor="#198754"
      options={{
        tabBarLabel: 'Análise',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="google-analytics" color={color} size={26} />
        ),
      }}/>
      <Tab.Screen 
      name='gastos' 
      component={GastosPorEstadosStack}
      activeColor="#198754"
      options={{
        tabBarLabel: 'Gastos',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="cash-multiple" color={color} size={26} />
        ),
      }}/>
    </Tab.Navigator>

      </NavigationContainer>
   </PaperProvider>
    </>
  )
};

