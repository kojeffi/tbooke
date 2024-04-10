import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';

const EditProfile = ({ route }) => {
  const navigation = useNavigation();
  const { profileName, profileEmail, profileRole, location, workplace, hometown, website, twitter, facebook, linkedin, instagram, profileImage } = route.params;

  const [editedProfileName, setEditedProfileName] = useState(profileName);
  const [editedProfileEmail, setEditedProfileEmail] = useState(profileEmail);
  const [editedProfileRole, setEditedProfileRole] = useState(profileRole);
  const [editedLocation, setEditedLocation] = useState(location);
  const [editedWorkplace, setEditedWorkplace] = useState(workplace);
  const [editedHometown, setEditedHometown] = useState(hometown);
  const [editedWebsite, setEditedWebsite] = useState(website);
  const [editedTwitter, setEditedTwitter] = useState(twitter);
  const [editedFacebook, setEditedFacebook] = useState(facebook);
  const [editedLinkedin, setEditedLinkedin] = useState(linkedin);
  const [editedInstagram, setEditedInstagram] = useState(instagram);
  const [editedProfileImage, setEditedProfileImage] = useState(profileImage);

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios || Constants.platform.android) {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission required', 'Please enable access to your photo library to upload images.');
        }
      }
    })();
  }, []);

  const handleSelectProfileImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setEditedProfileImage(result.uri);
    }
  };

  const handleRemoveProfileImage = () => {
    setEditedProfileImage(null);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('http://192.168.12.131:3000/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profileName: editedProfileName,
          profileEmail: editedProfileEmail,
          profileRole: editedProfileRole,
          location: editedLocation,
          workplace: editedWorkplace,
          hometown: editedHometown,
          website: editedWebsite,
          twitter: editedTwitter,
          facebook: editedFacebook,
          linkedin: editedLinkedin,
          instagram: editedInstagram,
          profileImage: editedProfileImage,
          // Add any additional fields here
        }),
      });
      const data = await response.json();
      console.log(data);
      // Handle success message or navigate back
    } catch (error) {
      console.error('Error saving profile:', error);
      // Handle error
    }
  };

  const handleExit = () => {
    // Handle navigation to exit without saving
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Image */}
      {editedProfileImage ? (
        <TouchableOpacity onPress={handleSelectProfileImage}>
          <Image source={{ uri: editedProfileImage }} style={styles.profileImage} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.profileImagePlaceholder} onPress={handleSelectProfileImage}>
          <Text>Add Profile Picture</Text>
        </TouchableOpacity>
      )}

      {/* Inputs for editing profile details */}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Profile Name</Text>
        <TextInput
          style={styles.input}
          value={editedProfileName}
          onChangeText={setEditedProfileName}
          placeholder="Enter Profile Name"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Profile Email</Text>
        <TextInput
          style={styles.input}
          value={editedProfileEmail}
          onChangeText={setEditedProfileEmail}
          placeholder="Enter Profile Email"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Profile Role</Text>
        <TextInput
          style={styles.input}
          value={editedProfileRole}
          onChangeText={setEditedProfileRole}
          placeholder="Enter Profile Role"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={editedLocation}
          onChangeText={setEditedLocation}
          placeholder="Enter Location"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Workplace</Text>
        <TextInput
          style={styles.input}
          value={editedWorkplace}
          onChangeText={setEditedWorkplace}
          placeholder="Enter Workplace"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Hometown</Text>
        <TextInput
          style={styles.input}
          value={editedHometown}
          onChangeText={setEditedHometown}
          placeholder="Enter Hometown"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Website</Text>
        <TextInput
          style={styles.input}
          value={editedWebsite}
          onChangeText={setEditedWebsite}
          placeholder="Enter Website"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Twitter</Text>
        <TextInput
          style={styles.input}
          value={editedTwitter}
          onChangeText={setEditedTwitter}
          placeholder="Enter Twitter"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Facebook</Text>
        <TextInput
          style={styles.input}
          value={editedFacebook}
          onChangeText={setEditedFacebook}
          placeholder="Enter Facebook"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>LinkedIn</Text>
        <TextInput
          style={styles.input}
          value={editedLinkedin}
          onChangeText={setEditedLinkedin}
          placeholder="Enter LinkedIn"
        />
      </View>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Instagram</Text>
        <TextInput
          style={styles.input}
          value={editedInstagram}
          onChangeText={setEditedInstagram}
          placeholder="Enter Instagram"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
        <Text style={styles.exitButtonText}>Exit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E5E5E5',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  labelContainer: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#17a2b8',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  exitButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  exitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default EditProfile;
