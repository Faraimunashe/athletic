import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext({
  user: { name: 'John Doe', gender: 'Male', age: 28 },
});

const AICheckPage = () => {
  const { user } = useContext(AuthContext);
  const [symptoms, setSymptoms] = useState('');
  const [athleteName, setAthleteName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const handleDiagnosis = async () => {
    if (!isCurrentUser && (!athleteName || !gender || !age)) {
      Alert.alert('Error', 'Please fill out all fields for the athlete.');
      return;
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    const postData = {
      symptoms,
      patient: isCurrentUser ? user.name : athleteName,
      gender: isCurrentUser ? user.gender : gender,
      age: isCurrentUser ? user.age : age,
      self: isCurrentUser ? 1 : 0
    };

    setLoading(true);

    try {
      const response = await fetch('http://170.187.142.37:8011/api/v1/physiotherapy', {
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
        setDiagnosis(result.data); // Adjust based on API's response structure
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

        <View style={styles.toggleContainer}>
          <Text style={styles.label}>Is this for the current user?</Text>
          <View style={styles.toggleButtonContainer}>
            <TouchableOpacity
              style={isCurrentUser ? styles.toggleButtonActive : styles.toggleButton}
              onPress={() => setIsCurrentUser(true)}
            >
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={!isCurrentUser ? styles.toggleButtonActive : styles.toggleButton}
              onPress={() => setIsCurrentUser(false)}
            >
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {!isCurrentUser && (
          <>
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
          </>
        )}

        <Text style={styles.label}>Describe your symptoms:</Text>
        <TextInput
          style={styles.textArea}
          value={symptoms}
          onChangeText={setSymptoms}
          placeholder="E.g. pain in the knee, swelling..."
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.diagnoseButton} onPress={handleDiagnosis} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Diagnose'}</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator size="large" color="#2196F3" style={styles.loading} />}

        {diagnosis && ( // Check if diagnosis exists and is not null
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Diagnosis Result:</Text>
            {/* Adjust based on what part of the diagnosis you want to display */}
            <Text style={styles.diagnosisText}>
              {/* Assuming diagnosis is an object with relevant keys; extract as needed */}
              {diagnosis.diagnosis ? diagnosis.diagnosis : 'No diagnosis available.'}
            </Text>
          </View>
        )}
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
    backgroundColor: '#E3F2FD',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
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
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 20,
  },
  resultContainer: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0D47A1',
    marginTop: 30,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  diagnosisText: {
    fontSize: 18,
    color: '#0D47A1',
    marginTop: 10,
  },
  toggleContainer: {
    marginBottom: 20,
  },
  toggleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  toggleButton: {
    backgroundColor: '#BBDEFB',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 40,
  },
  toggleButtonActive: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 40,
  },
});

export default AICheckPage;
