import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default HomePage = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Greeting Section */}
      <View style={styles.header}>
        <Text style={styles.greetingText}>Hello, User!</Text>
        <Text style={styles.subText}>Recovery status based on AI analysis.</Text>
      </View>

      {/* AI-Generated Insights */}
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Recent Recovery Overview</Text>

        {/* Injury and Recovery Time Card */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <FontAwesome5 name="heartbeat" size={40} color="white" />
            <Text style={styles.statValue}>Knee Injury</Text>
            <Text style={styles.statLabel}>AI Diagnosis</Text>
          </View>

          <View style={styles.statCard}>
            <FontAwesome5 name="clock" size={40} color="white" />
            <Text style={styles.statValue}>3 Weeks</Text>
            <Text style={styles.statLabel}>Estimated Recovery</Text>
          </View>
        </View>

        {/* Recommended Exercises and Daily Goals */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <FontAwesome5 name="running" size={40} color="white" />
            <Text style={styles.statValue}>Low-Impact Cardio</Text>
            <Text style={styles.statLabel}>Recommended Exercise</Text>
          </View>

          <View style={styles.statCard}>
            <FontAwesome5 name="list-alt" size={40} color="white" />
            <Text style={styles.statValue}>5 Exercises</Text>
            <Text style={styles.statLabel}>Today’s Goals</Text>
          </View>
        </View>
      </View>

      {/* Start Exercise Button */}
      <TouchableOpacity style={styles.workoutButton}>
        <Text style={styles.buttonText}>Start Recommended Exercise</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD', // Light blue background
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3', // Standard Blue
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0D47A1', // Dark Blue
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#03A9F4', // Light Blue
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    flex: 1,
    margin: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
  workoutButton: {
    backgroundColor: '#0D47A1', // Dark Blue
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

