import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ProfileSection = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [profileName, setProfileName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [profileRole, setProfileRole] = useState('');
  const [location, setLocation] = useState('');
  const [workplace, setWorkplace] = useState('');
  const [hometown, setHometown] = useState('');
  const [website, setWebsite] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', {
      profileImage,
      profileName,
      profileRole,
      location,
      workplace,
      hometown,
      website,
      twitter,
      facebook,
      linkedin,
      instagram,
    });
  };

  useEffect(() => {
    if (isFocused) {
      fetchProfileDetails();
    }
  }, [isFocused]);

  const fetchProfileDetails = async () => {
    try {
      const userId = 1; // Change this to the actual user ID
      const response = await fetch(`http://localhost:3000/user-profile/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch profile details');
      }
      const data = await response.json();
      setProfileImage(data.profileImage);
      setProfileName(data.name);
      setProfileRole(data.userType);
      setLocation(data.location);
      setWorkplace(data.workplace);
      setHometown(data.hometown);
      setWebsite(data.website);
      setTwitter(data.twitter);
      setFacebook(data.facebook);
      setLinkedIn(data.linkedin);
      setInstagram(data.instagram);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.title}>Profile Details</Text>
        <View style={styles.detailsContainer}>
          {profileImage !== '' && (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          )}
          <Text style={styles.profileName}>{profileName}</Text>
          <Text style={styles.profileRole}>{profileRole}</Text>
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
          {/* Add TextInput components for other profile details */}
        </View>
        {/* Remaining Profile Sections */}
        {/* Add remaining sections here */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#17a2b8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 40,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileRole: {
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default ProfileSection;
