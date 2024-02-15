import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {authStyles} from '../../styles/authStyles';
import CustomTextField from '../../components/CustomTextField';
import CustomButton from '../../components/CustomButton';

const logo = require('../../assets/images/ck-logo.png');
const illustration = require('../../assets/images/ck-illustration2.png');
const ForgotPassword = ({navigation}: any) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {};
  return (
    <View style={authStyles.forgotContainer}>
      <Image
        style={authStyles.illustration}
        source={illustration}
        resizeMode="contain"
        alt="Illustration"></Image>

      <View style={{alignItems: 'center', gap: 8}}>
        <Text style={authStyles.heading}>Forgot Password</Text>
        <Text>Please enter your email to search for your account.</Text>
      </View>

      <CustomTextField
        label="Email"
        placeholder="abc@gmail.com"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <CustomButton title="Submit" onPress={handleSubmit} />

      <Pressable onPress={() => navigation.navigate('Login')}>
        <Text style={authStyles.primaryText}>Go Back to Sign in</Text>
      </Pressable>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
