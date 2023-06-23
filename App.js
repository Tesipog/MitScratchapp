import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from './Playground';
import Actions from './ActionsScreen';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
         
         <Stack.Screen name="Scratch Editor" component={MainScreen} />
         <Stack.Screen name="Actions" component={Actions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
