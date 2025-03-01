import React, {useEffect} from 'react';

import RootNavigator from './src/Navigation';
import 'react-native-gesture-handler';
import {StatusBar, Text} from 'react-native';

const App = () => {
  return (
    <>
      <RootNavigator />
      {/* <Text>index</Text> */}
      <StatusBar backgroundColor={'#2151A0'} />
    </>
  );
};

export default App;
