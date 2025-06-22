import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../useContext/UserContext';
import { COLORS } from '../constants';

const Login = () => {
  const navigation = useNavigation();
  // setting the user and username data in USerContext using useUser hook.
  const { setUser, setUsername } = useUser();
  // initializing the state variables for name, password, role and message
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // setting the intial value to Admin
  const [role, setRole] = useState('Admin');
  const roles = [ 'Auditor', 'Viewer','Admin'];

  const handleLogin = () => {
    if (role != '') {
      // once the user clicks on the login, we are logging in the user and setting the user-logged-in to true, 
      // which we are using in AuthNavigator to check if the user is logged in or not.
      AsyncStorage.setItem('user-logged-in', 'true');
      // setting in AsyncStorage the user and username, so if the app reopens, 
      // we can get the user and username from AsyncStorage. because the userContext will be reset when the app is closed or removed from recent apps.
      AsyncStorage.setItem('user', role);
      AsyncStorage.setItem('username', name);
      // displaying success message 
      setMessage('Login successful!');
      // setting the user and username in UserContext
      setUser(role);
      setUsername(name);
      // navigating to the AppNavigatior screen
      navigation.navigate('AppNavigatior');
    } else {
      setMessage('Invalid credentials');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Jhon"
          value={name}
          onChangeText={setname}
          placeholderTextColor="#aaa"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="1234"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
          keyboardType="default"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Role</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={role}
            onValueChange={setRole}
            style={styles.picker}
            dropdownIconColor="#555"
          >
            {roles.map(r => (
              <Picker.Item key={r} label={r} value={r}  />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Login" onPress={handleLogin} color={COLORS.primary} />
      </View>
      {message ? (
        <Text
          style={[
            styles.message,
            message === 'Login successful!' ? styles.success : styles.error,
          ]}
        >
          {message}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f7fafd',
  },
  title: {
    fontSize: 32,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    color: COLORS.primary,
    letterSpacing: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#dbeafe',
    backgroundColor: COLORS.white,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    fontSize: 16,
    color: '#222',
    shadowColor: '#4F8EF7',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 8,
    backgroundColor: COLORS.white,
    overflow: 'hidden',
  },
  picker: {
    color: '#222',
    height: 50,
    width: '100%',
  },
  buttonWrapper: {
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#4F8EF7',
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  message: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    padding: 8,
    borderRadius: 6,
  },
  error: {
    color: '#d32f2f',
    backgroundColor: '#fdecea',
    borderColor: '#f5c6cb',
    borderWidth: 1,
  },
  success: {
    color: '#388e3c',
    backgroundColor: '#e8f5e9',
    borderColor: '#c8e6c9',
    borderWidth: 1,
  },
});

export default Login;
