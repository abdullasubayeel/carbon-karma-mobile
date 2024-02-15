import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {FormAction, FormState} from '../../../enums/auth';
import {registerStyles} from '../../../styles/signupStyles';
import CustomTextField from '../../../components/CustomTextField';
import {authStyles} from '../../../styles/authStyles';
import CustomButton from '../../../components/CustomButton';
import Icon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome5';

interface VerifyProps {
  formData: FormState;
  dispatch: React.Dispatch<FormAction>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}
const Verify = ({formData, dispatch, setActiveStep}: VerifyProps) => {
  const [email, setEmail] = useState('');

  const handleNext = async () => {
    setActiveStep(1);
  };
  return (
    <View style={registerStyles.container}>
      <Text style={registerStyles.title}>Sign up with</Text>

      <CustomTextField
        label="Email"
        placeholder="abc@gmail.com"
        onChangeText={(text: string) => setEmail(text)}
        value
      />
      <Text style={registerStyles.text}>
        By Clicking on Continue, I agree to{' '}
        <Text style={authStyles.primaryText}>Terms</Text> and{' '}
        <Text style={authStyles.primaryText}>Conditions</Text>.
      </Text>

      <CustomButton title="Continue" onPress={handleNext} />

      <View style={authStyles.signupContainers}>
        <Text style={registerStyles.text}>Already have an account? </Text>
        <Pressable>
          <Text style={authStyles.primaryText}>Sign in</Text>
        </Pressable>
      </View>
      <View style={authStyles.authContainers}>
        <TouchableOpacity style={authStyles.googleTile}>
          <Icon name="google" size={18} color={'#C93F10'} />
        </TouchableOpacity>
        <TouchableOpacity style={authStyles.microsoftTile}>
          <FAIcon name="microsoft" size={18} color={'#335DA7'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verify;

const styles = StyleSheet.create({});
