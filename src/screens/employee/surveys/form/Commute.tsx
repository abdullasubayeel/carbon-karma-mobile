import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useContext, useState} from 'react';
import moment from 'moment';
import AuthContext from '../../../../context/AuthProvider';
import {
  useGetEmpVehiclesQuery,
  useSubmitEmpTransportSurveyMutation,
} from '../../../../api/endpoint/empSurveyEndpoint';
import CustomActivityIndicator from '../../../../components/CustomActivityIndicator';
import {surveyStyles} from '../../../../styles/surveyStyles';
import {globalStyles} from '../../../../styles/global';
import {EmpVehicleType} from '../../../../enums/employee';
import CustomTextField from '../../../../components/CustomTextField';
import CustomButton from '../../../../components/CustomButton';
import CustomSelect from '../../../../components/CustomSelect';

const Commute = ({monthName, year, setActiveStep}: any) => {
  const {auth} = useContext(AuthContext);

  const {data: empVehicles, isLoading: isEmpVehicleLoading} =
    useGetEmpVehiclesQuery(undefined);

  const [submitTransportSurvey, {isLoading: isSurveySubmitLoading}] =
    useSubmitEmpTransportSurveyMutation();

  const monthNumber = moment().month(monthName).month() + 1;

  const [error, setError] = useState<any>('');
  const [distance, setDistance] = useState<any>('');
  const [way, setWay] = useState<any>('');
  const [selectedVehicle, setSelectedVehicle] = useState<any>('');
  const [travellers, setTravellers] = useState<any>('');

  const vPlaceholder = {
    label: 'Select Vehicle',
    value: null,
  };
  const WPlaceholder = {
    label: 'Select your Way',
    value: null,
  };
  const formattedVehicles = empVehicles?.map(obj => ({
    label: obj.model,
    value: obj._id,
  }));

  const handleSubmit = async () => {
    try {
      const response = await submitTransportSurvey({
        drivingConditionFactor: way,
        distance: distance,
        dates: ['09/12/2024'],
        vehicleId: selectedVehicle,
        noOfPeople: parseInt(travellers),
        employeeId: auth._id,
      }).unwrap();
      console.log('Response:', response);
      if (response.emission) {
        ToastAndroid.show(
          'Commutation Survey Submitted successfully',
          ToastAndroid.SHORT,
        );
        setActiveStep(1);
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.data.error ===
        'You have already taken Commutationd survey for this month'
      ) {
        setActiveStep(1);
      }
      if (error.data.error) {
        return ToastAndroid.show(error.data.error, ToastAndroid.SHORT);
      }
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  if (isEmpVehicleLoading) {
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
      <CustomTextField
        value={distance}
        onChangeText={(text: string) => setDistance(text)}
        label="Distance"
        placeholder="One way distance in km"
        keyboardType={'numeric'}
      />
      <CustomSelect
        selectedValue={way}
        setSelectedValue={setWay}
        placeholder={WPlaceholder}
        label="You way"
        options={[
          {
            label: 'Highway',
            value: '0',
          },
          {
            label: 'City',
            value: '1',
          },
        ]}
      />
      <CustomSelect
        selectedValue={selectedVehicle}
        setSelectedValue={setSelectedVehicle}
        placeholder={vPlaceholder}
        label="You way"
        options={formattedVehicles}
      />
      <CustomTextField
        value={travellers}
        onChangeText={(text: string) => setTravellers(text)}
        label="No. of Travellers"
        placeholder="Travellers"
        keyboardType={'numeric'}
      />
      <CustomButton
        title="Submit"
        onPress={handleSubmit}
        isLoading={isSurveySubmitLoading}
      />
    </ScrollView>
  );
};

export default Commute;

const styles = StyleSheet.create({});
