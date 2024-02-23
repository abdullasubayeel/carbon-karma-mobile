import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {surveyStyles} from '../../../../styles/surveyStyles';
import CustomTextField from '../../../../components/CustomTextField';
import moment from 'moment';
import {useSubmitOrgUtilitySurveyMutation} from '../../../../api/endpoint/orgSurveyEndpoint';
import AuthContext from '../../../../context/AuthProvider';
import {globalStyles} from '../../../../styles/global';
import CustomSelect from '../../../../components/CustomSelect';
import CustomButton from '../../../../components/CustomButton';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

type RootStackParamList = {
  OrgDashboard: {} | undefined;
};
const Utilities = ({monthName, year, setActiveStep}: any) => {
  const {auth} = useContext(AuthContext);
  const [submitUtilitySurvey, {isLoading: isSurveySubmitLoading}] =
    useSubmitOrgUtilitySurveyMutation();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const monthNumber = moment().month(monthName).month() + 1;
  const [paperReams, setPaperReams] = useState('');
  const [tissueType, setTissueType] = useState('');
  const [tissueBundles, setTissueBundles] = useState('');
  const [paperCupType, setPaperCupType] = useState('');
  const [paperCupBundles, setPaperCupBundles] = useState('');
  const [plasticCupBundles, setPlasticCupBundles] = useState('');

  const placeholder = {
    label: 'Select an option...',
    value: null,
  };
  const handleSubmit = async () => {
    try {
      const response = await submitUtilitySurvey({
        year: year,
        month: monthNumber,
        utility: {
          paper: {
            paperReams: paperReams,
          },
          tissue: {
            tissueType: tissueType,
            tissueBundles: tissueBundles,
          },
          paperCup: {
            type: paperCupType,
            paperCupBundles: paperCupBundles,
          },
          plasticCup: {
            plasticCupBundles: plasticCupBundles,
          },
        },
        organisationId: auth.ID,
      }).unwrap();

      console.log('Response:', response);
      if (response.carbonEmissions) {
        ToastAndroid.show(
          'Utility Survey Submitted successfully',
          ToastAndroid.SHORT,
        );
        // setActiveStep(1);
        navigation.navigate('OrgDashboard');
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.data.error ===
        'You have already taken office utility survey for this month'
      ) {
        // setActiveStep(1);
        navigation.navigate('OrgDashboard');
      }
      if (error.data.error) {
        return ToastAndroid.show(error.data.error, ToastAndroid.SHORT);
      }
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  return (
    <ScrollView style={surveyStyles.surveyFormContainer}>
      <CustomTextField
        label="A4 sheets*"
        placeholder="in Reams"
        keyboardType="numeric"
        onChangeText={(text: any) => setPaperReams(text)}
        value={paperReams}
      />

      <CustomSelect
        setSelectedValue={setTissueType}
        selectedValue={tissueType}
        placeholder={placeholder}
        options={[
          {label: 'Recycled', value: 'Recycled'},
          {label: 'Virgin', value: 'Virgin'},
        ]}
        label="Tissue Type"
      />
      {tissueType && (
        <CustomTextField
          label="Tissue Bundle Used*"
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(text: any) => setTissueBundles(text)}
          value={tissueBundles}
        />
      )}

      <CustomSelect
        setSelectedValue={setPaperCupType}
        selectedValue={paperCupType}
        placeholder={placeholder}
        options={[
          {label: 'Recycled', value: 'Recycled'},
          {label: 'Plant PE Coated', value: 'Plant PE Coated'},
          {label: 'Normal', value: 'Normal'},
        ]}
        label="Paper Cup Type*"
      />
      {paperCupType && (
        <CustomTextField
          label="Paper Cup Bundle Used*"
          placeholder="0"
          keyboardType="numeric"
          onChangeText={(text: any) => setPaperCupBundles(text)}
          value={paperCupBundles}
        />
      )}
      <CustomTextField
        label="Plastic Cup Bundle Used*"
        placeholder="0"
        keyboardType="numeric"
        onChangeText={(text: any) => setPlasticCupBundles(text)}
        value={plasticCupBundles}
      />
      <CustomButton
        title={'Submit'}
        onPress={handleSubmit}
        isLoading={isSurveySubmitLoading}
      />
    </ScrollView>
  );
};

export default Utilities;

const styles = StyleSheet.create({});
