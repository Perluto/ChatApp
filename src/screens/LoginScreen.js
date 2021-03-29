import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Screen from '../components/Screen';
import {AppForm, AppFormField, SubmitBtn} from '../components/forms';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import * as Yup from 'yup';

const validateSchema = Yup.object().shape({
  username: Yup.string().min(6).required().label('Username'),
  password: Yup.string().min(4).required().label('Password'),
});

function LoginScreen(props) {
  const handleSubmit = async ({username, password}) => {
    const response = await authApi.login(username, password);
    if (!response.ok) return setLoginFailed(true);

    setLoginFailed(false);
    login(response.data);
  };
  return (
    <Screen style={styles.container}>
      <MaterialCommunityIcons name="wechat" color="white" size={200} />
      <Text style={styles.title}>hello</Text>
      <AppForm
        initialValues={{username: '', password: ''}}
        onSubmit={handleSubmit}
        validationSchema={validateSchema}>
        <AppFormField
          name="username"
          placeholder="Username"
          icon="account"
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
        <Text style={{color: '#F9F9F9'}} onPress={() => null}>
          SIGN UP
        </Text>
      </View>
    </Screen>
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
