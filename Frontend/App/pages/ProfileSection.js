import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ProfileSection = () => {
  // Function to handle editing profile
  const handleEditProfile = () => {
    // Implement functionality to edit profile details
  };

  // Function to handle creating a post
  const handleCreatePost = () => {
    // Implement functionality to create a post
  };

  return (
    <ScrollView>
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <Text style={styles.profileHeaderText}>Profile</Text>
          <TouchableOpacity style={styles.badge}>
            <Text style={styles.badgeText}>Create A Post</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.profileTitle}>Profile Picture</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Image style={styles.image} source={require('./../assets/Images/avatar-4.jpg')} />
          </TouchableOpacity>
          <Text style={styles.profileSubtitle}>Student/Learner</Text>
          
          <Text style={styles.profileSubtitle}></Text>
        </View>
        <View style={styles.skillsContainer}>
          <Text style={styles.profileTitle}>Skills</Text>
          <View style={styles.skills}>
            {/* Render skills badges */}
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.profileTitle}>About Me</Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.aboutText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.profileTitle}>You haven't added about you.</Text>
          <Text style={styles.aboutText}>My Subjects<Text style={styles.link}> </Text></Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.aboutText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.profileTitle}>You haven't added about you.</Text>
          <Text style={styles.aboutText}>Favorites Topics<Text style={styles.link}> </Text></Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.aboutText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.profileTitle}>You haven't added about you.</Text>
          <Text style={styles.aboutText}>Find me on<Text style={styles.link}> </Text></Text>
          <TouchableOpacity onPress={handleEditProfile}>
            <Text style={styles.aboutText}>Edit</Text>
          </TouchableOpacity>
          <Text style={styles.profileTitle}>You haven't added about you.</Text>
          <Text style={styles.aboutText}>Full Stack Machine Learning Engineer<Text style={styles.link}></Text></Text>
          <Text style={styles.aboutText}>Developer<Text style={styles.link}> </Text></Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createPostButton} onPress={handleCreatePost}>
          <Text style={styles.createPostButtonText}>Create Post</Text>
        </TouchableOpacity>
        <View style={styles.socialMediaContainer}>
          <Text style={styles.profileTitle}>Social Media</Text>
          <TouchableOpacity style={styles.socialMediaLink}>
            <FontAwesome name="whatsapp" size={20} color="green" />
            <Text style={styles.link}> WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialMediaLink}>
            <FontAwesome name="twitter" size={20} color="blue" />
            <Text style={styles.link}> Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialMediaLink}>
            <FontAwesome name="facebook" size={20} color="blue" />
            <Text style={styles.link}> Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialMediaLink}>
            <FontAwesome name="instagram" size={20} color="purple" />
            <Text style={styles.link}> Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialMediaLink}>
            <FontAwesome name="linkedin" size={20} color="blue" />
            <Text style={styles.link}> LinkedIn</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.activitiesContainer}>
          <Text style={styles.profileTitle}>Activities</Text>
          {/* Render activities */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = {
  profileContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 'auto',
  },
  badge: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
  },
  profileDetails: {
    marginBottom: 15,
  },
  profileTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  profileSubtitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  skillsContainer: {
    marginBottom: 15,
  },
  skills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skillBadge: {
    backgroundColor: 'black',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  skillBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  aboutContainer: {
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 14,
    marginBottom: 5,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  socialMediaContainer: {
    marginBottom: 15,
  },
  socialMediaLink: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  activitiesContainer: {
    marginBottom: 15,
  },
  activity: {
    marginBottom: 10,
  },
  activityCard: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  activityText: {
    fontSize: 14,
    marginBottom: 5,
  },
  activityTime: {
    fontSize: 12,
    color: 'gray',
  },
  image: {
    height: 80,
    width: 80,
    marginBottom: 5,
    borderRadius: 40,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  editButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
};

export default ProfileSection;
