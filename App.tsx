import React from 'react';
import {SafeAreaView} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {mainStyle} from './src/components/styles/ScreenStyle';
import AppNavigation from './src/navigation/AppNavigation';

// REDUX-TOOLKIT DEPENDENCIES
import {store} from './src/redux/Store';
import {Provider} from 'react-redux';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={mainStyle}>
          <AppNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
