import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';

// Sample data for past AI physiotherapy sessions
const pastSessions = [
  {
    id: '1',
    date: '2024-09-01',
    diagnosis: 'Sprained Ankle',
    recoveryTime: '2 weeks',
    exercises: 'Rest, Ice, Compression, Elevation',
    details: 'A mild sprain of the ankle with no fractures. Recommended rest and gradual reintroduction of movement.',
    athlete: {
      name: 'Faraimunashe Manjeese',
      age: 25,
      gender: 'Male',
    },
  },
  {
    id: '2',
    date: '2024-08-15',
    diagnosis: 'Tennis Elbow',
    recoveryTime: '4 weeks',
    exercises: 'Stretching and Strengthening exercises',
    details: 'Inflammation of the elbow caused by repetitive strain. Suggested physical therapy sessions.',
    athlete: {
      name: 'Jane Smith',
      age: 30,
      gender: 'Female',
    },
  },
  {
    id: '3',
    date: '2024-09-01',
    diagnosis: 'Sprained Ankle',
    recoveryTime: '2 weeks',
    exercises: 'Rest, Ice, Compression, Elevation',
    details: 'A mild sprain of the ankle with no fractures. Recommended rest and gradual reintroduction of movement.',
    athlete: {
      name: 'Faraimunashe Manjeese',
      age: 25,
      gender: 'Male',
    },
  },
  {
    id: '4',
    date: '2024-08-15',
    diagnosis: 'Tennis Elbow',
    recoveryTime: '4 weeks',
    exercises: 'Stretching and Strengthening exercises',
    details: 'Inflammation of the elbow caused by repetitive strain. Suggested physical therapy sessions.',
    athlete: {
      name: 'Jane Smith',
      age: 30,
      gender: 'Female',
    },
  },
  {
    id: '5',
    date: '2024-09-01',
    diagnosis: 'Sprained Ankle',
    recoveryTime: '2 weeks',
    exercises: 'Rest, Ice, Compression, Elevation',
    details: 'A mild sprain of the ankle with no fractures. Recommended rest and gradual reintroduction of movement.',
    athlete: {
      name: 'Faraimunashe Manjeese',
      age: 25,
      gender: 'Male',
    },
  },
  {
    id: '6',
    date: '2024-08-15',
    diagnosis: 'Tennis Elbow',
    recoveryTime: '4 weeks',
    exercises: 'Stretching and Strengthening exercises',
    details: 'Inflammation of the elbow caused by repetitive strain. Suggested physical therapy sessions.',
    athlete: {
      name: 'Jane Smith',
      age: 30,
      gender: 'Female',
    },
  },
];

const HistoryPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

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
      <Text style={styles.sessionDate}>{item.date}</Text>
      <Text style={styles.sessionDiagnosis}>{item.diagnosis}</Text>
      <Text style={styles.sessionRecoveryTime}>Recovery Time: {item.recoveryTime}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Past AI Physiotherapy Sessions</Text>

      {/* FlatList to display past sessions */}
      <FlatList
        data={pastSessions}
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
              <Text style={styles.modalDetail}>Date: <Text style={styles.boldText}>{selectedSession.date}</Text></Text>
              <Text style={styles.modalDetail}>Recovery Time: <Text style={styles.boldText}>{selectedSession.recoveryTime}</Text></Text>
              <Text style={styles.modalDetail}>Recommended Exercises: <Text style={styles.boldText}>{selectedSession.exercises}</Text></Text>
              <Text style={styles.modalDetail}>Details: <Text style={styles.boldText}>{selectedSession.details}</Text></Text>

              {/* Athlete Information Section */}
              <View style={styles.athleteInfoContainer}>
                <Text style={styles.athleteHeader}>Athlete Information</Text>
                <Text style={styles.modalDetail}>Name: <Text style={styles.boldText}>{selectedSession.athlete.name}</Text></Text>
                <Text style={styles.modalDetail}>Age: <Text style={styles.boldText}>{selectedSession.athlete.age}</Text></Text>
                <Text style={styles.modalDetail}>Gender: <Text style={styles.boldText}>{selectedSession.athlete.gender}</Text></Text>
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
});

export default HistoryPage;
