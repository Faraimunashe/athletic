import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HistoryPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) return;
      try {
        const response = await fetch('http://170.187.142.37:8011/api/v1/history', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setSessions(data.history);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const openModal = (session) => {
    setSelectedSession(session);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedSession(null);
  };

  const renderSessionItem = ({ item }) => (
    <TouchableOpacity style={styles.sessionItem} onPress={() => openModal(item)}>
      <Text style={styles.sessionDate}>{item.created_at}</Text>
      <Text style={styles.sessionDiagnosis}>{item.diagnosis}</Text>
      <Text style={styles.sessionRecoveryTime}>Recovery Time: {item.recover_time}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0D47A1" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Past AI Physiotherapy Sessions</Text>

      {/* FlatList to display past sessions */}
      <FlatList
        data={sessions}
        renderItem={renderSessionItem}
        keyExtractor={(item) => item.id}
      />

      {/* Modal for detailed session view */}
      {selectedSession && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeader}>{selectedSession.diagnosis}</Text>
              <Text style={styles.modalDetail}>Date: <Text style={styles.boldText}>{selectedSession.created_at}</Text></Text>
              <Text style={styles.modalDetail}>Recovery Time: <Text style={styles.boldText}>{selectedSession.recover_time}</Text></Text>
              <Text style={styles.modalDetail}>Recommended Exercises: <Text style={styles.boldText}>{selectedSession.exercises}</Text></Text>
              <Text style={styles.modalDetail}>Details: <Text style={styles.boldText}>{selectedSession.symptoms}</Text></Text>

              {/* Athlete Information Section */}
              <View style={styles.athleteInfoContainer}>
                <Text style={styles.athleteHeader}>Athlete Information</Text>
                <Text style={styles.modalDetail}>Name: <Text style={styles.boldText}>{selectedSession.patient}</Text></Text>
              </View>

              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
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
  sessionItem: {
    backgroundColor: '#fff',
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
  sessionDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  sessionDiagnosis: {
    fontSize: 16,
    color: '#333',
    marginVertical: 5,
  },
  sessionRecoveryTime: {
    fontSize: 14,
    color: '#888',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better visibility
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    width: '90%', // Width of modal
    elevation: 5, // Add some elevation
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  modalDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#0D47A1', // Make highlighted text match the theme color
  },
  athleteInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E1F5FE', // Light blue background for athlete info
    borderRadius: 10,
  },
  athleteHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#FF5722', // Red button for emphasis
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default HistoryPage;
