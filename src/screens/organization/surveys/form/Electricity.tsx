import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../../../../context/AuthProvider';
import {
  useGetCountriesQuery,
  useLazyGetStatesQuery,
} from '../../../../api/endpoint/organizationEndpoint';
import CustomActivityIndicator from '../../../../components/CustomActivityIndicator';
import {surveyStyles} from '../../../../styles/surveyStyles';
import CustomSelect from '../../../../components/CustomSelect';
import CustomTextField from '../../../../components/CustomTextField';
import CustomButton from '../../../../components/CustomButton';
import {useSubmitOrgElectricitySurveyMutation} from '../../../../api/endpoint/orgSurveyEndpoint';
import moment from 'moment';

const Electricity = ({monthName, year, setActiveStep}: any) => {
  const {auth} = useContext(AuthContext);

  const {data: countries, isLoading: isCountriesLoading} = useGetCountriesQuery(
    {},
  );

  const [getStates, {isLoading: isGetStatesLoading}] = useLazyGetStatesQuery();

  const [submitElectricSurvey, {isLoading: isSurveySubmitLoading}] =
    useSubmitOrgElectricitySurveyMutation();

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState();
  const [units, setUnits] = useState();
  const [states, setStates] = useState<any>([]);

  const monthNumber = moment().month(monthName).month() + 1;

  const formattedOptions = countries?.response.map((option: any) => ({
    label: option.country,
    value: option.country,
  }));
  const placeholder = {
    label: 'Select an option...',
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
        country: selectedCountry,
        month: monthNumber,
        organisationId: auth.ID,
        state: selectedState,
        units: units,
        year: year,
      }).unwrap();

      console.log('Response:', response);
      if (response.carbonEmissions) {
        ToastAndroid.show(
          'Electricity Survey Submitted successfully',
          ToastAndroid.SHORT,
        );
        setActiveStep(3);
      }
    } catch (error: any) {
      console.log('Error:', error);
      if (
        error.data.message ===
        'You have already filled the electricity survey for this month'
      ) {
        setActiveStep(3);
      }
      if (error.data.error) {
        return ToastAndroid.show(error.data.error, ToastAndroid.SHORT);
      }
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };

  if (isCountriesLoading) {
    return (
      <CustomActivityIndicator
        message="Getting your electricity rates..."
        size="large"
      />
    );
  }

  return (
    <ScrollView style={surveyStyles.surveyFormContainer}>
      <CustomTextField
        onChangeText={(text: any) => setUnits(text)}
        value={units}
        label="Units"
        keyboardType="numeric"
        placeholder="in kwh"
      />
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
        onPress={handleSubmit}
        title="Submit"
        isLoading={isSurveySubmitLoading}
      />
    </ScrollView>
  );
};

export default Electricity;

const styles = StyleSheet.create({});
