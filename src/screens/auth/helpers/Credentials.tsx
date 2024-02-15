import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextField from '../../../components/CustomTextField';
import {FormAction, FormState} from '../../../enums/auth';
import {ORG_SIGNUP_ACTIONS} from '../../../constants';
import {registerStyles} from '../../../styles/signupStyles';
import CustomButton from '../../../components/CustomButton';

interface CredentialsProps {
  formData: FormState;
  dispatch: React.Dispatch<FormAction>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Credentials = ({formData, dispatch, setActiveStep}: CredentialsProps) => {
  const [cPass, setCPass] = useState('');

  const handleNext = async () => {};
  return (
    <View style={registerStyles.container}>
      <CustomTextField
        label="Your Email"
        placeholder="abc@gmail.com"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.email, payload: text})
        }
        value={formData.email}></CustomTextField>
      <CustomTextField
        label="Password"
        placeholder="*********"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.password, payload: text})
        }
        value={formData.password}
        textContentType="password"
        secureTextEntry={true}></CustomTextField>
      <CustomTextField
        label="Company Address"
        placeholder="*********"
        onChangeText={(text: string) => setCPass(text)}
        value={cPass}
        textContentType="password"
        secureTextEntry={true}></CustomTextField>

      <CustomButton title="Submit" onPress={handleNext} />
    </View>
  );
};

export default Credentials;

const styles = StyleSheet.create({});
