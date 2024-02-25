import {ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {surveyStyles} from '../../../../styles/surveyStyles';
import CustomTextField from '../../../../components/CustomTextField';
import {useSubmitEmpHousholdSurveyMutation} from '../../../../api/endpoint/empSurveyEndpoint';
import CustomButton from '../../../../components/CustomButton';
import moment from 'moment';
import AuthContext from '../../../../context/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

type RootStackParamList = {
  EmpDashboard: {} | undefined;
};
const Household = ({monthName, year, setActiveStep}: any) => {
  const {auth} = useContext(AuthContext);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [submitHouseholdSurvey, {isLoading: isSurveySubmitLoading}] =
    useSubmitEmpHousholdSurveyMutation();
  const monthNumber = moment().month(monthName).month() + 1;

  const [cookingOil, setCookingOil] = useState<number>(0);
  const [lpg, setLpg] = useState<number>(0);
  const [coal, setCoal] = useState<number>(0);
  const [wood, setWood] = useState<number>(0);
  const [houseMembers, setHouseMembers] = useState<number>(0);

  const handleSubmit = async () => {
    try {
      const response = await submitHouseholdSurvey({
        heatingOil: cookingOil,
        lpg: lpg,
        coal: coal,
        wood: wood,
        noOfPeople: houseMembers,
        year: year,
        month: monthNumber,
        trips: [],
        employeeId: auth._id,
      }).unwrap();
      console.log('Response:', response);
      if (response.carbonEmissions) {
        ToastAndroid.show(
          'Household Survey Submitted successfully',
          ToastAndroid.SHORT,
        );
        navigation.navigate('EmpDashboard');
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.data.error ===
        'You have already taken Household survey for this month'
      ) {
        navigation.navigate('EmpDashboard');
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
        value={cookingOil}
        onChangeText={(text: number) => setCookingOil(text)}
        label="Cooking Oil"
        placeholder="in Ltr."
        keyboardType={'numeric'}
      />
      <CustomTextField
        value={lpg}
        onChangeText={(text: number) => setLpg(text)}
        label="LPG"
        placeholder="in Kgs."
        keyboardType={'numeric'}
      />
      <CustomTextField
        value={coal}
        onChangeText={(text: number) => setCoal(text)}
        label="Coal"
        placeholder="in Kgs."
        keyboardType={'numeric'}
      />
      <CustomTextField
        value={wood}
        onChangeText={(text: number) => setWood(text)}
        label="Cooking Oil"
        placeholder="in Ltr."
        keyboardType={'numeric'}
      />
      <CustomTextField
        value={houseMembers}
        onChangeText={(text: number) => setHouseMembers(text)}
        label="Total people in House"
        placeholder="Total members"
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

export default Household;

const styles = StyleSheet.create({});
