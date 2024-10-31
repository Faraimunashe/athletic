import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';

export default HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [lastTherapy, setLastTherapy] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://170.187.142.37:8011/api/v1/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
        setLastTherapy(data.last_record);
      } else {
        console.log('Error fetching user data');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text>Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Greeting Section */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Welcome back, {userData?.name || 'User'}!</Text>
        <Text style={styles.subText}>Your recovery insights</Text>
      </View>

      {/* AI-Generated Insights or Placeholder */}
      {lastTherapy ? (
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Recovery Insights</Text>

          {/* Injury and Recovery Time Card */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <FontAwesome5 name="heartbeat" size={35} color="white" />
              <Text style={styles.statValue}>{lastTherapy.diagnosis ?? "-"}</Text>
              <Text style={styles.statLabel}>AI Diagnosis</Text>
            </View>

            <View style={styles.statCard}>
              <FontAwesome5 name="clock" size={35} color="white" />
              <Text style={styles.statValue}>{lastTherapy.recover_time ?? "-"}</Text>
              <Text style={styles.statLabel}>Estimated Recovery</Text>
            </View>
          </View>

          {/* Recommended Exercises and Daily Goals */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <FontAwesome5 name="running" size={35} color="white" />
              <Text style={styles.statValue}>{lastTherapy.exercises ?? "-"}</Text>
              <Text style={styles.statLabel}>Recommended Exercise</Text>
            </View>

            <View style={styles.statCard}>
              <FontAwesome5 name="list-alt" size={35} color="white" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Today’s Goals</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <FontAwesome5 name="info-circle" size={50} color="#9E9E9E" />
          <Text style={styles.placeholderText}>No recent recovery data found.</Text>
          <Text style={styles.placeholderSubText}>
            Begin a new session to receive customized insights tailored just for you.
          </Text>
        </View>
      )}

      {/* Start Exercise Button */}
      {/* <TouchableOpacity style={styles.workoutButton}>
        <Text style={styles.buttonText}>Start Recommended Exercise</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#1976D2',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  greetingText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#BBDEFB',
    textAlign: 'center',
    marginTop: 5,
  },
  statsContainer: {
    padding: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 8,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: 'white',
    marginTop: 4,
    textAlign: 'center',
  },
  workoutButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderContainer: {
    padding: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 4,
  },
  placeholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#616161',
    textAlign: 'center',
    marginVertical: 10,
  },
  placeholderSubText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});
