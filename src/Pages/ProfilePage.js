import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Assume AuthContext exists and provides user data and logout functionality
const AuthContext = React.createContext({
  user: {
    username: 'Faraimunashe', // Example data
    email: 'farai@gmail.com',
    phone: '123-456-7890',
    gender: 'Male',
    dob: '1990-01-01',
    dateJoined: '2023-01-01'
  },
  logout: () => {}, // Mock logout function
});

const ProfilePage = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            logout(); // Call the logout function
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleChangePassword = () => {
    // Navigate to Change Password screen or show a modal for changing password
    Alert.alert('Change Password', 'Navigate to Change Password screen or show modal here.');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Profile Information</Text>

      <Image source={require('../../assets/userr.jpg')} style={styles.userImage} />

      {/* Username */}
      <Text style={styles.username}>{user.username}</Text>
      <Text style={styles.email}>{user.email}</Text>

      {/* User Information Cards */}
      <View style={styles.card}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.info}>{user.phone}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.info}>{user.gender}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date of Birth:</Text>
        <Text style={styles.info}>{user.dob}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date Joined:</Text>
        <Text style={styles.info}>{user.dateJoined}</Text>
      </View>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Ionicons name="key" size={20} color="white" />
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
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
    backgroundColor: '#E3F2FD', // Light blue background
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1', // Dark blue
    textAlign: 'center',
    marginBottom: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Makes the image circular
    alignSelf: 'center', // Centers the image
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center', // Centers the username
  },
  email: {
    fontSize: 16,
    color: '#888', // Faint color for email
    textAlign: 'center', // Centers the email
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff', // White background for cards
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#90CAF9', // Light blue border
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // For Android shadow
  },
  label: {
    fontSize: 16,
    color: '#0D47A1',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#333', // Darker text for info
  },
  button: {
    backgroundColor: '#2196F3', // Blue button
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
    marginLeft: 10, // Spacing between icon and text
  },
  logoutButton: {
    backgroundColor: '#E53935',
    marginBottom: 20
  },
});

export default ProfilePage;
