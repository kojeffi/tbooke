import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const windowWidth = Dimensions.get('window').width;

export default function DashboardWrapper({ navigation, route }) {
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(-200));
  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  return (
    <View style={styles.container}>
      {/* First Navbar */}
      <View style={[styles.navbar, { backgroundColor: 'darkcyan', marginTop:30, fontFamily: 'Nunito', }]}>
        <TouchableOpacity style={styles.logoContainer}>
          <Text style={[styles.logo]}>
            <FontAwesome name="book" size={24} color="#fff" />
            TBOOKE
          </Text>
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={24} color="#000" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#000"
          />
        </View>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleCollapse}>
          <Ionicons name={collapsed ? 'menu' : 'close'} size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Second Navbar */}
      <View style={[styles.navbar, { backgroundColor: 'lightcyan' }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollNavbar}>
        <TouchableOpacity style={[styles.icon, { backgroundColor: '#1877f2' }]}>
          <MaterialCommunityIcons name="message-text-outline" size={18} color="#fff" />
          <Text style={[styles.iconLabel, { color: '#fff' ,fontFamily: 'Nunito'}]}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon, { backgroundColor: '#4CAF50' }]}>
          <Ionicons name="settings" size={18} color="#fff" />
          <Text style={[styles.iconLabel, { color: '#fff',fontFamily: 'Nunito' }]}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon, { backgroundColor: 'gray' }]}>
          <MaterialCommunityIcons name="help-circle-outline" size={18} color="#fff" />
          <Text style={[styles.iconLabel, { color: '#fff' ,fontFamily: 'Nunito'}]}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon, { backgroundColor: '#000' }]}>
          <Ionicons name="moon-outline" size={18} color="#fff" />
          <Text style={[styles.iconLabel, { color: '#fff',fontFamily: 'Nunito' }]}>Dark Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon, { backgroundColor: '#FFC107' }]}>
          <Ionicons name="language" size={18} color="#fff" />
          <Text style={[styles.iconLabel, { color: '#fff',fontFamily: 'Nunito' }]}>Language</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon, { backgroundColor: 'red' }]}>
          <Ionicons name="heart-outline" size={18} color="#fff" />
          <Text style={[styles.iconLabel, { color: '#fff',fontFamily: 'Nunito' }]}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.icon, { backgroundColor: '#03A9F4' }]}>
          <FontAwesome name="shopping-cart" size={18} color="#fff" />
          <Text style={[styles.iconLabel, { color: '#fff' ,fontFamily: 'Nunito'}]}>Cart</Text>
        </TouchableOpacity>
      </ScrollView>
      </View>
      {/* Sidebar */}
      <Animated.View style={[styles.sidebar, { left: animation }]}>
        <ScrollView>
          <View style={styles.sidebarContent}>
          <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem}>
              <FontAwesome name="home" size={24} color="#fff" />
              <Text style={styles.sidebarText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Teacher')} style={styles.sidebarItem}>
              <FontAwesome name="user" size={24} color="#fff" />
              <Text style={styles.sidebarText}>Profile</Text>
            </TouchableOpacity>
            {collapsed ? null : (
              <>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="clock-o" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Timeline</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="users" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Connection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="rss" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Feed</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="group" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>My Group</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sidebarItem}>
                  <FontAwesome name="group" size={24} color="#fff" />
                  <Text style={styles.sidebarText}>Subject Group</Text>
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
                <View style={styles.line}></View>
                <TouchableOpacity style={styles.sidebarItem}>
                  <Text style={styles.contactTitle}>Contact Us</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialName}><Ionicons name="logo-whatsapp" size={24} color="#fff" />Whatsapp</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialName}><Ionicons name="mail" size={24} color="#fff" />Email</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialName}><Ionicons name="logo-facebook" size={24} color="#fff" />Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}> 
                  <Text style={styles.socialName}><Ionicons name="logo-twitter" size={24} color="#fff" />Twitter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Text style={styles.socialName}><Ionicons name="logo-instagram" size={24} color="#fff" />Instagram</Text>
                </TouchableOpacity>
                {/* Add more sidebar items as needed */}
              </>
            )}
          </View>
        </ScrollView>
      </Animated.View>

      {/* Touchable component to hide sidebar */}
      {!collapsed && (
        <TouchableOpacity style={[styles.overlay, { width: windowWidth - 200 }]} onPress={hideSidebar} />
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
  profileContainer: {},
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 20,
    justifyContent:'center',
    marginLeft:20,
  },
  notificationIcon: {},
  toggleButton: {},
  sidebar: {
    position: 'absolute',
    top: 160,
    bottom: 0,
    borderRadius:20,
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
    justifyContent:'center',
    marginLeft:5,
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    fontFamily: 'Nunito',
  },
  sidebarText: {
    marginLeft: 10,
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Nunito',
    fontWeight: 'bold',
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
  icon: {
    marginLeft: 10,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollNavbar: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  iconLabel: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Outfit',
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  socialIcon: {
    marginHorizontal: 10,
    alignItems: 'center',
  },
  socialName: {
    marginTop: 5,
    color: '#fff',
    fontFamily: 'Outfit',
    fontSize: 18,
    fontFamily: 'Nunito',
  },
  line:{
    backgroundColor:'black',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.001)',
    zIndex: 98,
  },
  contactTitle:{
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Outfit',
  },
});