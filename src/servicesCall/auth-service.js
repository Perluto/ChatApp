import ConnectyCube from 'react-native-connectycube';
import {user} from '../config/settings';

export default class AuthService {
  init = () => ConnectyCube.init(...user);

  login = user => {
    return new Promise((resolve, reject) => {
      ConnectyCube.createSession(user)
        .then(async () => {
          const email = {email: user.login};
          const id = await this.getUser(email);
          ConnectyCube.chat.connect({
            userId: id.user.id,
            password: user.password,
          });
        })
        .then(resolve)
        .catch(reject);
    });
  };
  create = user => {
    const userProfile = {
      login: param.email,
      password: param.password,
      email: param.email,
      full_name: param.name,
      phone: '103246421233',
      website: 'https://dozensofdreams.com',
      user_tags: ['iphone', 'apple'],
      custom_data: JSON.stringify({middle_name: 'Baroibeo'}),
    };
    return new Promise((resolve, reject) => {
      ConnectyCube.users.signup(userProfile).then(resolve).catch(reject);
    });
  };

  getUser = param => {
    return new Promise((resolve, reject) => {
      ConnectyCube.users.get(param).then(resolve).catch(reject);
    });
  };

  logout = () => {
    ConnectyCube.chat.disconnect();
    ConnectyCube.destroySession();
  };
}
