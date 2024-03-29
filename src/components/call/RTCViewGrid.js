import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RTCView} from 'react-native-connectycube';
import {CallService} from '../../servicesCall';
import CallingLoader from './CallingLoader';

export default ({streams, isActiveSelect, userCall}) => {
  const style = isActiveSelect ? styles.whiteView : styles.blackView;
  const RTCViewRendered = ({userId, stream}) => {
    if (stream) {
      return (
        <RTCView
          objectFit="cover"
          style={styles.blackView}
          key={userId}
          streamURL={stream.toURL()}
        />
      );
    }

    return (
      <View style={style}>
        <CallingLoader
          name={CallService.getUserById(userId, userCall, 'name')}
        />
      </View>
    );
  };

  const streamsCount = streams.length;

  let RTCListView = null;

  switch (streamsCount) {
    case 1:
      RTCListView = (
        <RTCViewRendered
          userId={streams[0].userId}
          stream={streams[0].stream}
        />
      );
      break;

    case 2:
      RTCListView = (
        <View style={styles.inColumn}>
          <RTCViewRendered
            userId={streams[0].userId}
            stream={streams[0].stream}
          />
          <RTCViewRendered
            userId={streams[1].userId}
            stream={streams[1].stream}
          />
        </View>
      );
      break;

    case 3:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[0].userId}
              stream={streams[0].stream}
            />
            <RTCViewRendered
              userId={streams[1].userId}
              stream={streams[1].stream}
            />
          </View>
          <RTCViewRendered
            userId={streams[2].userId}
            stream={streams[2].stream}
          />
        </View>
      );
      break;

    case 4:
      RTCListView = (
        <View style={styles.inColumn}>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[0].userId}
              stream={streams[0].stream}
            />
            <RTCViewRendered
              userId={streams[1].userId}
              stream={streams[1].stream}
            />
          </View>
          <View style={styles.inRow}>
            <RTCViewRendered
              userId={streams[2].userId}
              stream={streams[2].stream}
            />
            <RTCViewRendered
              userId={streams[3].userId}
              stream={streams[3].stream}
            />
          </View>
        </View>
      );
      break;

    default:
      break;
  }

  return <View style={style}>{RTCListView}</View>;
};

const styles = StyleSheet.create({
  blackView: {
    flex: 1,
    backgroundColor: 'black',
  },
  whiteView: {
    flex: 0,
    backgroundColor: 'white',
  },
  inColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  inRow: {
    flex: 1,
    flexDirection: 'row',
  },
});
