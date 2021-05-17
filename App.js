import React, {useState, useEffect, Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthContext from './src/auth/context';
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

import authStorage from './src/auth/storage';
import SplashScreen from 'react-native-splash-screen';
import userApi from './src/api/user';

export default function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) {
      setUser(user);
      await userApi.updateStatus(user.id, true);
    }
  };

  useEffect(() => {
    restoreUser();
    SplashScreen.hide();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

/*
class App extends Component {
  state = {user: ''};

  setUser = user => {
    this.setState({user});
  };

  async restoreUser() {
    const user = await authStorage.getUser();
    if (user) {
      this.setUser(user);
      await userApi.updateStatus(user.id, true);
    }
  }

  componentDidMount() {
    this.restoreUser();
    SplashScreen.hide();
  }

  async componentWillUnmount() {
    const {user} = this.state;
    await userApi.updateStatus(user.id, false);
  }

  render() {
    const {user} = this.state;

    return (
      <AuthContext.Provider value={{user, setUser: this.setUser}}>
        <NavigationContainer>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    );
  }
}

export default App;
*/
