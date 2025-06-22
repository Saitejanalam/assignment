
// This is the main entry point for the React Native application.
// using UserContext to store the userdata
import { UserProvider } from './src/useContext/UserContext';
// NavigationContainer will handle the navigation state of the app.
import { NavigationContainer } from '@react-navigation/native';
// AuthNavigator will handle the authentication flow of the app.
import AuthNavigator from './src/navigation/AuthNavigator';

function App() {

  return (
    <UserProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}


export default App;
