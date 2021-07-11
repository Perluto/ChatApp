import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, LogBox} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';

import ListFriends from '../../components/ListFriends';
import HeaderScreen from '../../components/HeaderScreen';

import firestore from '@react-native-firebase/firestore';
import useAuth from '../../auth/useAuth';
import chatApi from '../../api/chat';

LogBox.ignoreLogs(['Warning: ...']);

const usersRef = firestore().collection('users');

function NewMessageScreen({navigation}) {
  const [users, setUsers] = useState([]);
  const {user} = useAuth();

  const changeData = useCallback(
    users => {
      setUsers(prevUsers => {
        const tmp = [...prevUsers];

        users.forEach(item => {
          const index = tmp.findIndex(e => e.id === item.id);
          if (index === -1) tmp.push(item);
          else {
            tmp[index] = item;
          }
        });
        return tmp;
      });
    },
    [users],
  );

  useEffect(() => {
    const unsubscribe = usersRef
      .where('email', '!=', user.email)
      .onSnapshot(querySnapshot => {
        const usersFirestore = querySnapshot
          .docChanges()
          .map(({doc}) => {
            const {name, avatar, online} = doc.data();
            const id = doc.id;
            return {id, name, avatar, online};
          })
          .sort((a, b) => b.online - a.online);

        changeData(usersFirestore);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });

    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const createNewMessage = async (participants, name) => {
    console.log(participants);
    const result = await chatApi.createNewMessage(participants);

    navigation.navigate('chat-detail', {
      idRoomChat: result.data.idRoomChat,
      roomName: name,
    });
  };

  const [search, setSearch] = useState('');
  const updateSearch = textChanged => {
    setSearch(textChanged);
  };

  const renderRightBtn = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('chat-list')}>
        <MaterialCommunityIcons name="window-close" color="white" size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderScreen title="New Message" renderRightBtn={renderRightBtn} />
      <SearchBar
        round
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        containerStyle={{
          backgroundColor: 'white',
        }}
        inputContainerStyle={{backgroundColor: 'white'}}
      />
      <ListFriends
        data={users}
        renderRightBtn={otherUser => (
          <TouchableOpacity
            onPress={() =>
              createNewMessage([otherUser.id, user.id], otherUser.name)
            }>
            <Ionicons
              name="md-chatbox-ellipses-outline"
              size={30}
              color="#3A86FF"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NewMessageScreen;
