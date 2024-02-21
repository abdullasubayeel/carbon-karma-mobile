import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrgDashboard from './OrgDashboard';
import {COLORS} from '../../constants/colors';
import OrgHeader from './helpers/OrgHeader';
import Survey from './surveys/Survey';
import OrgSurveyDashboard from './surveys/OrgSurveyDashboard';
import Notifications from './Notifications';
import Icon from 'react-native-vector-icons/AntDesign';
import OIcon from 'react-native-vector-icons/Octicons';
import Profile from './profile/Profile';

const Tab = createBottomTabNavigator();

function OrgLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={OrgDashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),

          tabBarActiveTintColor: COLORS.primaryColor,
        }}
      />
      <Tab.Screen
        name="Surveys"
        component={OrgSurveyDashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="form" color={color} size={size} />
          ),

          tabBarActiveTintColor: COLORS.primaryColor,
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="bells" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <OIcon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default OrgLayout;
