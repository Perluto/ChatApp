import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import ListFriends from '../components/ListFriends';
import HeaderScreen from '../components/HeaderScreen';

import firestore from '@react-native-firebase/firestore';
import useAuth from '../auth/useAuth';

const usersRef = firestore().collection('users');

function ContactsScreen({navigation}) {
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

  const [search, setSearch] = useState('');
  const updateSearch = textChanged => {
    setSearch(textChanged);
  };

  return (
    <View style={styles.container}>
      <HeaderScreen title="Contacts" />
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
        renderRightBtn={() => (
          <TouchableOpacity onPress={() => console.log(1)}>
            <Ionicons name="call-outline" size={30} color="#3A86FF" />
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

export default ContactsScreen;
