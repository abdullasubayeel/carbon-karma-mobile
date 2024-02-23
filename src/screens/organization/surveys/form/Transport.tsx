import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {surveyStyles} from '../../../../styles/surveyStyles';
import CustomTextField from '../../../../components/CustomTextField';
import {globalStyles} from '../../../../styles/global';
import {useGetOrgVehiclesQuery} from '../../../../api/endpoint/organizationEndpoint';
import AuthContext from '../../../../context/AuthProvider';
import CustomActivityIndicator from '../../../../components/CustomActivityIndicator';
import {OrganizationVehiclesType} from '../../../../enums/organization';
import {ScrollView} from 'react-native-gesture-handler';
import CustomButton from '../../../../components/CustomButton';
import {useSubmitOrgTransportSurveyMutation} from '../../../../api/endpoint/orgSurveyEndpoint';
import moment from 'moment';

const Transport = ({monthName, year, setActiveStep}: any) => {
  // organisation/orgVehicle/org/6592c65302082856df0e51e2
  const {auth} = useContext(AuthContext);

  const {data: orgVehicles, isLoading: isOrgVehicleLoading} =
    useGetOrgVehiclesQuery(auth.ID);

  const [submitTransportSurvey, {isLoading: isSurveySubmitLoading}] =
    useSubmitOrgTransportSurveyMutation();

  const monthNumber = moment().month(monthName).month() + 1;

  const [vehicleData, setVehicleData] = useState<any>([]);

  const updateVehicleData = (
    index: number,
    distance: number,
    no_of_people: number,
    vehicle: string,
  ) => {
    const newData: any = [...vehicleData];
    newData[index] = {...newData[index], distance, no_of_people, vehicle};
    setVehicleData(newData);
  };

  const handleSubmit = async () => {
    try {
      const response = await submitTransportSurvey({
        month: monthNumber,
        organisationId: auth.ID,
        transport: {
          trip: vehicleData,
          year: year,
          month: monthNumber,
        },
        year: year,
      }).unwrap();

      console.log('Response:', response);
      if (response.carbonEmissions) {
        ToastAndroid.show(
          'Transport Survey Submitted successfully',
          ToastAndroid.SHORT,
        );
        setActiveStep(1);
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.data.error ===
        'You have already taken transportation survey for this month'
      ) {
        setActiveStep(1);
      }
      if (error.data.error) {
        return ToastAndroid.show(error.data.error, ToastAndroid.SHORT);
      }
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  if (isOrgVehicleLoading) {
    return (
      <CustomActivityIndicator
        message="Getting your vehicles..."
        size="large"
      />
    );
  }
  return (
    <ScrollView style={surveyStyles.surveyFormContainer}>
      <View style={globalStyles.row}>
        <Text style={globalStyles.title}>Date:</Text>
        <Text style={globalStyles.title}>
          {monthName} {year}
        </Text>
      </View>
      {orgVehicles?.response.map(
        (obj: OrganizationVehiclesType, index: number) => (
          <View style={globalStyles.card}>
            <Text style={globalStyles.heading}>{obj.vehicleName}</Text>
            <CustomTextField
              label="Distance covered this month*"
              placeholder="2000"
              keyboardType="numeric"
              onChangeText={(distance: any) =>
                updateVehicleData(
                  index,
                  distance,
                  vehicleData[index]?.noOfPeople || 0,
                  obj._id,
                )
              }
            />
            <CustomTextField
              label="Average Number of seats/day*"
              placeholder="10"
              keyboardType="numeric"
              onChangeText={(noOfPeople: any) =>
                updateVehicleData(
                  index,
                  vehicleData[index]?.distance || 0,
                  noOfPeople,
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

export default Transport;

const styles = StyleSheet.create({});
