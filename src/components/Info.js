import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Avatar, ListItem, Icon} from 'react-native-elements';
import * as ImagePicker from 'react-native-image-picker';
import * as Yup from 'yup';

import ModalChange from './ModalChange';

import useAuth from '../auth/useAuth';

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
      onPress: () => auth.logOut(),
    },
  ];

  const auth = useAuth();
  const [visible, setVisible] = useState(false);
  const [dataModal, setDataModal] = useState();

  const toggleOverlay = name => {
    setVisible(!visible);
    if (name === 'password')
      setDataModal({
        id: 'password',
        title: 'Change Password',
        textContentType: 'password',
        icon: 'lock',
        onPress: changePassword,
      });

    if (name === 'name')
      setDataModal({
        id: 'name',
        title: 'Change Name',
        textContentType: 'name',
        icon: 'account',
        onPress: changeName,
      });
  };

  const changePassword = newPassword => {
    console.log(newPassword);
  };

  const changeName = newName => {
    console.log(newName);
  };

  const handleSelectImg = () => {
    ImagePicker.launchImageLibrary({mediaType: 'photo'}, response => {
      console.log(response);
    });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.profile}>
          <Avatar
            source={require('../../assets/avatar.jpg')}
            rounded
            containerStyle={{borderWidth: 1}}
            size={80}
          />
          <Text style={styles.name}>Hoang</Text>
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
