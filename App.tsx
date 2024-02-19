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
import Login from './src/screens/auth/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OrgSignup from './src/screens/auth/OrgSignup';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import EmpDashboard from './src/screens/employee/EmpDashboard';
import OrgDashboard from './src/screens/organization/OrgDashboard';
import OrgHeader from './src/screens/organization/helpers/OrgHeader';
import {COLORS} from './src/constants/colors';
import CarbonDashboard from './src/screens/employee/CarbonDashboard';
import SplashScreen from 'react-native-splash-screen';
import OrgSurveyDashboard from './src/screens/organization/surveys/OrgSurveyDashboard';
import OrgSurveyDetails from './src/screens/organization/surveys/helpers/OrgSurveyDetails';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AuthProvider>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
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
              <Stack.Screen
                name="OrgDashboard"
                component={OrgDashboard}
                options={{
                  headerTitle: () => <OrgHeader />,
                  headerBackVisible: false,
                  headerShadowVisible: false,
                  headerStyle: {
                    backgroundColor: COLORS.lightGreen,
                  },
                }}
              />
              <Stack.Screen
                name="Organisation Surveys"
                component={OrgSurveyDashboard}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="OrgSurveysDetails"
                component={OrgSurveyDetails}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen name="EmpDashboard" component={CarbonDashboard} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}

export default App;
