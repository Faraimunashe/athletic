import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig.extra;

const AICheckPage = () => {
  const [symptoms, setSymptoms] = useState('');
  const [athleteName, setAthleteName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleDiagnosis = async () => {
    if (!athleteName || !gender || !age) {
      Alert.alert('Error', 'Please fill out all fields for the athlete.');
      return;
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    const postData = {
      symptoms,
      patient: athleteName,
      gender,
      age,
      self: 0
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/new-therapy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();
      console.log(result.data);

      if (response.ok) {
        setDiagnosis(result.therapy);
        console.log(result.therapy);
        
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
        <Text style={styles.header}>AI Physiotherapy</Text>

        {diagnosis && (
          <View style={styles.resultCard}>
            <Text style={styles.resultText}>Diagnosis Result:</Text>
            <Text style={styles.diagnosisText}>
              {diagnosis.diagnosis ? diagnosis.diagnosis : 'No diagnosis available.'}
            </Text>
          </View>
        )}
        <View style={styles.card}>
          <Text style={styles.label}>Athlete Name:</Text>
          <TextInput
            style={styles.textInput}
            value={athleteName}
            onChangeText={setAthleteName}
            placeholder="Enter athlete's name"
          />

          <Text style={styles.label}>Gender:</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          <Text style={styles.label}>Age:</Text>
          <TextInput
            style={styles.textInput}
            value={age}
            onChangeText={setAge}
            placeholder="Enter age"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Describe your symptoms:</Text>
          <TextInput
            style={styles.textArea}
            value={symptoms}
            onChangeText={setSymptoms}
            placeholder="E.g. pain in the knee, swelling..."
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.diagnoseButton} onPress={handleDiagnosis} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Diagnose'}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#2196F3" style={styles.loading} />}

        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Adds shadow for Android
  },
  label: {
    fontSize: 18,
    color: '#0D47A1',
    marginBottom: 2,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 14,
    height: 50,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 14,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    color: '#0D47A1',
  },
  diagnoseButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
  resultCard: {
    backgroundColor: '#D4EDDA', // Light green background (Bootstrap success background)
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderColor: '#C3E6CB', // Success border color
    borderWidth: 1,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#155724', // Dark success green
  },
  diagnosisText: {
    fontSize: 18,
    color: '#155724',
    marginTop: 10,
  },
});

export default AICheckPage;

