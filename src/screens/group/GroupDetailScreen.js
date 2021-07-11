import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, LogBox} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Screen from '../../components/Screen';
import HeaderScreen from '../../components/HeaderScreen';
import {AppChat} from '../../components/chat';

import useAuth from '../../auth/useAuth';

LogBox.ignoreLogs(['Warning: ...']);

function GroupDetailScreen({route, navigation}) {
  const [user, setUser] = useState(null);
  const auth = useAuth();

  useEffect(() => {
    const tmp = {
      _id: auth.user.id,
      name: auth.user.name,
      avatar: auth.user.avatar,
    };

    setUser(tmp);

    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const renderLeftBtn = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('group-list')}>
        <MaterialCommunityIcons
          name="keyboard-backspace"
          color="white"
          size={30}
          style={{marginRight: 10}}
        />
      </TouchableOpacity>
    );
  };

  const renderRightBtn = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('group-list')}>
        <MaterialCommunityIcons
          name="menu"
          color="white"
          size={30}
          style={{marginRight: 10}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Screen style={styles.container}>
      <HeaderScreen
        title={route.params.roomName}
        renderLeftBtn={renderLeftBtn}
      />
      <AppChat
        user={user}
        idRoomChat={route.params.idRoomChat}
        collection="groups"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f4f4'},
  sendBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});

export default GroupDetailScreen;
