import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/auth/Login';
import OrgSignup from '../screens/auth/OrgSignup';
import ForgotPassword from '../screens/auth/ForgotPassword';

import OrgSurveyDashboard from '../screens/organization/surveys/OrgSurveyDashboard';
import OrgSurveyDetails from '../screens/organization/surveys/helpers/OrgSurveyDetails';
import EmpDashboard from '../screens/employee/EmpDashboard';
import NetInfo from '@react-native-community/netinfo';
import CustomActivityIndicator from '../components/CustomActivityIndicator';
import Offline from '../screens/misc/Offline';
import AuthLoadingScreen from '../screens/misc/AuthLoadingScreen';
import Notifications from '../screens/organization/Notifications';
import OrgLayout from '../screens/organization';
import UpdateProfile from '../screens/organization/profile/UpdateProfile';
import OrgSurveyForm from '../screens/organization/surveys/form/OrgSurveyForm';
import Explore from '../screens/organization/Explore';
import OffsetLists from '../screens/organization/offsets/OffsetLists';
import OffsetHistory from '../screens/organization/offsets/OffsetHistory';
import Header from '../components/Header';
import VoucherLists from '../screens/organization/vounchers/VoucherLists';
import Support from '../screens/misc/Support';
import Settings from '../screens/organization/Settings';
import SplashScreen from 'react-native-splash-screen';
import EmpLayout from '../screens/employee';
import EmpHeader from '../screens/employee/helpers/EmpHeader';
import EmpSurveyDetails from '../screens/employee/helpers/EmpSurveyDetails';
import EmpSurveyForm from '../screens/employee/surveys/form/EmpSurveyForm';

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
      SplashScreen.hide();
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
                headerShown: false,
                headerBackTitleVisible: false,
                headerShadowVisible: false,
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

            <Stack.Screen
              name="OffsetList"
              component={OffsetLists}
              options={{
                header: () => <Header heading="Offsets" />,
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="VoucherList"
              component={VoucherLists}
              options={{
                header: () => <Header heading="Vouchers" />,

                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="OffsetHistory"
              component={OffsetHistory}
              options={{
                header: () => <Header heading="Offsets History" />,

                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="OrgExplore"
              component={Explore}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Support"
              component={Support}
              options={{
                header: () => <Header heading="Support" />,

                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                header: () => <Header heading="Settings" />,

                headerShadowVisible: false,
              }}
            />

            {/* Employee Route */}
            <Stack.Screen
              name="EmpDashboard"
              component={EmpLayout}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EmpSurveysDetails"
              component={EmpSurveyDetails}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="EmpSurveyForm"
              component={EmpSurveyForm}
              options={{
                headerShown: false,
              }}
            />
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
