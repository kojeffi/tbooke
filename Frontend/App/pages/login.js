import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Nunito: require('./../assets/fonts/Nunito-Italic-VariableFont_wght.ttf'),
        Outfit: require('./../assets/fonts/Outfit-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.12.131:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful');
        switch (data.userType) {
          case 'Student/Learner':
          case 'Teacher/Tutor':
          case 'Institution':
          case 'Others':
            navigation.navigate('Dashboard', { username: data.username });
            break;
          default:
            navigation.navigate('Dashboard');
            break;
        }
      } else {
        const data = await response.json();
        Alert.alert('Login failed', data.error, [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Login failed. Please try again.');
    }
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={[styles.title, { fontFamily: 'Outfit' }]}>Welcome back!!!</Text>
          <Text style={[styles.subtitle, { fontFamily: 'Outfit' }]}>Sign in to your account to continue</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person" size={24} color="#555" style={styles.icon} />
            <TextInput
              style={[styles.input, { fontFamily: 'Nunito' }]}
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed" size={24} color="#555" style={styles.icon} />
            <TextInput
              style={[styles.input, { fontFamily: 'Nunito' }]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#555" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcyan',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'Nunito',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#555555',
    fontFamily: 'Nunito',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10,
    color: '#333333',
    fontFamily: 'Nunito',
  },
  signUpText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#7289DA',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#7289DA',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});
