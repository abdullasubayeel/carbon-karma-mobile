import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import OrgDashboard from './OrgDashboard';
import {COLORS} from '../../constants/colors';
import OrgHeader from './helpers/OrgHeader';
import Survey from './surveys/form/OrgSurveyForm';
import OrgSurveyDashboard from './surveys/OrgSurveyDashboard';
import Notifications from './Notifications';
import Icon from 'react-native-vector-icons/AntDesign';
import OIcon from 'react-native-vector-icons/Octicons';
import FIcon from 'react-native-vector-icons/FontAwesome6';
import Profile from './profile/Profile';
import Explore from './Explore';
import Header from '../../components/Header';

const Tab = createBottomTabNavigator();

function OrgLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={OrgDashboard}
        options={{
          header: () => <OrgHeader />,

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
        component={OrgSurveyDashboard}
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
        component={Explore}
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
        component={Profile}
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

export default OrgLayout;
