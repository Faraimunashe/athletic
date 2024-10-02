import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from '../Pages/HomePage';
import AICheckPage from '../Pages/AICheckPage';
import ProfilePage from '../Pages/ProfilePage';
import HistoryPage from '../Pages/HistoryPage';

const Tab = createBottomTabNavigator();

export default function DashNav({ navigation }) {
  return (
        <Tab.Navigator independent={true}>
            <Tab.Screen 
                name="Home" 
                component={HomePage} 
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                      <Ionicons name="home" color={'#0D47A1'} size={25} />
                    ),
                    tabBarActiveTintColor: '#0D47A1',
                }}
            />
            <Tab.Screen 
                name="Physiotherapy" 
                component={AICheckPage} 
                options={{
                    tabBarLabel: 'Physiotherapy',
                    tabBarIcon: () => (
                      <Ionicons name="medkit" color={'#0D47A1'} size={25} />
                    ),
                    tabBarActiveTintColor: '#0D47A1',
                }}
            />
            <Tab.Screen 
                name="History" 
                component={HistoryPage} 
                options={{
                    tabBarLabel: 'History',
                    tabBarIcon: () => (
                      <Ionicons name="list" color={'#0D47A1'} size={25} />
                    ),
                    tabBarActiveTintColor: '#0D47A1',
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfilePage} 
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: () => (
                      <Ionicons name="person-circle" color={'#0D47A1'} size={25} />
                    ),
                    tabBarActiveTintColor: '#0D47A1',
                }}
            />
        </Tab.Navigator>
  );
}