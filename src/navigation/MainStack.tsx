import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/auth/Login';
import OrgSignup from '../screens/auth/OrgSignup';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OrgDashboard from '../screens/organization/OrgDashboard';
import OrgHeader from '../screens/organization/helpers/OrgHeader';
import {COLORS} from '../constants/colors';
import OrgSurveyDashboard from '../screens/organization/surveys/OrgSurveyDashboard';
import OrgSurveyDetails from '../screens/organization/surveys/helpers/OrgSurveyDetails';
import CarbonDashboard from '../screens/employee/CarbonDashboard';
import NetInfo from '@react-native-community/netinfo';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import Offline from '../screens/misc/Offline';
import AuthLoadingScreen from '../screens/misc/AuthLoadingScreen';
import Notifications from '../screens/organization/Notifications';
import OrgLayout from '../screens/organization';
import UpdateProfile from '../screens/organization/profile/UpdateProfile';
import OrgSurveyForm from '../screens/organization/surveys/form/OrgSurveyForm';

const Stack = createStackNavigator();
const MainStack = () => {
  const [isOnline, setOnline] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setOnline(true);
      } else {
        setOnline(false);
      }
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    // Show a loading indicator while NetInfo is in a loading state
    return <CustomActivityIndicator message="Loading..." size="large" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isOnline ? (
          <>
            <Stack.Screen
              key="Auth"
              name="Auth"
              component={AuthLoadingScreen}
              options={{
                headerShown: false,
              }}></Stack.Screen>
            <Stack.Screen
              options={{headerShown: false}}
              name="Login"
              component={Login}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Signup"
              component={OrgSignup}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="Forgot"
              component={ForgotPassword}
            />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen
              name="OrgDashboard"
              component={OrgLayout}
              options={{
                header: () => <OrgHeader />,
                headerBackTitleVisible: false,
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: COLORS.lightGreen,
                },
              }}
            />
            <Stack.Screen name="Surveys" component={OrgSurveyDashboard} />
            <Stack.Screen
              name="OrgSurveysDetails"
              component={OrgSurveyDetails}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="OrgSurveyForm"
              component={OrgSurveyForm}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen name="Update Profile" component={UpdateProfile} />
            <Stack.Screen name="EmpDashboard" component={CarbonDashboard} />
          </>
        ) : (
          <Stack.Screen
            key="Offline"
            name="Offline"
            component={Offline}
            options={{
              headerShown: false,
            }}></Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
