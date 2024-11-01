import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfilePage from '../Pages/ProfilePage';
import AuthNav from './AuthNav';


const Stack = createStackNavigator();

export default function ProfileNav() {
  return (
    <NavigationContainer independent={true}>
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: false }}/>
            <Stack.Screen name="AuthNav" component={AuthNav} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}