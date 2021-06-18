import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Screen from '../components/Screen';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitBtn,
} from '../components/forms';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Yup from 'yup';
import ActivityIndicator from '../components/ActivityIndicator';

import authApi from '../api/auth';
import useAuth from '../auth/useAuth';
import useApi from '../hooks/useApi';
import {AuthService} from '../servicesCall';
import {user} from '../config/settings';

const validateSchema = Yup.object().shape({
  email: Yup.string().email().min(6).required().label('Email'),
  password: Yup.string().min(4).required().label('Password'),
});

function LoginScreen({navigation}) {
  const auth = useAuth();
  const loginApi = useApi(authApi.login);

  const [loginFailed, setLoginFailed] = useState(false);

  const handleSubmit = async ({email, password}) => {
    const user = {login: email, password: password};
    await AuthService.login(user);

    const result = await loginApi.request(email, password);
    if (!result.ok) return setLoginFailed(true);

    setLoginFailed(false);
    auth.logIn(result.data);
  };

  return (
    <>
      <ActivityIndicator visible={loginApi.loading} />
      <Screen style={styles.container}>
        <MaterialCommunityIcons name="wechat" color="white" size={200} />
        <Text style={styles.title}>hello</Text>
        <AppForm
          initialValues={{email: '', password: ''}}
          onSubmit={handleSubmit}
          validationSchema={validateSchema}>
          <ErrorMessage
            error="Invalid email and/or password."
            visible={loginFailed}
          />
          <AppFormField
            name="email"
            placeholder="Email"
            icon="email"
            autoCapitalize="none"
            autoCorrect={false}
            textContentType="nickname"
            width="75%"></AppFormField>
          <AppFormField
            name="password"
            placeholder="Password"
            icon="lock"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
            width="75%"></AppFormField>
          <SubmitBtn title="Sign in" color="#EF798A" width="75%" />
        </AppForm>
        <View style={styles.registerContainer}>
          <Text style={{color: '#F9F9F9'}}>Don't have an account?</Text>
          <Text
            style={{color: '#F9F9F9'}}
            onPress={() => navigation.navigate('register')}>
            SIGN UP
          </Text>
        </View>
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
    fontSize: 90,
    color: 'white',
    fontFamily: 'Hello',
  },
  registerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;
