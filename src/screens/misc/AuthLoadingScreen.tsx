import React, {useContext, useLayoutEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {getAsyncData} from '../../utilities/asyncStorage';
import AuthContext from '../../context/AuthProvider';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';

function AuthLoadingScreen({navigation}: any) {
  const {setAuth} = useContext(AuthContext);
  // Fetch the token from storage then navigate to our appropriate place

  useLayoutEffect(() => {
    const navigateToScreen = async () => {
      try {
        const curUser = await getAsyncData('user');
        //@ts-ignore

        const parsedUser = JSON.parse(curUser ? curUser : '{}');

        //set data in context
        setAuth(parsedUser);

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        if (parsedUser?.role === 'head') {
          navigation.replace('OrgDashboard');
        } else if (parsedUser?.role === 'employee') {
          navigation.replace('EmpDashboard');
        } else {
          navigation.replace('Login');
        }
      } catch (e: any) {
        console.log('Error: AUTH', e);
        navigation.replace('Login');
      }
    };
    navigateToScreen();
  }, []);

  return <CustomActivityIndicator message="Loading..." size="large" />;
}

export default AuthLoadingScreen;
