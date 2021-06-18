import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthContext from './src/auth/context';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';
import {AuthService} from './src/servicesCall';

import authStorage from './src/auth/storage';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
  };

  useEffect(() => {
    restoreUser();
    AuthService.init();
    SplashScreen.hide();
  }, []);
  if (user) {
    const acc = {login: user.email, password: '12345678'};
    AuthService.login(acc);
  }

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
