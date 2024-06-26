import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Student/Learner', value: 'Student/Learner' },
    { label: 'Teacher/Tutor', value: 'Teacher/Tutor' },
    { label: 'Institution', value: 'Institution' },
    { label: 'Others', value: 'Others' }
  ]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Nunito': require('./../assets/fonts/Nunito-Italic-VariableFont_wght.ttf'),
        'Outfit': require('./../assets/fonts/Outfit-VariableFont_wght.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert('Please fill in all fields including User Type');
      return;
    }
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!value) {
      alert('Please select a User Type');
      return;
    }
  
    try {
      const response = await fetch('http://192.168.12.131:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          userType: value,
          password,
        }),
      });
  
      if (response.ok) {
        // Display styled alert upon successful registration
        Alert.alert(
          'Registration Successful',
          'You have successfully registered.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Login', { email }),
              style: 'default', // Style the button as default (can be 'cancel' or 'destructive' as well)
            },
          ],
          {
            cancelable: false, // Prevent dismissing the alert by tapping outside of it
            style: 'success', // Custom style for the alert (defined below)
          }
        );
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      alert('Tbooke registration failed. Please try again.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.title, { fontFamily: 'Outfit' }]}>Create an account</Text>
        <Text style={[styles.subtitle, { fontFamily: 'Nunito' }]}>Join Tbooke for professional networking and constructive education-focused conversations.</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={[styles.input, { fontFamily: 'Nunito' }]}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={[styles.input, { fontFamily: 'Nunito' }]}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
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
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#555"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed" size={24} color="#555" style={styles.icon} />
          <TextInput
            style={[styles.input, { fontFamily: 'Nunito' }]}
            placeholder="Confirm Password"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Select userType</Text>
          <DropDownPicker
            placeholder="Select User Type"
            style={[styles.dropdown, { fontFamily: 'Nunito', marginTop: 10 }]} // Adjust marginTop for spacing
            containerStyle={{ flex: 1 }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
          />
        </View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <View style={styles.inputContainer}></View>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightcyan', // #F0F2F5Changed background color for better readability
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
    fontFamily: 'Outfit',
  },
  subtitle: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#555555',
    fontFamily: 'Nunito',
  },
  inputContainer: {
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    left: 0,
    top: 9,
  },
  input: {
    paddingLeft: 40, // Adjust paddingLeft to accommodate icon
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#D9D9D9',
    fontFamily: 'Nunito',
  },
  dropdown: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderWidth: 1,
    borderRadius: 8,
    fontFamily: 'Nunito',
    zIndex: 999, // Ensure dropdown is rendered above other elements
  },
  loginText: {
    marginTop: 20, // Adjust marginTop for spacing
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#555555',
    fontFamily: 'Nunito',
  },
  link: {
    color: '#7289DA',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  button: {
    backgroundColor: '#7289DA',
    paddingVertical: 12,
    borderRadius: 8,
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
    top: 9,
  },
});
