import React, {useLayoutEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {getAsyncData} from '../../utilities/asyncStorage';

function AuthLoadingScreen({navigation}: any) {
  // Fetch the token from storage then navigate to our appropriate place

  useLayoutEffect(() => {
    const navigateToScreen = async () => {
      const curUser = await getAsyncData('user');
      //@ts-ignore
      const parsedUser = JSON.parse(curUser);
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.

      if (parsedUser?.role === 'head') {
        navigation.replace('OrgDashboard');
      } else if (parsedUser?.role === 'employee') {
        navigation.replace('EmpDashboard');
      } else {
        navigation.replace('Login');
      }
    };
    navigateToScreen();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default AuthLoadingScreen;
