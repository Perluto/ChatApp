import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, LogBox} from 'react-native';
import Screen from '../../components/Screen';
import HeaderScreen from '../../components/HeaderScreen';
import {Inbox, InboxDeleteAction, InboxSeparator} from '../../components/inbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';
import chatApi from '../../api/chat';

LogBox.ignoreLogs(['Warning: ...']);

function ChatListScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const {user} = useAuth();
  const getMessagesApi = useApi(chatApi.getMessages);

  const getMessages = async () => {
    setRefreshing(true);
    const result = await getMessagesApi.request();

    if (result.ok) {
      setMessages(result.data);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <Screen style={styles.container}>
      <HeaderScreen
        title="Messages"
        renderRightBtn={() => (
          <TouchableOpacity onPress={() => navigation.navigate('create-chat')}>
            <MaterialCommunityIcons name="plus" color="white" size={30} />
          </TouchableOpacity>
        )}
      />
      <FlatList
        contentContainerStyle={{paddingBottom: 50}}
        data={messages}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <Inbox
            room={item}
            onPress={() =>
              navigation.navigate('chat-detail', {
                roomName: item.name,
                idRoomChat: item.id,
              })
            }
            renderRightActions={() => <InboxDeleteAction />}
          />
        )}
        ItemSeparatorComponent={InboxSeparator}
        refreshing={refreshing}
        onRefresh={() => getMessages(user.id)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: '#f8f4f4', flex: 1},
});

export default ChatListScreen;
/*
  const changeData = useCallback(
    rooms => {
      setRooms(prevRooms => {
        const tmp = [...prevRooms];

        rooms.forEach(item => {
          const index = tmp.findIndex(e => e.id === item.id);
          if (index === -1) tmp.push(item);
          else {
            tmp[index] = item;
          }
        });
        return tmp;
      });
    },
    [rooms],
  );

  useEffect(() => {
    const unsubscribe = chatsRef
      .where('participantsId', 'array-contains', user.id)
      .onSnapshot(querySnapshot => {
        const roomsFirestore = querySnapshot.docChanges().map(({doc}) => {
          let tmp = doc.data().participants;
          let room = tmp[0].id !== user.id ? tmp[0] : tmp[1];
          room.idRoomChat = doc.id;
          return room;
        });

        changeData(roomsFirestore);
      });
    return () => unsubscribe();
  }, []);
*/
