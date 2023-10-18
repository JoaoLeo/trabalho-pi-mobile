import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Deputados from './screens/deputados/Deputados';
import DeputadosDetalhes from './screens/deputados/DeputadosDetalhes';


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Deputados" component={Deputados} options={{ title: "Deputados" }} />
          <Stack.Screen name="Detalhes-deputados" component={DeputadosDetalhes} options={{ title: "Detalhes-deputados" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
};

