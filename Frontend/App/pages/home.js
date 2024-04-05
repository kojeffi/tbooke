import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';

export default function Home({ navigation }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          'Nunito': require('./../assets/fonts/Nunito-Italic-VariableFont_wght.ttf'),
          'Outfit': require('./../assets/fonts/Outfit-VariableFont_wght.ttf'),
          'FontAwesome': require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf')
        });
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image style={styles.image} source={require('./../assets/Images/logo1.jpg')} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.subtitle, styles.textCenter, { fontFamily: 'Outfit' }]}>Welcome to Tbooke</Text>
        <Text style={[styles.subtitle1, styles.textCenter, { fontFamily: 'Nunito' }]}>
          Tbooke is more than just a platform, it’s a community where education professionals, institutions, and learners share, connect, and grow together all while enjoying content that’s educational and entertaining.
        </Text>
        <TouchableOpacity style={[styles.button, styles.buttonGreen]} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonGray]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonMaroon]} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.buttonText}>Explore Without Account</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 0,
  },
  topContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'darkcyan',
  },
  subtitle1: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    padding: 0,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonGreen: {
    backgroundColor: 'green',
  },
  buttonGray: {
    backgroundColor: 'gray',
  },
  buttonMaroon: {
    backgroundColor: 'maroon',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito',
  },
  image: {
    height: 150,
    width: 340,
    marginBottom: 5,
    borderRadius: 5,
  },
});
