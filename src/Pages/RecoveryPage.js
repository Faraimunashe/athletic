import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig.extra;

const RecoveryPage = ({ navigation, route }) => {
  const { therapyId } = route.params;
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRecovery = async () => {
    if (!description) {
      Alert.alert('Error', 'Please enter a description.');
      return;
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    const postData = {
      therapy_id: therapyId,
      description,
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/new-recovery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'New recovery created successfully.');
        // Optionally, clear the form or navigate away
      } else {
        Alert.alert('Error', result.message || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>How are you feeling now?</Text>
        
        <View style={styles.card}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.textArea}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter recovery description"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.createButton} onPress={handleCreateRecovery} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Recovery'}</Text>
          </TouchableOpacity>

          {loading && <ActivityIndicator size="large" color="#2196F3" style={styles.loading} />}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#E3F2FD',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  label: {
    fontSize: 16,
    color: '#0D47A1',
    marginBottom: 8,
    fontWeight: '600',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  createButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
});

export default RecoveryPage;
