import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuditForm from '../components/screens/AuditForm';
import PrivacyPolicy from '../components/screens/PrivacyPolicy';
import AuditHistory from '../components/screens/AuditHistory';
import { useUser } from '../useContext/UserContext';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { user, setUser, username, setUsername } = useUser();
  const navigation = useNavigation();

  const logout = async () => {
    try {
      // removing the user and user-logged-in from AsyncStorage while logging out.
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('user-logged-in');
      // setting the user and username to null in UserContext
      setUser(null);
      setUsername(null);
      // navigating to the LoginScreen after logging out
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // displaying the username and logout button in the header right side
  const HeaderRight = () => (
    <TouchableOpacity onPress={logout} style={styles.headerRight}>
      <Text style={styles.headerText}>{user}</Text>
      <Icon name="power-off" size={24} color={COLORS.primary} />
    </TouchableOpacity>
  );

  const headerLeft = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('LoginScreen')}
      style={styles.headerLeft}
    >
      <Text style={styles.headerText}>Welcome {username}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // topbar of the app
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,

          headerRight: () => <HeaderRight />,
          headerLeft: () => <headerLeft />,
          // setting the header title to empty string, so it will not show the page name as title in the header.
          headerTitle: '',
          headerStyle: styles.header,

          gestureEnabled: false,
          // setting the tabBarIcon based on the route name.
          tabBarIcon: ({ focused }) => {
            let iconName;
            let iconColor = focused ? COLORS.primary : 'gray';
            if (route.name === 'Audit Form') {
              iconName = 'file-alt';
            } else if (route.name === 'Privacy Policy') {
              iconName = 'user-shield';
            } else if (route.name === 'Audit History') {
              iconName = 'history';
            }
            return <Icon name={iconName} size={25} color={iconColor} />;
          },
          tabBarActiveTintColor: COLORS.primary,
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* conditionally rendering the screens based on the user role */}
        {user === 'Auditor' ? (
          <>
            <Tab.Screen name={'Audit Form'} component={AuditForm} />
            <Tab.Screen name={'Privacy Policy'} component={PrivacyPolicy} />
          </>
        ) : (
          <>
            <Tab.Screen name={'Audit History'} component={AuditHistory} />
            <Tab.Screen name={'Privacy Policy'} component={PrivacyPolicy} />
          </>
        )}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: COLORS.white,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 14,
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    height: 70,
  },
  headerRight: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  headerLeft: {
    marginLeft: 16,
  },
});

export default BottomTabNavigator;
