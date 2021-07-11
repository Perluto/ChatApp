import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  LogBox,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SearchBar, Input} from 'react-native-elements';
import AppAvatar from '../../components/AppAvatar';
import ActivityIndicator from '../../components/ActivityIndicator';

import HeaderScreen from '../../components/HeaderScreen';
import useAuth from '../../auth/useAuth';
import useApi from '../../hooks/useApi';
import groupApi from '../../api/group';
import userApi from '../../api/user';

LogBox.ignoreLogs(['Warning: ...']);

function NewGroupScreen({navigation}) {
  const [data, setData] = useState([]);
  const {user} = useAuth();
  const [error, setError] = useState();
  const getUserApi = useApi(userApi.getUsers);
  const newGroupApi = useApi(groupApi.createNewGroup);

  const [groupName, setGroupName] = useState(null);

  const getUser = async () => {
    const result = await getUserApi.request();
    setData(result.data);
  };

  useEffect(() => {
    getUser();
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

  const createNewGroup = async () => {
    if (!groupName) {
      setError('Group name is required');
      return;
    }

    const members = data.filter(e => e.checked === true).map(e => e.id);
    members.push(user.id);

    if (members.length < 3) {
      setError('Group has at least 3 members');
      return;
    }

    const result = await newGroupApi.request(groupName, members);

    navigation.navigate('group-detail', {
      idRoomChat: result.data.idRoomChat,
      roomName: result.data.groupName,
    });
  };

  const [search, setSearch] = useState('');

  const updateSearch = textChanged => {
    setSearch(textChanged);
  };

  const renderLeftBtn = () => {
    return (
      <TouchableOpacity onPress={createNewGroup}>
        <MaterialCommunityIcons name="check" color="white" size={25} />
      </TouchableOpacity>
    );
  };

  const renderRightBtn = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('group-list')}>
        <MaterialCommunityIcons name="window-close" color="white" size={25} />
      </TouchableOpacity>
    );
  };

  const handleCheck = item => {
    const tmp = [...data];
    tmp.forEach(e => {
      if (e.id === item.id) {
        e.checked = !e.checked;
      }
    });
    setData(tmp);
  };

  return (
    <>
      <ActivityIndicator visible={getUserApi.loading || newGroupApi.loading} />
      <View style={styles.container}>
        <HeaderScreen
          title="New Group"
          renderLeftBtn={renderLeftBtn}
          renderRightBtn={renderRightBtn}
        />
        <Input
          placeholder="Type name group"
          onChangeText={value => setGroupName(value)}
          value={groupName}
          style={{borderColor: 'black'}}
          errorMessage={error}
        />
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
        <FlatList
          contentContainerStyle={{paddingVertical: 10, paddingHorizontal: 5}}
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.boxContainer}
              onPress={() => handleCheck(item)}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <AppAvatar size={60} imageURI={item.avatar} />
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <MaterialCommunityIcons
                name={
                  item.checked
                    ? 'check-circle-outline'
                    : 'checkbox-blank-circle-outline'
                }
                color="green"
                size={25}
                style={{justifyContent: 'flex-start'}}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    marginLeft: 15,
    fontSize: 25,
    color: '#242424',
  },
});

export default NewGroupScreen;
