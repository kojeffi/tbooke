import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import ProfileSection from './ProfileSection'; // Import the ProfileSection component

const windowWidth = Dimensions.get('window').width;

export default function DashboardWrapper({ navigation, route }) {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(-200));
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State to control the visibility of the ProfileSection

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

  const toggleCollapse = () => {
    const toValue = collapsed ? 0 : -200;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setCollapsed(!collapsed);
  };

  const hideSidebar = () => {
    if (!collapsed) {
      toggleCollapse();
    }
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <View style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.logoContainer}>
          <Text style={styles.logo}>
            <FontAwesome name="book" size={24} color="#fff" />
            TBOOKE
          </Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#000"
          />
          <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
        </View>
        <View style={styles.notificationIcons}>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="md-mail" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.notificationIcon}>
            <Ionicons name="ios-notifications" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleCollapse}>
          <Ionicons name={collapsed ? 'menu' : 'close'} size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: animation }]}>
        <ScrollView>
          <View style={styles.sidebarContent}>
            <TouchableOpacity style={styles.sidebarItem}>
              <FontAwesome name="home" size={24} color="#fff" />
              <Text style={styles.sidebarText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowProfile(true)} style={styles.sidebarItem}>
              <FontAwesome name="user" size={24} color="#fff" />
              <Text style={styles.sidebarText}>Profile</Text>
            </TouchableOpacity>
            {collapsed ? null : (
              <>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="users" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Connections</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="rss" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Feeds</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="group" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Groups</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <Ionicons name="notifications" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Notification</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="cog" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Setting</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={() => navigation.navigate('Home')} style={styles.sidebarItem}>
                  <FontAwesome name="sign-out" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>LogOut</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Touchable component to hide sidebar */}
      {!collapsed && (
        <TouchableOpacity style={[styles.overlay, { width: windowWidth - 200 }]} onPress={hideSidebar} />
      )}

      {/* Render ProfileSection if showProfile state is true */}
      {showProfile && (
        <View style={styles.profileSectionWrapper}>
          <TouchableOpacity style={styles.closeButton} onPress={closeProfile}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <ProfileSection />
        </View>
      )}

      <Dashboard navigation={navigation} route={route} />
    </View>
  );
}

const Dashboard = ({ route }) => {
  // const { email} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Welcome, {}!</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.mainContent}>
          <View style={[styles.card, { backgroundColor: '#f5f5f5' }]}>
            <TouchableOpacity>
              <Text style={styles.cardTitle}>Tbooke Learning</Text>
              <Text style={[styles.cardText, { fontFamily: 'Nunito' }]}>Enjoy great learning content from tested professionals</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: '#f5f5f5' }]}>
            <TouchableOpacity>
              <Text style={styles.cardTitle}>Learning Resources</Text>
              <Text style={[styles.cardText, { fontFamily: 'Nunito' }]}>All learning resources you need, including books, revision materials, teaching aids etc</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: '#f5f5f5' }]}>
            <TouchableOpacity>
              <Text style={styles.cardTitle}>Schools Corner</Text>
              <Text style={[styles.cardText, { fontFamily: 'Nunito' }]}>Showcase your school to the world</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.card, { backgroundColor: '#f5f5f5' }]}>
            <TouchableOpacity>
              <Text style={styles.cardTitle}>Tbooke Blueboard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcyan',
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dddfe2',
    backgroundColor: 'darkcyan',
    elevation: 3,
  },
  logoContainer: {},
  logo: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Outfit',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e4e6eb',
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    fontFamily: 'Nunito',
  },
  notificationIcons: {
    flexDirection: 'row',
    marginRight: 10,
  },
  notificationIcon: {
    marginLeft: 10,
  },
  toggleButton: {},
  sidebar: {
    position: 'absolute',
    top: 52,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: 'darkcyan',
    width: 200,
    zIndex: 99,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.75,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sidebarContent: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 5,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    fontFamily: 'Nunito',
  },
  sidebarText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Nunito',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Nunito',
    color: '#000',
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Nunito',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.001)',
    zIndex: 98,
  },
  profileSectionWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 101,
  },
});
