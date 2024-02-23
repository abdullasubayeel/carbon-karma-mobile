import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useContext, useState} from 'react';
import AuthContext from '../../../../context/AuthProvider';
import {useGetOrgMachinesQuery} from '../../../../api/endpoint/organizationEndpoint';
import CustomActivityIndicator from '../../../../components/CustomActivityIndicator';
import {useSubmitOrgMachineSurveyMutation} from '../../../../api/endpoint/orgSurveyEndpoint';
import moment from 'moment';
import {surveyStyles} from '../../../../styles/surveyStyles';
import {globalStyles} from '../../../../styles/global';
import {OrganizationMachinesType} from '../../../../enums/organization';
import CustomTextField from '../../../../components/CustomTextField';
import CustomButton from '../../../../components/CustomButton';

const Machine = ({monthName, year, setActiveStep}: any) => {
  const {auth} = useContext(AuthContext);

  const {data: orgMachines, isLoading: isOrgMachinesLoading} =
    useGetOrgMachinesQuery(auth.ID);
  const [submitTransportSurvey, {isLoading: isSurveySubmitLoading}] =
    useSubmitOrgMachineSurveyMutation();

  const monthNumber = moment().month(monthName).month() + 1;

  const [machinesData, setMachinesData] = useState<any>([]);

  if (isOrgMachinesLoading) {
    return (
      <CustomActivityIndicator
        message="Getting your machinaries..."
        size="large"
      />
    );
  }
  const updateMachineData = (
    index: number,
    fuelEfficiency: number,
    hoursinMonth: number,
    machine_id: string,
  ) => {
    const newData: any = [...machinesData];
    newData[index] = {
      ...newData[index],
      fuelEfficiency,
      hoursinMonth,
      machine_id,
    };
    setMachinesData(newData);
  };

  const handleSubmit = async () => {
    try {
      const response = await submitTransportSurvey({
        year: year,
        month: monthNumber,
        organisationId: auth.ID,
        machineries: {
          machines: machinesData,
          year: year,
          month: monthNumber,
        },
      }).unwrap();

      console.log('Response:', response);
      if (response.carbonEmissions) {
        ToastAndroid.show(
          'Machine Survey Submitted successfully',
          ToastAndroid.SHORT,
        );
        setActiveStep(2);
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.data.error ===
        'You have already taken Machinery survey for this month'
      ) {
        setActiveStep(2);
      }
      if (error.data.error) {
        return ToastAndroid.show(error.data.error, ToastAndroid.SHORT);
      }
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  return (
    <ScrollView style={surveyStyles.surveyFormContainer}>
      <View style={globalStyles.row}>
        <Text style={globalStyles.title}>Date:</Text>
        <Text style={globalStyles.title}>
          {monthName} {year}
        </Text>
      </View>
      {orgMachines?.response.map(
        (obj: OrganizationMachinesType, index: number) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.heading}>{obj.modelName}</Text>
            <CustomTextField
              label="Current Fuel efficiency*"
              placeholder="in litres per hour"
              keyboardType="numeric"
              onChangeText={(fuelEfficiency: any) =>
                updateMachineData(
                  index,
                  fuelEfficiency,
                  machinesData[index]?.hoursinMonth || 0,
                  obj._id,
                )
              }
            />
            <CustomTextField
              label="Hours used this month*"
              placeholder="in hours"
              keyboardType="numeric"
              onChangeText={(hours: any) =>
                updateMachineData(
                  index,
                  machinesData[index]?.fuelEfficiency || 0,
                  hours,
                  obj._id,
                )
              }
            />
          </View>
        ),
      )}
      <CustomButton
        title="Submit"
        onPress={handleSubmit}
        isLoading={isSurveySubmitLoading}
      />
    </ScrollView>
  );
};

export default Machine;

const styles = StyleSheet.create({});
