import React, {useState} from 'react';
import {View, Text, StyleSheet, LogBox} from 'react-native';

import Screen from '../components/Screen';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitBtn,
} from '../components/forms';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ActivityIndicator from '../components/ActivityIndicator';

import * as Yup from 'yup';

import userApi from '../api/user';
import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import {AuthService} from '../servicesCall';

const validateSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(8).required().label('Password'),
  name: Yup.string().max(20).min(5).required().label('Name'),
});

LogBox.ignoreLogs(['Warning: ...']);

function RegisterScreen() {
  const registerApi = useApi(userApi.register);
  const loginApi = useApi(authApi.login);
  const auth = useAuth();
  const [error, setError] = useState();

  const handleSubmit = async userInfo => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error occurred.');
      }

      return;
    }

    const {data: authToken} = await loginApi.request(
      userInfo.email,
      userInfo.password,
    );
    const user = {login: userInfo.email, password: userInfo.password};

    await AuthService.create(userInfo);
    AuthService.login(user);
    auth.logIn(authToken);
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.loading || loginApi.loading} />
      <Screen style={styles.container}>
        <MaterialCommunityIcons name="wechat" color="white" size={150} />
        <Text style={styles.title}>hello</Text>
        <AppForm
          initialValues={{email: '', password: '', name: ''}}
          onSubmit={handleSubmit}
          validationSchema={validateSchema}>
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            name="name"
            placeholder="Name"
            icon="account"
            autoCapitalize="words"
            textContentType="name"
            autoCorrect={false}
            width="75%"
          />
          <AppFormField
            name="email"
            placeholder="Email"
            icon="email"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="emailAddress"
            width="75%"
          />
          <AppFormField
            name="password"
            placeholder="Password"
            icon="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
            width="75%"
          />
          <SubmitBtn title="Sign Up" color="#EF798A" width="75%" />
        </AppForm>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3A86FF',
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 80,
    color: 'white',
    fontFamily: 'Hello',
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
