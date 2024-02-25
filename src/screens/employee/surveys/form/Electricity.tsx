import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CustomActivityIndicator from '../../../../components/CustomActivityIndicator';
import AuthContext from '../../../../context/AuthProvider';
import {
  useGetCountriesQuery,
  useLazyGetStatesQuery,
} from '../../../../api/endpoint/organizationEndpoint';
import {useSubmitEmpElectricitySurveyMutation} from '../../../../api/endpoint/empSurveyEndpoint';
import moment from 'moment';
import CustomSelect from '../../../../components/CustomSelect';
import {surveyStyles} from '../../../../styles/surveyStyles';
import CustomTextField from '../../../../components/CustomTextField';
import CustomButton from '../../../../components/CustomButton';

const Electricity = ({monthName, year, setActiveStep}: any) => {
  const {auth} = useContext(AuthContext);

  const {data: countries, isLoading: isCountriesLoading} = useGetCountriesQuery(
    {},
  );

  const [getStates, {isLoading: isGetStatesLoading}] = useLazyGetStatesQuery();

  const [submitElectricSurvey, {isLoading: isSurveySubmitLoading}] =
    useSubmitEmpElectricitySurveyMutation();

  const monthNumber = moment().month(monthName).month() + 1;

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedResidence, setSelectedResidence] = useState('');
  const [units, setUnits] = useState<number>(0);
  const [monthlyBill, setMonthlyBill] = useState<number>(0);
  const [houseMembers, setHouseMembers] = useState<number>(0);
  const [states, setStates] = useState<any>([]);

  const formattedOptions = countries?.response.map((option: any) => ({
    label: option.country,
    value: option.country,
  }));
  const placeholder = {
    label: 'Select a country...',
    value: null,
  };

  const handleStates = async (id: string) => {
    const res = await getStates(id).unwrap();
    const formattedStates = res?.response?.map((option: any) => ({
      label: option.state,
      value: option.state_code,
    }));
    setStates(formattedStates);
  };

  useEffect(() => {
    if (selectedCountry && countries) {
      const selectedCountryId = countries?.response?.find(
        (obj: any) => obj.country === selectedCountry,
      )?._id;

      handleStates(selectedCountryId);
    }
  }, [selectedCountry]);

  const handleSubmit = async () => {
    try {
      const response = await submitElectricSurvey({
        residence: selectedResidence,
        country: selectedCountry,
        state: selectedState,
        year: year,
        month: monthNumber,
        billAmount: monthlyBill,
        noOfPeople: houseMembers,
        employeeId: auth._id,
        units: units,
      }).unwrap();
      console.log('Response:', response);
      if (response.carbonEmissions) {
        ToastAndroid.show(
          'Electricity Survey Submitted successfully',
          ToastAndroid.SHORT,
        );
        setActiveStep(2);
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.data.error ===
        'You have already taken Electricity survey for this month'
      ) {
        setActiveStep(2);
      }
      if (error.data.error) {
        return ToastAndroid.show(error.data.error, ToastAndroid.SHORT);
      }
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  const residencePlaceholder = {
    label: 'Select Residence',
    value: null,
  };
  const residenceOption = [
    {
      label: 'House',
      value: 'house',
    },
    {
      label: 'Hostel',
      value: 'hostel',
    },
  ];

  if (isCountriesLoading) {
    return (
      <CustomActivityIndicator
        message="Getting your Survey info..."
        size="large"
      />
    );
  }
  return (
    <ScrollView style={surveyStyles.surveyFormContainer}>
      <CustomSelect
        setSelectedValue={setSelectedResidence}
        selectedValue={selectedResidence}
        placeholder={residencePlaceholder}
        options={residenceOption}
        label="Residence"
      />
      {selectedResidence === 'hostel' && (
        <CustomTextField
          value={monthlyBill}
          onChangeText={(text: number) => setMonthlyBill(text)}
          label="Monthly Bill"
          placeholder="in Rs."
          keyboardType={'numeric'}
        />
      )}
      {selectedResidence === 'house' && (
        <>
          <CustomTextField
            value={units}
            onChangeText={(text: number) => setUnits(text)}
            label="Units Consumed"
            placeholder="in Kwh"
            keyboardType={'numeric'}
          />
          <CustomTextField
            value={houseMembers}
            onChangeText={(text: number) => setHouseMembers(text)}
            label="Total people in House"
            placeholder="Enter total member in you House"
            keyboardType={'numeric'}
          />
        </>
      )}
      <CustomSelect
        setSelectedValue={setSelectedCountry}
        selectedValue={selectedCountry}
        placeholder={placeholder}
        options={formattedOptions}
        label="Country"
      />
      {states.length !== 0 && (
        <CustomSelect
          setSelectedValue={setSelectedState}
          selectedValue={selectedState}
          placeholder={placeholder}
          options={states}
          label="States"
        />
      )}
      <CustomButton
        title="Submit"
        onPress={handleSubmit}
        isLoading={isSurveySubmitLoading}
      />
    </ScrollView>
  );
};

export default Electricity;

const styles = StyleSheet.create({});
