/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AuthProvider} from './src/context/AuthProvider';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import MainStack from './src/navigation/MainStack';
// import {PersistGate} from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <MainStack />
          {/* </PersistGate> */}
        </Provider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
