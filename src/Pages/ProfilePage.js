import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const AuthContext = React.createContext({
  logout: () => {},
});

const ProfilePage = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Activity indicator state
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Fetch profile data from the API
  const fetchProfileData = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://170.187.142.37:8011/api/v1/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        console.log('Error fetching profile data');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchProfileData();
    setRefreshing(false);
  };

  // Handle logout
  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('authToken');
    
    if (!token) {
      Alert.alert('Error', 'No token found.');
      return;
    }
  
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const response = await fetch('http://170.187.142.37:8011/api/v1/logout', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                },
              });
  
              if (response.ok) {
                await AsyncStorage.removeItem('authToken');
                navigation.navigate('AuthNav');
              } else {
                Alert.alert('Logout Failed', 'Could not log out. Please try again.');
              }
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Something went wrong. Please try again.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };
  

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#4CAF50']} />
      }
    >
      <Text style={styles.header}>Profile Information</Text>

      <Image source={require('../../assets/userr.jpg')} style={styles.userImage} />

      <Text style={styles.username}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.info}>{user.phone}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date Joined:</Text>
        <Text style={styles.info}>{user.created_at}</Text>
      </View>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="white" />
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#0D47A1',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: '#E53935',
    marginBottom: 20,
  },
});

export default ProfilePage;
