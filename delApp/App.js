import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';

import RootNavigator from './src/navigation/rootNavigator';

const App = () => {
  return (
    <Fragment>
      <RootNavigator />
    </Fragment>
  );
};

const styles = StyleSheet.create({});

export default App;
