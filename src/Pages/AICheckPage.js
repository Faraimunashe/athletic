import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import the Picker component

// Assume AuthContext exists and provides current user data
const AuthContext = React.createContext({
  user: { name: 'John Doe', gender: 'Male', age: 28 }, // Example current user data
});

export default AICheckPage = () => {
  const { user } = useContext(AuthContext);
  const [symptoms, setSymptoms] = useState('');
  const [athleteName, setAthleteName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [isCurrentUser, setIsCurrentUser] = useState(true); // Toggle to determine if the athlete is the current user
  const [loading, setLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState('');

  const handleDiagnosis = () => {
    if (!isCurrentUser && (!athleteName || !gender || !age)) {
      Alert.alert('Error', 'Please fill out all fields for the athlete.');
      return;
    }

    // Mockup function to simulate an AI diagnosis
    setLoading(true);
    setTimeout(() => {
      setDiagnosis('The AI suggests that you may have a sprained ankle. Estimated recovery time is 2 weeks.');
      setLoading(false);
    }, 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Page Header */}
        <Text style={styles.header}>AI Physiotherapy</Text>

        {/* Toggle for current user or different athlete */}
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

        {/* Athlete Info Input (Required if not the current user) */}
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

        {/* Symptom Input */}
        <Text style={styles.label}>Describe your symptoms:</Text>
        <TextInput
          style={styles.textArea}
          value={symptoms}
          onChangeText={setSymptoms}
          placeholder="E.g. pain in the knee, swelling..."
          multiline
          numberOfLines={4}
        />

        {/* Diagnose Button */}
        <TouchableOpacity style={styles.diagnoseButton} onPress={handleDiagnosis} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Diagnose'}</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        {loading && <ActivityIndicator size="large" color="#2196F3" style={styles.loading} />}

        {/* Diagnosis Result */}
        {diagnosis !== '' && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Diagnosis Result:</Text>
            <Text style={styles.diagnosisText}>{diagnosis}</Text>
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
  label: {
    fontSize: 18,
    color: '#0D47A1',
    marginBottom: 2,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#90CAF9', // Light blue border
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 14,
    textAlignVertical: 'top',
    height: 50
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#90CAF9', // Light blue border
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 14,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#90CAF9', // Light blue border
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    color: '#0D47A1',
  },
  diagnoseButton: {
    backgroundColor: '#2196F3', // Blue button
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
    backgroundColor: '#BBDEFB', // Light blue inactive
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 40
  },
  toggleButtonActive: {
    backgroundColor: '#2196F3', // Blue active
    padding: 10,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
    height: 40
  },
});
