import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Screen from '../components/Screen';
import HeaderScreen from '../components/HeaderScreen';
import {Inbox, InboxDeleteAction, InboxSeparator} from '../components/inbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../auth/useAuth';

import firestore from '@react-native-firebase/firestore';

const chatsRef = firestore().collection('chats');

function ChatListScreen({navigation}) {
  const [data, setData] = useState([]);
  const {user} = useAuth();

  useEffect(() => {
    const unsubscribe = chatsRef
      .where('participantsId', 'array-contains', user.id)
      .onSnapshot(querySnapshot => {
        querySnapshot.docChanges().map(({doc}) => {
          console.log(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <Screen style={styles.container}>
      <HeaderScreen
        title="Messages"
        image={require('../../assets/avatar.jpg')}
        renderRightBtn={() => (
          <TouchableOpacity onPress={() => navigation.navigate('create-chat')}>
            <MaterialCommunityIcons name="plus" color="white" size={30} />
          </TouchableOpacity>
        )}
      />
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Inbox
            name={item.name}
            message={item.message}
            time={item.time}
            onPress={() => navigation.navigate('chat-detail')}
            renderRightActions={() => <InboxDeleteAction />}
          />
        )}
        ItemSeparatorComponent={InboxSeparator}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#f8f4f4', flex: 1},
});

export default ChatListScreen;
