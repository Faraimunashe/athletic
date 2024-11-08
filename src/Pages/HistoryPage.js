import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const { API_URL } = Constants.expoConfig.extra;

const HistoryPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchSessions = async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/therapies`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSessions();
  };

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

  if (loading && !refreshing) {
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

      <FlatList
        data={sessions}
        renderItem={renderSessionItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

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
    backgroundColor: '#F0F8FF',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
  },
  sessionItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#90CAF9',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  sessionDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  sessionDiagnosis: {
    fontSize: 16,
    color: '#333',
    marginVertical: 8,
  },
  sessionRecoveryTime: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    width: '90%',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 15,
  },
  modalDetail: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  athleteInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E1F5FE',
    borderRadius: 10,
  },
  athleteHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0D47A1',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#0288D1',
    paddingVertical: 12,
    borderRadius: 25,
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
