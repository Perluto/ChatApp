import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ChatNavigator from './ChatNavigator';

import GroupChatListScreen from '../screens/GroupChatListScreen';
import ContactsScreen from '../screens/ContactsScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator tabBarOptions={{activeTintColor: '#3A86FF'}}>
    <Tab.Screen
      name="chats"
      component={ChatNavigator}
      options={{
        tabBarIcon: ({size, color}) => (
          <Ionicons
            name="md-chatbox-ellipses-outline"
            size={30}
            color={color}
          />
        ),
        title: 'Messages',
      }}
    />
    <Tab.Screen
      name="groups"
      component={GroupChatListScreen}
      options={{
        tabBarIcon: ({size, color}) => (
          <MaterialCommunityIcons
            name="account-group-outline"
            size={30}
            color={color}
          />
        ),
        title: 'Groups',
      }}
    />
    <Tab.Screen
      name="contacts"
      component={ContactsScreen}
      options={{
        tabBarIcon: ({size, color}) => (
          <Ionicons name="call-outline" size={30} color={color} />
        ),
        title: 'Contatcs',
      }}
    />
    <Tab.Screen
      name="settings"
      component={SettingScreen}
      options={{
        tabBarIcon: ({size, color}) => (
          <Ionicons name="ios-settings-outline" size={30} color={color} />
        ),
        title: 'Settings',
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
