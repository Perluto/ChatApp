import React from 'react';
import {Message} from 'react-native-gifted-chat';

import AppBubble from './AppBubble';

class AppMessage extends Message {
  constructor(props) {
    super(props);
  }

  renderBubble() {
    const {containerStyle, onMessageLayout, ...props} = this.props;
    if (this.props.renderBubble) {
      return this.props.renderBubble(props);
    }

    return <AppBubble {...props} />;
  }
}

export default AppMessage;
