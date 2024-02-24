import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {
  useAddSupervisorMutation,
  useGetEmployeesQuery,
  useRemoveSupervisorMutation,
} from '../../api/endpoint/organizationEndpoint';
import AuthContext from '../../context/AuthProvider';
import {orgStyles} from '../../styles/organizationStyles';
import {globalStyles} from '../../styles/global';
import {COLORS} from '../../constants/colors';
import CustomActivityIndicator from '../../components/CustomActivityIndicator';
import {EmployeeType} from '../../enums/organization';
const voidImg = require('../../assets/images/void.png');
const arrow = require('../../assets/images/arrow.png');
const Settings = () => {
  const {auth} = useContext(AuthContext);
  const [removeSuperVisor, {isLoading: isRemoveLoading}] =
    useRemoveSupervisorMutation();
  const [promoteEmployee, {isLoading: isPromoteLoading}] =
    useAddSupervisorMutation();
  const {data: employees, isLoading: isEmployeeLoading} = useGetEmployeesQuery({
    orgId: auth.ID,
    employee: false,
    supervisor: false,
  });

  var curEmployees = JSON.parse(JSON.stringify(employees?.results.employees));

  const handlePromote = async (id: string) => {
    try {
      const response = await promoteEmployee(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (id: string) => {
    try {
      const response = await removeSuperVisor(id).unwrap();
    } catch (err) {
      console.log(err);
    }
  };

  if (isEmployeeLoading) {
    return (
      <CustomActivityIndicator message="Getting the supervisors" size="large" />
    );
  }

  function compare(a: any, b: any) {
    if (a.role < b.role) {
      return 1;
    }
    if (a.role > b.role) {
      return -1;
    }
    return 0;
  }
  return (
    <ScrollView style={orgStyles.exploreContainer}>
      <Text style={globalStyles.heading}>Supervisors</Text>
      <Text>You can Promote/Demote your employees from given list.</Text>
      {curEmployees?.sort(compare).map((obj: EmployeeType) => {
        return (
          <View style={[globalStyles.card, {flexDirection: 'row'}]}>
            {obj.profile ? (
              <Image
                source={{uri: obj.profile}}
                style={orgStyles.offsetImage}
                resizeMode="contain"
              />
            ) : (
              <Image
                source={voidImg}
                style={orgStyles.offsetImage}
                resizeMode="contain"
              />
            )}

            <View style={{flex: 1}}>
              <View style={[globalStyles.row, {alignItems: 'flex-start'}]}>
                <Text style={[globalStyles.title, {flex: 1}]}>
                  {obj.fullname} ({obj.role})
                </Text>
                <Image
                  source={arrow}
                  style={{height: 20, width: 25}}
                  resizeMode="contain"
                />
              </View>
              <Text style={globalStyles.lightText}>{obj.email}</Text>
              <View style={[globalStyles.row, {marginTop: 8}]}>
                {obj.role !== 'head' && (
                  <TouchableOpacity
                    onPress={() => handlePromote(obj._id)}
                    style={orgStyles.promoteBtn}>
                    <Text style={orgStyles.promoteText}>Promote</Text>
                    {isRemoveLoading && <ActivityIndicator />}
                  </TouchableOpacity>
                )}

                {obj.role === 'head' && (
                  <TouchableOpacity
                    onPress={() => handleRemove(obj._id)}
                    style={orgStyles.removeBtn}>
                    <Text style={orgStyles.removeText}>Remove</Text>
                    {isRemoveLoading && <ActivityIndicator />}
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
