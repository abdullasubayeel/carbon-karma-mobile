/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {AuthProvider} from './src/context/AuthProvider';
import store from './src/redux/store';
import {Provider} from 'react-redux';
import Login from './src/screens/auth/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrgSignup from './src/screens/auth/OrgSignup';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={OrgSignup} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
