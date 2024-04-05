import React, { useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './App/pages/home'; // Use lowercase 'home'
import Register from './App/pages/register';
import Login from './App/pages/login';
import Dashboard from './App/pages/dashboard';
import learner from './App/pages/learner';
import Teacher from './App/pages/teacher';
import Institution from './App/pages/institution';
import Others from './App/pages/others';
import * as Font from 'expo-font';

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Load the Nunito and Outfit fonts
    Font.loadAsync({
      'Nunito': require('./App/assets/fonts/Nunito-Italic-VariableFont_wght.ttf'),
      'Outfit': require('./App/assets/fonts/Outfit-VariableFont_wght.ttf'),
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true }} // Hide the header for all screens
        >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Learner" component={Dashboard} />
        <Stack.Screen name="Teacher" component={Dashboard} />
        <Stack.Screen name="Institution" component={Dashboard} />
        <Stack.Screen name="Others" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}