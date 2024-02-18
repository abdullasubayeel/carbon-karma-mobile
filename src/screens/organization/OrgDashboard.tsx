import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useLayoutEffect, useState} from 'react';
import {orgStyles} from '../../styles/organizationStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {BarChart} from 'react-native-gifted-charts';
import moment from 'moment';
import EmployeeTile from './helpers/EmployeeTile';
import AuthContext from '../../context/AuthProvider';
import {
  useGetEmployeesQuery,
  useGetOrgDashboardMutation,
} from '../../api/endpoint/organizationEndpoint';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import {OrgDashboardResponse} from '../../enums/organization';
import NeutralityCard from './helpers/NeutralityCard';

const OrgDashboard = ({navigation}: any) => {
  const {auth} = useContext(AuthContext);
  const {data: employees, isLoading: isEmployeesLoading} = useGetEmployeesQuery(
    auth.ID,
  );
  console.log('emloyees', employees);
  const [getOrgDashboard, {isLoading: isOrgDashboardLoading}] =
    useGetOrgDashboardMutation();

  const [dashboardData, setDashboardData] = useState<OrgDashboardResponse>();

  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, spacing: 2, frontColor: '#ED6665'},
    {value: 20, spacing: 2, frontColor: '#ED6665'},
    {value: 20, frontColor: '#ED6665'},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 25, frontColor: '#ED6665'},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 20, frontColor: '#ED6665'},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 40, frontColor: '#ED6665'},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: 'gray'},
      frontColor: '#177AD5',
    },
    {value: 30, frontColor: '#ED6665'},
  ];

  const detailedGraph = [
    {
      date: '2023-07-01',
      transport: 0,
      electricity: 0,
      machine: 0,
      utility: 0,
    },
    {
      date: '2023-08-01',
      transport: 0,
      electricity: 0,
      machine: 0,
      utility: 0,
    },
    {
      date: '2023-09-01',
      transport: 0,
      electricity: 0,
      machine: 0,
      utility: 0,
    },
    {
      date: '2023-10-01',
      transport: 0,
      electricity: 0,
      machine: 0,
      utility: 0,
    },
    {
      date: '2023-11-01',
      transport: 0,
      electricity: 0,
      machine: 0,
      utility: 0,
    },
    {
      date: '2023-12-01',
      transport: 0,
      electricity: 0,
      machine: 0,
      utility: 0,
    },
    {
      date: '2024-01-01',
      transport: 78.03,
      electricity: 104.55,
      machine: 79.2,
      utility: 0.6799999999999999,
    },
    {
      date: '2024-02-01',
      transport: 0,
      electricity: 0,
      machine: 0,
      utility: 0,
    },
  ];

  const newArray: any = dashboardData?.carbonEmissionGraphData
    .slice(3, 8)
    .map(obj => {
      return [
        {
          label: moment(obj.date).format('MMM-YY'),
          value: obj.transport,
          spacing: 8,
          labelWidth: 50,

          labelTextStyle: {color: 'gray'},
          frontColor: '#177AD5',
        },
        {
          label: obj.date,
          value: obj.electricity,
          spacing: 8,
          frontColor: '#156900',
        },
        {
          label: obj.date,
          value: obj.machine,
          spacing: 8,
          frontColor: '#a57dca',
        },
        {
          label: obj.date,
          value: obj.utility,
          spacing: 8,
          frontColor: '#d1ac89',
        },
      ];
    });

  const updatedArray = [].concat(...newArray);

  const renderTitle = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 8,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#177AD5',
              marginRight: 8,
            }}
          />
          <Text style={orgStyles.small}>Transport</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#156900',
              marginRight: 8,
            }}
          />
          <Text style={orgStyles.small}>Electricity</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#a57dca',
              marginRight: 8,
            }}
          />
          <Text style={orgStyles.small}>Machines</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#d1ac89',
              marginRight: 8,
            }}
          />
          <Text style={orgStyles.small}>Utility</Text>
        </View>
      </View>
    );
  };

  useLayoutEffect(() => {
    async function getDashboard() {
      const response = await getOrgDashboard({
        fromDate: '2023-07-18T05:54:59.154Z',
        organizationId: '6592c65302082856df0e51e2',
        toDate: '2024-02-18T05:54:59.154Z',
      }).unwrap();

      setDashboardData(response);
    }
    getDashboard();
  }, []);

  if (isEmployeesLoading || isOrgDashboardLoading) {
    <CustomActivityIndicator message="Fetching Dashboard data..." />;
  }

  return (
    <ScrollView>
      <View style={orgStyles.dashboardBodyContainer}>
        {/* Emission AMount */}
        <View style={orgStyles.wideContainer}>
          <View>
            <Text style={orgStyles.small}>Total Emission (this Month)</Text>
            <Text style={orgStyles.largeText}>
              {dashboardData?.totalCarbonEmission} kg
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Survey')}
            style={orgStyles.analyticsButton}>
            <Icon
              name="analytics-outline"
              color={COLORS.primaryColor}
              size={18}
            />
            <Text style={orgStyles.analyticsText}>Take Survey</Text>
          </TouchableOpacity>
        </View>

        {/* Neutrality Card */}
        <View style={orgStyles.cardContainer}>
          <NeutralityCard
            date={dashboardData?.carbonNuetrality.date}
            carbonNeutral={dashboardData?.carbonNuetrality.carbonNuetral}
            message={dashboardData?.carbonNuetrality.message}
          />
          <View style={{gap: 8, flex: 1}}>
            <View style={orgStyles.offsetCard}>
              <Text style={orgStyles.small}>Offset</Text>
              <Text style={orgStyles.boldText}>
                ₹ {dashboardData?.totalOffsetContribution}
              </Text>
            </View>
            <View style={orgStyles.empOrgCard}>
              <Text style={orgStyles.boldText}>CO2e</Text>
              <Text style={orgStyles.small}>Organization</Text>
              <Text style={orgStyles.small}>
                {dashboardData?.totalOrgCarbonEmission} kg
              </Text>
              <Text style={orgStyles.small}>Empolyees</Text>
              <Text style={orgStyles.small}>
                {dashboardData?.totalEmployeeCarbonEmission} kg
              </Text>
            </View>
          </View>
        </View>

        {/* 3 Cards */}
        <View style={orgStyles.wideContainer}>
          <Text style={orgStyles.boldText}>Organizations Surveys</Text>
          <TouchableOpacity>
            <Text style={orgStyles.small}>View All</Text>
          </TouchableOpacity>
        </View>

        {renderTitle()}
        <View style={orgStyles.detailedGraph}>
          <BarChart
            data={updatedArray}
            barWidth={8}
            spacing={24}
            roundedTop
            roundedBottom
            hideRules
            xAxisThickness={0}
            yAxisThickness={0}
            yAxisTextStyle={{color: 'gray'}}
            noOfSections={3}
            width={Dimensions.get('screen').width * 0.8}
          />
        </View>

        <Text style={orgStyles.boldText}>Employees</Text>
        <FlatList
          horizontal={true}
          data={employees}
          keyExtractor={item => item._id}
          style={{marginVertical: 12, paddingVertical: 8}}
          ItemSeparatorComponent={() => <View style={{width: 8}} />}
          renderItem={({item}) => <EmployeeTile {...item} />}></FlatList>
      </View>
    </ScrollView>
  );
};

export default OrgDashboard;

const styles = StyleSheet.create({});