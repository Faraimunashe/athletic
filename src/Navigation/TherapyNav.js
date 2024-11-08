import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../Pages/HomePage';
import ExercisePage from '../Pages/ExercisePage';
import RecoveryPage from '../Pages/RecoveryPage';


const Stack = createStackNavigator();

export default function TherapyNav() {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false }}/>
            <Stack.Screen name="Exercise" component={ExercisePage} options={{ headerShown: true }}/>
            <Stack.Screen name="Recovery" component={RecoveryPage} options={{ headerShown: true }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}