import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextField from '../../../components/CustomTextField';
import {FormAction, FormState} from '../../../enums/auth';
import {ORG_SIGNUP_ACTIONS} from '../../../constants';

interface CredentialsProps {
  formData: FormState;
  dispatch: React.Dispatch<FormAction>;
}
const Credentials = ({formData, dispatch}: CredentialsProps) => {
  const [cPass, setCPass] = useState('');

  return (
    <View style={{flex: 1}}>
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
    </View>
  );
};

export default Credentials;

const styles = StyleSheet.create({});
