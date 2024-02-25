import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {employeeStyles} from '../../styles/employeeStyles';
import {COLORS} from '../../constants/colors';
import PieChart from 'react-native-pie-chart';
import * as Progress from 'react-native-progress';

import Icon from 'react-native-vector-icons/FontAwesome';
import Fa6Icon from 'react-native-vector-icons/FontAwesome6';
import FaIcon from 'react-native-vector-icons/FontAwesome5';
import MiIcon from 'react-native-vector-icons/MaterialIcons';
import {LineChart} from 'react-native-gifted-charts';
import {useGetEmployeeDashboardMutation} from '../../api/endpoint/employeeEndpoint';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import {OrgDashboardResponse} from '../../enums/organization';
import AuthContext from '../../context/AuthProvider';
import {EmployeeDashboardType} from '../../enums/employee';

const leaf = require('../../assets/images/leaf.png');
const emission = require('../../assets/images/emission.png');

const EmpDashboard = ({navigation}: any) => {
  const {auth} = useContext(AuthContext);
  console.log(auth);
  const [getEmpDashboard, {isLoading: isDashboardLoading}] =
    useGetEmployeeDashboardMutation();
  const [dashboardData, setDashboardData] = useState<EmployeeDashboardType>();

  const widthAndHeight = 150;

  const vehicleEmission =
    dashboardData?.carbonEmissionGraphData.reduce(
      (acc, cur) => acc + cur.vehicle,
      0,
    ) ?? 0;
  const houseEmission =
    dashboardData?.carbonEmissionGraphData.reduce(
      (acc, cur) => acc + cur.house,
      0,
    ) ?? 0;
  const electricityEmission =
    dashboardData?.carbonEmissionGraphData.reduce(
      (acc, cur) => acc + cur.electricity,
      0,
    ) ?? 0;
  const series = [vehicleEmission, houseEmission, electricityEmission];
  var seriesSum = vehicleEmission + houseEmission + electricityEmission;
  const sliceColor = ['#fbd203', '#ff5e00', '#278d83'];
  // const lineChartData = [{value: 50}, {value: 80}, {value: 90}];
  const lineChartData = dashboardData?.carbonEmission.map(obj => {
    return {
      value: obj.carbonEmission,
    };
  });

  const handleSubmitBtn = () => {
    navigation.navigate('Surveys');
  };

  useEffect(() => {
    async function getDashboard() {
      const response = await getEmpDashboard({
        fromDate: '2023-07-18T05:54:59.154Z',
        employeeId: auth._id,
        toDate: '2024-02-18T05:54:59.154Z',
      }).unwrap();

      setDashboardData(response);
    }
    getDashboard();
  }, []);

  if (isDashboardLoading) {
    return (
      <CustomActivityIndicator message="Getting Empdashboard" size="large" />
    );
  }
  return (
    <ScrollView>
      <View style={styles.bgContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={employeeStyles.heading}>This Month</Text>
          <Pressable onPress={handleSubmitBtn}>
            <Text style={styles.anchorBtn}>Submit Survey</Text>
          </Pressable>
        </View>
        {/* Main Card */}
        <View style={employeeStyles.card}>
          <Text style={employeeStyles.titleText}>Carbon Emission</Text>
          <Text>Total = Electricity + Vehicle + House</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 24}}>
            <View style={{position: 'relative'}}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 22, fontWeight: '700', color: '#222'}}>
                  {dashboardData?.totalCarbonEmission} kg
                </Text>
                <Text>Emission</Text>
              </View>
              <PieChart
                widthAndHeight={widthAndHeight}
                series={seriesSum === 0 ? [1] : series}
                sliceColor={seriesSum == 0 ? ['#2a8400'] : sliceColor}
                coverRadius={0.9}
                style={{flex: 1, margin: 12}}
              />
            </View>

            <View style={{gap: 12}}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                <Icon name="car" color={'#ecd451'} size={24} />
                <View>
                  <Text>Transport</Text>
                  <Text style={employeeStyles.boldText}>
                    {vehicleEmission.toFixed(2)} kg
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                <Fa6Icon name="bolt-lightning" size={24} color={'#278d83'} />
                <View>
                  <Text>Electricity</Text>
                  <Text style={employeeStyles.boldText}>
                    {electricityEmission} kg
                  </Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
                <Icon name="home" size={32} color={'#ff5e00'} />
                <View style={{flex: 1}}>
                  <Text>House</Text>
                  <Text style={employeeStyles.boldText}>
                    {houseEmission.toFixed(2)} kg
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Vehicle and House Card */}
        {/* <View style={{flexDirection: 'row', gap: 16, alignItems: 'stretch'}}>
          <View style={[employeeStyles.card, {flex: 1}]}>
            <Text style={employeeStyles.boldText}>Vehicle</Text>
            <View style={{flexDirection: 'row', marginVertical: 8}}>
              <Icon name="road" size={24} color={'#2b2b2b'} />
              <Text style={employeeStyles.boldText}> 200 Km</Text>
            </View>
            <Text>Goal: -300</Text>
            <Progress.Bar
              progress={0.3}
              width={150}
              color={COLORS.primaryColor}
              style={{marginVertical: 12}}></Progress.Bar>
          </View>
          <View style={[employeeStyles.card, {flex: 1}]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={employeeStyles.boldText}> House</Text>
              <Icon name="plus" size={24} color={'#2b2b2b'} />
            </View>

            <View>
              <View style={{flexDirection: 'row', marginVertical: 8, gap: 16}}>
                <MiIcon name="soup-kitchen" size={24} color={'#0c5700'} />
                <Text style={employeeStyles.boldText}> 200 Km</Text>
              </View>
              <View style={{flexDirection: 'row', marginVertical: 8, gap: 16}}>
                <FaIcon name="lightbulb" size={24} color={'#e1b532'} />
                <Text style={employeeStyles.boldText}> 0.03 KWh</Text>
              </View>
            </View>
          </View>
        </View> */}

        <View style={[employeeStyles.card]}>
          <Text style={employeeStyles.titleText}>Emission </Text>
          <Text> Last 7 months</Text>

          <LineChart
            data={lineChartData}
            yAxisThickness={0}
            xAxisThickness={0}
            width={Dimensions.get('screen').width * 0.7}
            noOfSections={4}
            height={120}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EmpDashboard;

const styles = StyleSheet.create({
  bgContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  anchorBtn: {
    color: '#003771',
    backgroundColor: '#e0e9ff',
    borderRadius: 12,
    fontWeight: '600',
    padding: 8,
    elevation: 2,
  },
  mainCardContent: {},
});
