import React from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Bubble} from 'react-native-gifted-chat';

class AppBubble extends Bubble {
  state = {isVisible: false};

  constructor(props) {
    super(props);
  }

  setIsVisible(isVisible) {
    this.setState({isVisible});
  }

  onPress() {
    this.setIsVisible(!this.state.isVisible);
  }

  renderUsername() {
    const {currentMessage, previousMessage, user} = this.props;

    if (this.props.renderUsernameOnMessage && currentMessage) {
      if (user && currentMessage.user._id === user._id) {
        return null;
      }

      if (!previousMessage.user)
        return (
          <View style={styles.content.usernameView}>
            <Text style={[styles.content.username, this.props.usernameStyle]}>
              {currentMessage.user.name}
            </Text>
          </View>
        );

      if (previousMessage.user._id !== currentMessage.user._id)
        return (
          <View style={styles.content.usernameView}>
            <Text style={[styles.content.username, this.props.usernameStyle]}>
              {currentMessage.user.name}
            </Text>
          </View>
        );
    }
    return null;
  }

  render() {
    const {
      position,
      containerStyle,
      wrapperStyle,
      bottomContainerStyle,
    } = this.props;
    return (
      <View
        style={[
          styles[position].container,
          containerStyle && containerStyle[position],
        ]}>
        {this.renderUsername()}
        <View
          style={[
            styles[position].wrapper,
            this.styledBubbleToNext(),
            this.styledBubbleToPrevious(),
            wrapperStyle && wrapperStyle[position],
          ]}>
          <TouchableWithoutFeedback
            onPress={() => this.onPress()}
            onLongPress={this.onLongPress}
            onBlur={() => console.log(0)}
            accessibilityTraits="text"
            {...this.props.touchableProps}>
            <View>
              {this.renderBubbleContent()}
              <View
                style={[
                  styles[position].bottom,
                  bottomContainerStyle && bottomContainerStyle[position],
                ]}>
                {this.renderTicks()}
                {this.state.isVisible && this.renderTime()}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {this.renderQuickReplies()}
      </View>
    );
  }
}

const styles = {
  left: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#f0f0f0',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomLeftRadius: 3,
    },
    containerToPrevious: {
      borderTopLeftRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
  }),
  right: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#0084ff',
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
    containerToNext: {
      borderBottomRightRadius: 3,
    },
    containerToPrevious: {
      borderTopRightRadius: 3,
    },
    bottom: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
  }),
  content: StyleSheet.create({
    tick: {
      fontSize: 10,
      backgroundColor: 'transparent',
      color: '#fff',
    },
    tickView: {
      flexDirection: 'row',
      marginRight: 10,
    },
    username: {
      top: -3,
      left: 0,
      fontSize: 12,
      backgroundColor: 'transparent',
      color: '#aaa',
    },
    usernameView: {
      flexDirection: 'row',
      marginHorizontal: 10,
    },
  }),
};

export default AppBubble;
