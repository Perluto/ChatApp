import React from 'react';
import {Header} from 'react-native-elements';

function HeaderScreen({title, renderRightBtn = null, renderLeftBtn = null}) {
  return (
    <Header
      leftComponent={renderLeftBtn && renderLeftBtn()}
      centerComponent={{text: title, style: {color: '#fff', fontSize: 25}}}
      rightComponent={renderRightBtn && renderRightBtn()}
    />
  );
}

export default HeaderScreen;
