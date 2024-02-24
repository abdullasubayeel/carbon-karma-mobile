import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {COLORS} from '../../constants/colors';

import Icon from 'react-native-vector-icons/AntDesign';
import OIcon from 'react-native-vector-icons/Octicons';
import FIcon from 'react-native-vector-icons/FontAwesome6';
import Header from '../../components/Header';
import EmpDashboard from './EmpDashboard';
import EmpHeader from './helpers/EmpHeader';
import EmpSurveyDashboard from './surveys/EmpSurveyDashboard';
import EmpExplore from './EmpExplore';
import EmpProfile from './EmpProfile';

const Tab = createBottomTabNavigator();

function EmpLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={EmpDashboard}
        options={{
          header: () => <EmpHeader />,

          headerShadowVisible: false,

          tabBarStyle: {
            height: 75,
            paddingBottom: 12,
            paddingTop: 12,
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),

          tabBarActiveTintColor: COLORS.primaryColor,
        }}
      />
      <Tab.Screen
        name="Surveys"
        component={EmpSurveyDashboard}
        options={{
          header: () => <Header heading="Surveys" />,
          tabBarStyle: {
            height: 75,
            paddingBottom: 12,
            paddingTop: 12,
          },
          tabBarIcon: ({color, size}) => (
            <Icon name="form" color={color} size={size} />
          ),

          tabBarActiveTintColor: COLORS.primaryColor,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={EmpExplore}
        options={{
          header: () => <Header heading="Explore" />,
          tabBarStyle: {
            height: 75,
            paddingBottom: 12,
            paddingTop: 12,
          },
          tabBarIcon: ({color, size}) => (
            <FIcon name="boxes-stacked" color={color} size={size} />
          ),
          tabBarActiveTintColor: COLORS.primaryColor,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={EmpProfile}
        options={{
          header: () => <Header heading="Profile" />,
          tabBarStyle: {
            height: 75,
            paddingBottom: 12,
            paddingTop: 12,
          },

          tabBarIcon: ({color, size}) => (
            <OIcon name="person" color={color} size={size} />
          ),
          tabBarActiveTintColor: COLORS.primaryColor,
        }}
      />
    </Tab.Navigator>
  );
}

export default EmpLayout;
