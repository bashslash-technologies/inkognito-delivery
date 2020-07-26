import React, {Fragment} from 'react';
import 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';

import RootNavigator from './src/navigation/rootNavigator';

const App = () => {
  return (
    <Fragment>
      <RootNavigator />
      <FlashMessage />
    </Fragment>
  );
};

export default App;
