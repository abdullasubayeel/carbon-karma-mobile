import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextField from '../../../components/CustomTextField';
import CustomSelect from '../../../components/CustomSelect';
import {ORG_SIGNUP_ACTIONS} from '../../../constants';
import {countriesData} from '../../../constants/countriesData';
import {FormAction, FormState} from '../../../enums/auth';

import {registerStyles} from '../../../styles/signupStyles';
import CustomButton from '../../../components/CustomButton';

interface PersonalProps {
  formData: FormState;
  dispatch: React.Dispatch<FormAction>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Personal = ({formData, dispatch, setActiveStep}: PersonalProps) => {
  const placeholder = {
    label: 'Select an option...',
    value: null,
  };

  const formattedOptions = countriesData.map(option => ({
    label: option.name,
    value: option.code,
  }));

  const handleNext = async () => {
    setActiveStep(2);
  };

  return (
    <View style={registerStyles.container}>
      <CustomTextField
        label="Name"
        placeholder="Name"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.fullname, payload: text})
        }
        value={formData.fullname}
        textContentType="password"></CustomTextField>
      <CustomTextField
        label="Phone"
        placeholder="Phone"
        keyboardType="numeric"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.phone, payload: text})
        }
        value={formData.phone}
        textContentType="password"></CustomTextField>
      <CustomTextField
        label="Designation"
        placeholder="Designation"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.designation, payload: text})
        }
        value={formData.designation}
        textContentType="password"></CustomTextField>
      <CustomSelect
        label="Location"
        setSelectedValue={(text: any) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.location, payload: text})
        }
        selectedValue={formData.location}
        placeholder={placeholder}
        options={formattedOptions}
      />

      <CustomButton title="Continue" onPress={handleNext} />
    </View>
  );
};

export default Personal;

const styles = StyleSheet.create({});
