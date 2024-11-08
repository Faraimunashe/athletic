import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

const { API_URL } = Constants.expoConfig.extra;

export default HomePage = () => {
  const [userData, setUserData] = useState(null);
  const [lastTherapy, setLastTherapy] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [counts, setCounts] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/dashboard`, {
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
        setExercises(data.exercises);
        setCounts(data.exercise_count)
      } else {
        console.log('Error fetching user data');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserData();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0D47A1" />
        <Text style={styles.loadingText}>Loading data ...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} 
          colors={['#0D47A1']}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greetingText}>Welcome back, {userData?.name || 'User'}!</Text>
        <Text style={styles.subText}>Your recovery insights at a glance</Text>
      </View>

      <View style={styles.contentContainer}>
        {/* Display insight cards */}
        {lastTherapy && (
          <View style={styles.statsContainer}>
            <Text style={styles.sectionTitle}>Recovery Insights</Text>

            <View style={styles.statCard}>
              <View style={styles.blueBorder} />
              <FontAwesome5 name="heartbeat" size={30} color="#333333" />
              <Text style={styles.statValue}>{lastTherapy.diagnosis ?? "-"}</Text>
              <Text style={styles.statLabel}>AI Diagnosis</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.blueBorder} />
              <FontAwesome5 name="clock" size={30} color="#333333" />
              <Text style={styles.statValue}>{lastTherapy.recover_time ?? "-"}</Text>
              <Text style={styles.statLabel}>Estimated Recovery</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.blueBorder} />
              <FontAwesome5 name="running" size={30} color="#333333" />
              <Text style={styles.statValue}>{lastTherapy.exercises ?? "-"}</Text>
              <Text style={styles.statLabel}>Recommended Exercise</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.blueBorder} />
              <FontAwesome5 name="list-alt" size={30} color="#333333" />
              <Text style={styles.statValue}>{counts}</Text>
              <Text style={styles.statLabel}>Today’s Goals</Text>
            </View>
          </View>
        )}

        {/* Display action buttons */}
        {lastTherapy && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() => navigation.navigate('Exercise', { therapyId: lastTherapy.id })}
            >
              <Text style={styles.buttonText}>Start Today’s Goals</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navigationButtonSecondary}
              onPress={() => navigation.navigate('Recovery', { therapyId: lastTherapy.id })}
            >
              <Text style={styles.buttonText}>Are You Recovering?</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Display exercises list */}
        <View style={styles.exercisesContainer}>
          <Text style={styles.sectionTitle}>Exercises Done</Text>
          {exercises.map((exercise) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDuration}>
                Duration: {exercise.duration_minutes ? `${exercise.duration_minutes} mins` : 'N/A'}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
  },
  header: {
    padding: 25,
    backgroundColor: '#1976D2',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  greetingText: {
    fontSize: 28,
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
  contentContainer: {
    padding: 20,
  },
  statsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 10,
  },
  statCard: {
    backgroundColor: '#F1F3F4', // Greyish white background
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 }, // Stronger shadow
    shadowOpacity: 0.4, // Increased shadow opacity
    shadowRadius: 10, // Larger shadow radius for more depth
    elevation: 10,
  },
  blueBorder: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 5,
    backgroundColor: '#0D47A1', // Blue border at the top
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333', // Darker text for better contrast
    marginTop: 8,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666666', // Slightly darker grey for labels
    marginTop: 4,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFB',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0D47A1',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  navigationButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  navigationButtonSecondary: {
    backgroundColor: '#64B5F6',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: 'center',
    width: '80%',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exercisesContainer: {
    marginTop: 20,
  },
  exerciseCard: {
    backgroundColor: '#F1F3F4',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  exerciseDuration: {
    fontSize: 16,
    color: '#555',
    marginTop: 5,
  },
});
