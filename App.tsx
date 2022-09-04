import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import TikTokScreen from './src/screens/TikTokScreen';

export default () => {
  library.add(fas);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <TikTokScreen />
    </SafeAreaProvider>
  );
};
