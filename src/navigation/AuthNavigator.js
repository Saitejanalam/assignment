import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigatior from './AppNavigatior';
import Login from '../components/login';
import { useUser } from '../useContext/UserContext';

const AuthNavigator = () => {
  const Stack = createStackNavigator();

  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const { setUser, setUsername } = useUser();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // checking the user login status from AsyncStorage
        // if the user is logged in, it will return true, otherwise it will return false, because we are setting the boolean value in login component.
        const userLoggedIn = await AsyncStorage.getItem('user-logged-in');
        
        // getting the username and user from AsyncStorage
        const username = await AsyncStorage.getItem('username');
        const user = await AsyncStorage.getItem('user');
        // parsing the user and username to UserContext using useContext,
        // because when we login and remove the app from recent app,
        //  the context will be reset, so we need to set the user and username again.
        setUsername(username);
        setUser(user);
        // setting the userLoggedIn state based on the retreived value from AsyncStorage
        setUserLoggedIn(userLoggedIn ? true : false);
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };
    // checking the user login status when the component mounts
    checkLoginStatus();
  }, []);

  // displaying the loader if ther userLoggedIn state is null.here we are intilizing the userLoggedIn state to null, and setting the boolean value in useEffect hook.
  if (userLoggedIn === null) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 0, backgroundColor: 'white' }}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        // based on the UserLoggeedIn status, we are setting the initial route name so logged in users will be directly navigated to home screen
        initialRouteName={userLoggedIn ? 'AppNavigatior' : 'LoginScreen'}
      >
        <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AppNavigatior"
          component={AppNavigatior}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthNavigator;
