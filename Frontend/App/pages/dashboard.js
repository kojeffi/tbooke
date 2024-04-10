import React, { useState, useEffect } from 'react';
import { 
  View, 
  Image, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated, 
  TextInput, 
  ScrollView, 
  Dimensions 
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import ProfileSection from './ProfileSection';

const windowWidth = Dimensions.get('window').width;

export default function DashboardWrapper({ navigation, route }) {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(-200));
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Nunito': require('./../assets/fonts/Nunito-VariableFont_wght.ttf'),
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

  const openProfile = () => {
    toggleCollapse();
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.logoContainer}>
          <Image style={styles.logo} source={require('./../assets/Images/logo2.jpg')} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#606770"
          />
          <Ionicons name="search" size={24} color="#606770" style={styles.searchIcon} />
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="mail" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleCollapse}>
          <Ionicons name={collapsed ? 'menu' : 'close'} size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.sidebar, { left: animation }]}>
        <ScrollView>
          <View style={styles.sidebarContent}>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => navigation.navigate('Home')}>
              <FontAwesome name="home" size={24} color="#fff" />
              <Text style={styles.sidebarText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openProfile} style={styles.sidebarItem}>
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
                <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.sidebarItem}>
                  <FontAwesome name="sign-out" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>LogOut</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </ScrollView>
      </Animated.View>

      {!collapsed && (
        <TouchableOpacity style={[styles.overlay, { width: windowWidth - 200 }]} onPress={hideSidebar} />
      )}

      {showProfile && (
        <View style={styles.profileSectionWrapper}>
          <TouchableOpacity style={styles.closeButton} onPress={closeProfile}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <ProfileSection />
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <DashboardContent route={route} />
      </ScrollView>
    </View>
  );
}

const DashboardContent = ({ route }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.subText}>Discover new learning opportunities:</Text>

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
    marginTop: 30,
    backgroundColor: 'lightcyan', //#E5E5E5 Light gray background
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
    backgroundColor: '#3b5998', // Dark blue navbar
    elevation: 3,
  },
  logoContainer: {},
  logo: {
    height: 60,
    width: 60,
    resizeMode: 'contain', // Ensure logo fits well
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e4e6eb', // Light gray search bar
    borderRadius: 20,
    paddingHorizontal: 10,
    flex: 1,
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 10,
    color: '#606770', // Dark gray search icon
  },
  searchInput: {
    flex: 1,
    color: '#000',
    fontSize: 16,
    fontFamily: 'Nunito',
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
    backgroundColor: '#3b5998', // Dark blue sidebar
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
    backgroundColor: '#fff', // White cards
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
    color: '#333', // Dark gray title
  },
  cardText: {
    fontSize: 16,
    color: '#606770', // Dark gray text
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
    top: 96,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 101,
    color: 'red',
  },
  welcomeText: {
    fontSize: 24,
    fontFamily: 'Nunito',
    textAlign: 'center',
    marginTop: 20,
    color: '#333', // Dark gray welcome text
  },
  subText: {
    fontSize: 18,
    fontFamily: 'Nunito',
    textAlign: 'center',
    marginBottom: 20,
    color: '#606770', // Dark gray subtext
  },
});
