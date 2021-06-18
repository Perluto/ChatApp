import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import GroupListScreen from '../screens/group/GroupListScreen';
import GroupDetailScreen from '../screens/group/GroupDetailScreen';
import NewGroupScreen from '../screens/group/NewGroupScreen';

const Stack = createStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="group-list" component={GroupListScreen} />
      <Stack.Screen name="group-detail" component={GroupDetailScreen} />
      <Stack.Screen name="create-group" component={NewGroupScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
