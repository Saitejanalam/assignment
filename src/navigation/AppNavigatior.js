import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import BottomTabNavigator from './BottomTabNavigator';

const AppNavigatior = () => {
  const Stack = createStackNavigator();

  return (
    // navigating to BottomTabNavigator screen, which is the main screen of the app.
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            navigation: navigation,
          })}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AppNavigatior;
