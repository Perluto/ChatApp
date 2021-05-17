import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import ConnectyCube from 'react-native-connectycube';
import AwesomeAlert from 'react-native-awesome-alerts';
import ListFriends from '../components/ListFriends';
import HeaderScreen from '../components/HeaderScreen';
import {CallService, AuthService} from '../servicesCall';
import ToolBar from '../components/call/ToolBar';
import RTCViewGrid from '../components/call/RTCViewGrid';

import firestore from '@react-native-firebase/firestore';
import useAuth from '../auth/useAuth';
import AuthContext from '../auth/context';

export default class ContactsScreen extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this._session = null;
    this.userCall = null;
    this.usersRef = firestore().collection('users');
    this.state = {
      users: [],
      search: '',
      localStream: null,
      remoteStreams: [],
      selectedUsersIds: [],
      isActiveSelect: true,
      isActiveCall: false,
      isIncomingCall: false,
    };
    this._setUpListeners();
  }
  componentDidMount() {
    this.unsubscribe();
  }
  componentWillUnmount() {
    this.unsubscribe();
    CallService.stopCall();
  }
  componentDidUpdate(prevProps, prevState) {
    const currState = this.state;

    if (
      prevState.remoteStreams.length === 1 &&
      currState.remoteStreams.length === 0
    ) {
      CallService.stopCall();
      this.resetState();
    }
  }

  showInomingCallModal = session => {
    this._session = session;
    this.setState({isIncomingCall: true});
  };

  hideInomingCallModal = () => {
    this._session = null;
    this.setState({isIncomingCall: false});
  };

  closeSelect = () => {
    this.setState({isActiveSelect: false});
  };

  setOnCall = () => {
    this.setState({isActiveCall: true});
  };

  initRemoteStreams = opponentsIds => {
    const emptyStreams = opponentsIds.map(userId => ({
      userId,
      stream: null,
    }));

    this.setState({remoteStreams: emptyStreams});
  };

  updateRemoteStream = (userId, stream) => {
    this.setState(({remoteStreams}) => {
      const updatedRemoteStreams = remoteStreams.map(item => {
        if (item.userId === userId) {
          return {userId, stream};
        }

        return {userId: item.userId, stream: item.stream};
      });

      return {remoteStreams: updatedRemoteStreams};
    });
  };

  removeRemoteStream = userId => {
    this.setState(({remoteStreams}) => ({
      remoteStreams: remoteStreams.filter(item => item.userId !== userId),
    }));
  };

  setLocalStream = stream => {
    this.setState({localStream: stream});
  };

  resetState = () => {
    this.setState({
      localStream: null,
      remoteStreams: [],
      selectedUsersIds: [],
      isActiveSelect: true,
      isActiveCall: false,
    });
  };

  _setUpListeners() {
    ConnectyCube.videochat.onCallListener = this._onCallListener;
    ConnectyCube.videochat.onAcceptCallListener = this._onAcceptCallListener;
    ConnectyCube.videochat.onRejectCallListener = this._onRejectCallListener;
    ConnectyCube.videochat.onStopCallListener = this._onStopCallListener;
    ConnectyCube.videochat.onUserNotAnswerListener = this._onUserNotAnswerListener;
    ConnectyCube.videochat.onRemoteStreamListener = this._onRemoteStreamListener;
  }

  _onPressAccept = () => {
    CallService.acceptCall(this._session).then(stream => {
      const {opponentsIDs, initiatorID, currentUserID} = this._session;
      const opponentsIds = [initiatorID, ...opponentsIDs].filter(
        userId => currentUserID !== userId,
      );

      this.initRemoteStreams(opponentsIds);
      this.setLocalStream(stream);
      this.closeSelect();
      this.hideInomingCallModal();
    });
  };

  _onPressReject = () => {
    CallService.rejectCall(this._session);
    this.hideInomingCallModal();
  };

  _onCallListener = (session, extension) => {
    CallService.processOnCallListener(session)
      .then(() => this.showInomingCallModal(session))
      .catch(this.hideInomingCallModal);
  };

  _onAcceptCallListener = (session, userId, extension) => {
    CallService.processOnAcceptCallListener(
      session,
      userId,
      this.userCall,
      extension,
    )
      .then(this.setOnCall)
      .catch(this.hideInomingCallModal);
  };

  _onRejectCallListener = (session, userId, extension) => {
    CallService.processOnRejectCallListener(
      session,
      userId,
      this.userCall,
      extension,
    )
      .then(() => this.removeRemoteStream(userId))
      .catch(this.hideInomingCallModal);
  };

  _onStopCallListener = (session, userId, extension) => {
    const isStoppedByInitiator = session.initiatorID === userId;

    CallService.processOnStopCallListener(
      userId,
      this.userCall,
      isStoppedByInitiator,
    )
      .then(() => {
        if (isStoppedByInitiator) {
          this.resetState();
        } else {
          this.removeRemoteStream(userId);
        }
      })
      .catch(this.hideInomingCallModal);
  };

  _onUserNotAnswerListener = (session, userId) => {
    CallService.processOnUserNotAnswerListener(userId, this.userCall)
      .then(() => this.removeRemoteStream(userId))
      .catch(this.hideInomingCallModal);
  };

  _onRemoteStreamListener = (session, userId, stream) => {
    CallService.processOnRemoteStreamListener(userId)
      .then(() => {
        this.updateRemoteStream(userId, stream);
        this.setOnCall();
      })
      .catch(this.hideInomingCallModal);
  };
  unsubscribe = async () => {
    const {user} = this.context;
    this.usersRef.where('email', '!=', user.email).onSnapshot(querySnapshot => {
      const usersFirestore = querySnapshot
        .docChanges()
        .map(({doc}) => {
          const {name, email, avatar, online} = doc.data();
          const id = doc.id;
          return {id, name, email, avatar, online};
        })
        .sort((a, b) => b.online - a.online);

      this.changeData(usersFirestore);
    });
    const data = await AuthService.getUser({user_tags: ['apple']});
    this.userCall = data.items.map(User => User.user);
    console.log(this.userCall);
  };
  changeData = usersFirestore => {
    this.setState(prevUsers => ({
      users: this.getUser(prevUsers.users, usersFirestore),
    }));
  };
  getUser = (prevUsers, users) => {
    const tmp = prevUsers;

    users.forEach(item => {
      const index = tmp.findIndex(e => e.id === item.id);
      if (index === -1) tmp.push(item);
      else {
        tmp[index] = item;
      }
    });
    return tmp;
  };

  updateSearch = textChanged => {
    this.setState({search: textChanged});
  };
  startCall = async user => {
    const {selectedUsersIds} = this.state;
    const userId = await AuthService.getUser({email: user.email});
    selectedUsersIds.push(userId.user.id);
    this.closeSelect();
    this.initRemoteStreams(selectedUsersIds);
    CallService.startCall(selectedUsersIds).then(stream =>
      this.setLocalStream(stream),
    );
  };

  render() {
    const {
      users,
      search,
      localStream,
      remoteStreams,
      selectedUsersIds,
      isActiveSelect,
      isActiveCall,
      isIncomingCall,
    } = this.state;

    const initiatorName = isIncomingCall
      ? CallService.getUserById(
          this._session.initiatorID,
          this.userCall,
          'name',
        )
      : '';
    const localStreamItem = localStream
      ? [{userId: 'localStream', stream: localStream}]
      : [];
    const streams = [...remoteStreams, ...localStreamItem];

    CallService.setSpeakerphoneOn(remoteStreams.length > 0);
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {isActiveSelect ? (
          <>
            <HeaderScreen title="Contacts" />
            <SearchBar
              round
              placeholder="Type Here..."
              onChangeText={this.updateSearch}
              value={search}
              containerStyle={{
                backgroundColor: 'white',
              }}
              inputContainerStyle={{backgroundColor: 'white'}}
            />
            <ListFriends
              data={users}
              renderRightBtn={item => (
                <TouchableOpacity onPress={() => this.startCall(item)}>
                  <Ionicons name="call-outline" size={30} color="#3A86FF" />
                </TouchableOpacity>
              )}
            />
          </>
        ) : null}
        <RTCViewGrid
          streams={streams}
          isActiveSelect={isActiveSelect}
          userCall={this.userCall}
        />

        <ToolBar
          selectedUsersIds={selectedUsersIds}
          localStream={localStream}
          isActiveSelect={isActiveSelect}
          isActiveCall={isActiveCall}
          resetState={this.resetState}
        />
        <AwesomeAlert
          show={isIncomingCall}
          showProgress={false}
          title={`Incoming call from ${initiatorName}`}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Reject"
          confirmText="Accept"
          cancelButtonColor="red"
          confirmButtonColor="green"
          onCancelPressed={this._onPressReject}
          onConfirmPressed={this._onPressAccept}
          onDismiss={this.hideInomingCallModal}
          alertContainerStyle={{zIndex: 1}}
          titleStyle={{fontSize: 21}}
          cancelButtonTextStyle={{fontSize: 18}}
          confirmButtonTextStyle={{fontSize: 18}}
        />
      </View>
    );
  }
}
/*
import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SearchBar} from 'react-native-elements';
import ListFriends from '../components/ListFriends';
import HeaderScreen from '../components/HeaderScreen';

import firestore from '@react-native-firebase/firestore';
import useAuth from '../auth/useAuth';

const usersRef = firestore().collection('users');
function ContactsScreen() {
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
*/
