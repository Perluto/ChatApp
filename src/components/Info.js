import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Platform} from 'react-native';
import {Avatar, ListItem, Icon} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import * as Yup from 'yup';
import storage from '@react-native-firebase/storage';

import ModalChange from './ModalChange';

import useAuth from '../auth/useAuth';
import {AuthService, CallService} from '../servicesCall';

const validateSchema = Yup.object().shape({
  password: Yup.string().min(6).required().label('Password'),
  name: Yup.string().max(20).min(5).required().label('Name'),
});

function Info() {
  const list = [
    {
      title: 'Change Name',
      icon: 'person-outline',
      onPress: () => toggleOverlay('name'),
    },
    {
      title: 'Change Avatar',
      icon: 'face',
      onPress: () => handleSelectImg(),
    },
    {
      title: 'Change Password',
      icon: 'security',
      onPress: () => toggleOverlay('password'),
    },
    {
      title: 'Logout',
      icon: 'logout',
      onPress: () => logOutHandle(),
    },
  ];

  const auth = useAuth();
  const [visible, setVisible] = useState(false);
  const [dataModal, setDataModal] = useState();
  const [user, setUser] = useState(null);

  const logOutHandle = async () => {
    auth.logOut();
    await AuthService.logout();
    CallService.stopCall();
  };

  const toggleOverlay = name => {
    setVisible(!visible);
    if (name === 'password')
      setDataModal({
        id: 'password',
        title: 'Change Password',
        textContentType: 'password',
        icon: 'lock',
        onPress: onChangeData,
      });

    if (name === 'name')
      setDataModal({
        id: 'name',
        title: 'Change Name',
        textContentType: 'name',
        icon: 'account',
        onPress: onChangeData,
      });
  };

  const onChangeData = (newData, {props}) => {
    console.log(props);
  };

  const uploadImg = async img => {
    const reference = storage().ref(`avatar/${user.id}`);
    await reference.putFile(img.uri);
  };

  const handleSelectImg = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel) uploadImg(response);
    });
  };

  useEffect(() => {
    setUser(auth.user);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar
            source={
              user?.avatarURI
                ? {uri: user.avatar}
                : require('../../assets/avatar.jpg')
            }
            rounded
            containerStyle={{borderWidth: 1}}
            size={80}
          />
          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <View style={styles.separator}></View>
        <View>
          {list.map((item, i) => (
            <ListItem
              key={i}
              bottomDivider
              onPress={item.onPress ? item.onPress : null}>
              <Icon name={item.icon} />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          ))}
        </View>
      </View>
      {visible && (
        <ModalChange
          visible={visible}
          toggleOverlay={toggleOverlay}
          data={dataModal}
          validateSchema={validateSchema}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f8f4f4'},
  profile: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold',
    shadowOpacity: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f8f4f4',
    alignContent: 'center',
  },
});

export default Info;
