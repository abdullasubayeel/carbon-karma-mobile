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
import React from 'react';
import {orgStyles} from '../../styles/organizationStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {BarChart} from 'react-native-gifted-charts';
import moment from 'moment';
import EmployeeTile from './helpers/EmployeeTile';

const OrgDashboard = () => {
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

  const newArray: any = detailedGraph.slice(3, 8).map(obj => {
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

  const employees = [
    {
      _id: '6593914804a255abf16c3372',
      fullname: 'Shrilakshmi Shenoy',
      Phone: '7996730193',
      location: 'India',
      about: 'Software Developer',
      designation: 'TSE',
      date: '24-11-2000',
      is_delete: false,
      role: 'head',
      email: 'shrilakshmishenoy24@gmail.com',
      organisationID: '6592c65302082856df0e51e2',
      karma_points: 0,
      carbon_emission: 0,
      __v: 0,
      password: '$2b$10$fb2YQICB7SblA.XuI1r2gON8TRp/kug40rm2BNnKeWr0mvwB.2Jzq',
    },
    {
      _id: '6592ce9402082856df0e5af5',
      fullname: 'Ashtral Goveas',
      Phone: '9164992582',
      location: 'India',
      about: '.....',
      date: '24-01-2024',
      is_delete: false,
      role: 'head',
      email: 'ashtralgoveas@gmail.com',
      organisationID: '6592c65302082856df0e51e2',
      karma_points: 0,
      carbon_emission: 0,
      __v: 0,
      password: '$2b$10$4voeZHEHgiI16Z82vp2C0OEx8QC63u9VdTIPvBoflRvK/FmBCAFvK',
    },
    {
      _id: '6592ca8902082856df0e5527',
      fullname: 'Subayeel',
      Phone: '9740730152',
      location: 'India',
      about: 'Developer',
      date: '15-01-1971',
      is_delete: false,
      role: 'employee',
      email: 'abdula.s@pacewisdom.com',
      organisationID: '6592c65302082856df0e51e2',
      karma_points: 0,
      carbon_emission: 0,
      __v: 0,
      password: '$2b$10$upJnJFCuVOPiIvZz9VsC0.ewHeUsy99fBH8IoptL4jpnHk76gZsrG',
      profile: 'https://carbon-karma-be.pacewisdom.in/uploads/subayeel.jpeg',
    },
    {
      _id: '6592c65302082856df0e51e5',
      fullname: 'Abdullah Subayeel',
      Phone: '9740730152',
      location: 'India',
      about: '',
      is_delete: false,
      role: 'head',
      email: 'abdullahsubayeel2000@gmail.com',
      password: '$2b$12$PcTDp8OilL2FSq0cw53TsObm5x1pb8YarQ0u46ntz6v1Pn9EI.3im',
      organisationID: '6592c65302082856df0e51e2',
      karma_points: -400,
      carbon_emission: 2.79,
      __v: 0,
      resetToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZHVsbGFoc3ViYXllZWwyMDAwQGdtYWlsLmNvbSIsImlhdCI6MTcwNzk4MjI4MywiZXhwIjoxNzA4MDAzODgzfQ.6-Z6_Q_zNxr8LRl1gU7w2RWUvfWG4jsHK03RgIO3xgs',
      resetTokenExpiration: '2024-02-16T07:31:23.176Z',
    },
  ];

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

  return (
    <ScrollView>
      <View style={orgStyles.dashboardBodyContainer}>
        {/* Emission AMount */}
        <View style={orgStyles.wideContainer}>
          <View>
            <Text style={orgStyles.small}>Total Emission (this Month)</Text>
            <Text style={orgStyles.largeText}>120,000</Text>
          </View>
          <TouchableOpacity style={orgStyles.analyticsButton}>
            <Icon
              name="analytics-outline"
              color={COLORS.primaryColor}
              size={18}
            />
            <Text style={orgStyles.analyticsText}>Analytics</Text>
          </TouchableOpacity>
        </View>

        {/* Neutrality Card */}
        <View style={orgStyles.cardContainer}>
          <View style={orgStyles.neutralityCard}>
            <Icon
              name="checkmark-circle"
              color={COLORS.primaryColor}
              size={100}
            />
            <Text>Your Orgnaization is Carbon Neutral.</Text>
            <Text style={orgStyles.small}>Jul 2023 - Feb 2024</Text>
          </View>
          <View style={{gap: 8, flex: 1}}>
            <View style={orgStyles.offsetCard}>
              <Text style={orgStyles.small}>Offset</Text>
              <Text style={orgStyles.boldText}>$ 12.01</Text>
            </View>
            <View style={orgStyles.empOrgCard}>
              <Text style={orgStyles.small}>Emission</Text>
              <Text style={orgStyles.boldText}>120 kg</Text>
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
        {/* <EmployeeTile {...employees[0]} /> */}

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
