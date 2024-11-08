import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig.extra;

const ExercisePage = ({ route, navigation }) => {
  const { therapyId } = route.params;
  const [exerciseName, setExerciseName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateExercise = async () => {
    if (!exerciseName) {
      Alert.alert('Error', 'Please enter the exercise name.');
      return;
    }

    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    const startDateTime = new Date(startDate);
    startDateTime.setHours(startTime.getHours());
    startDateTime.setMinutes(startTime.getMinutes());

    const endDateTime = new Date(endDate);
    endDateTime.setHours(endTime.getHours());
    endDateTime.setMinutes(endTime.getMinutes());

    const postData = {
      therapy_id: therapyId,
      name: exerciseName,
      start_time: startDateTime.toISOString(),
      end_time: endDateTime.toISOString(),
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/new-exercise`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(postData),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'New exercise created successfully.');
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
        <Text style={styles.header}>What was the exercise</Text>
        <View style={styles.card}>
          <Text style={styles.label}>Exercise Name</Text>
          <TextInput
            style={styles.textInput}
            value={exerciseName}
            onChangeText={setExerciseName}
            placeholder="Enter Exercise Name"
          />

          <Text style={styles.label}>Start Date</Text>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.buttonText}>{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === 'android' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowStartDatePicker(false);
                if (selectedDate) setStartDate(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.dateButton}>
            <Text style={styles.buttonText}>{startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display={Platform.OS === 'android' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowStartTimePicker(false);
                if (selectedTime) setStartTime(selectedTime);
              }}
            />
          )}

          <Text style={styles.label}>End Date</Text>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.dateButton}>
            <Text style={styles.buttonText}>{endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === 'android' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowEndDatePicker(false);
                if (selectedDate) setEndDate(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.dateButton}>
            <Text style={styles.buttonText}>{endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display={Platform.OS === 'android' ? 'spinner' : 'default'}
              onChange={(event, selectedTime) => {
                setShowEndTimePicker(false);
                if (selectedTime) setEndTime(selectedTime);
              }}
            />
          )}

          <TouchableOpacity style={styles.createButton} onPress={handleCreateExercise} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Creating...' : 'Create Exercise'}</Text>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // for Android shadow
  },
  label: {
    fontSize: 16,
    color: '#0D47A1',
    marginBottom: 5,
    marginTop: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  dateButton: {
    backgroundColor: '#BBDEFB',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  createButton: {
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
});

export default ExercisePage;
