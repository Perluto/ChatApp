import {useContext} from 'react';
import jwtDecode from 'jwt-decode';

import AuthContext from './context';
import authStorage from './storage';
import userApi from '../api/user';

export default useAuth = () => {
  const {user, setUser} = useContext(AuthContext);

  const logIn = authToken => {
    const user = jwtDecode(authToken);
    setUser(user);
    authStorage.storeToken(authToken);
  };

  const logOut = async () => {
    await userApi.updateStatus(user.id, false);
    setUser(null);
    authStorage.removeToken();
  };

  return {user, logIn, logOut};
};
