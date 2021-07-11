import React, {useState, useEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, LogBox} from 'react-native';
import Screen from '../../components/Screen';
import HeaderScreen from '../../components/HeaderScreen';
import {Inbox, InboxDeleteAction, InboxSeparator} from '../../components/inbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';
import groupApi from '../../api/group';

LogBox.ignoreLogs(['Warning: ...']);

function GroupListScreen({navigation}) {
  const [messages, setMessages] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const {user} = useAuth();
  const getMessagesApi = useApi(groupApi.getGroupMessages);

  const getMessages = async idUser => {
    setRefreshing(true);
    const result = await getMessagesApi.request(idUser);

    if (result.ok) {
      setMessages(result.data);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    getMessages(user.id);
  }, []);

  return (
    <Screen style={styles.container}>
      <HeaderScreen
        title="Groups"
        renderRightBtn={() => (
          <TouchableOpacity onPress={() => navigation.navigate('create-group')}>
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
              navigation.navigate('group-detail', {
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

export default GroupListScreen;
