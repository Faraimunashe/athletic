import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Text, TextInput, TouchableWithoutFeedback, View, TouchableOpacity, ActivityIndicator, Platform } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import AlertBox from "../Components/AlertBox";
import SuccessAlertBox from "../Components/SuccessAlertBox";
import Constants from 'expo-constants';
import styles from "./style";

const { API_URL, APP_ENV } = Constants.expoConfig.extra;

export default function RegisterPage({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState(new Date());
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [errorMessageText, setErrorMessageText] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);
  const [successMessageText, setSuccessMessageText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  const isEligible = (date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    return age > 18 || (age === 18 && m >= 0);
  };

  const onLoginPress = async () => {
    if (!username || !email || !password || !passwordConfirmation) {
      setErrorMessage(true);
      setErrorMessageText('Every field must not be empty!');
      return;
    }

    if (!isEligible(dob)) {
      setErrorMessage(true);
      setErrorMessageText('You must be 18 years or older to register.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(false);
    setSuccessMessage(false);

    const data = {
      name: username,
      email: email,
      dob: `${dob.getFullYear()}/${String(dob.getMonth() + 1).padStart(2, '0')}/${String(dob.getDate()).padStart(2, '0')}`,
      password: password,
      password_confirmation: passwordConfirmation
    };

    try {
      const response = await fetch(API_URL + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();
        setErrorMessage(false);
        setSuccessMessage(true);
        setSuccessMessageText(data.message);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setErrorMessage(true);
        setErrorMessageText(data.errors[0]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      
      setErrorMessage(true);
      setErrorMessageText('An unexpected error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.registerFormView}>
            <Text style={styles.logoText}>Register Account</Text>
            {errorMessage && <AlertBox message={errorMessageText} />}
            {successMessage && <SuccessAlertBox message={successMessageText} />}
            
            <Text style={styles.label}>Username</Text>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={text => setUsername(text)}
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
            />

            <Text style={styles.label}>Email Address</Text>
            <TextInput
              placeholder="Email address"
              value={email}
              onChangeText={text => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.loginFormTextInput}>
            <Text>
              {dob ? `${dob.getFullYear()}/${String(dob.getMonth() + 1).padStart(2, '0')}/${String(dob.getDate()).padStart(2, '0')}` : "Select Date of Birth"}
            </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dob}
                mode="date"
                display="default"
                onChange={handleDateChange}
                maximumDate={new Date()}
              />
            )}

            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry
            />

            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChangeText={text => setPasswordConfirmation(text)}
              placeholderTextColor="#c4c3cb"
              style={styles.loginFormTextInput}
              secureTextEntry
            />

            <TouchableOpacity
              style={styles.loginButton}
              onPress={onLoginPress}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator style={{ marginTop: 15 }} size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', paddingHorizontal: 15, justifyContent: 'center', marginTop: 10 }}>
              <Text style={{ fontSize: 15 }}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={isLoading}>
                <Text style={{ fontSize: 15, color: 'blue' }}>Login here</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
