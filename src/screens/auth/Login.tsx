import React, {useEffect, useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useLoginMutation} from '../../api/auth/authApiSlice';
import {authStyles} from '../../styles/authStyles';
import CustomTextField from '../../components/CustomTextField';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';

const illustration = require('../../assets/images/ck-illustration.png');

function Login({navigation}: any) {
  const [login, {isLoading}] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    await login({
      email,
      password,
      remember_me: true,
    })
      .unwrap()
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log('Error:', err);
        setError(err.data.message || err.data.error);
      });
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  return (
    <SafeAreaView style={authStyles.loginContainer}>
      <Image
        style={authStyles.illustration}
        source={illustration}
        resizeMode="contain"
        alt="Illustration"></Image>
      <Text style={authStyles.tagline}>"Protect Earth: Out Only Home!"</Text>
      <Text>#saveEarth</Text>
      <View style={authStyles.formContainer}>
        <CustomTextField
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}></CustomTextField>
        <CustomTextField
          placeholder="Password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          textContentType="password"></CustomTextField>

        <View style={authStyles.helperTextContainer}>
          <CustomCheckbox
            setRememberMe={setRememberMe}
            rememberMe={rememberMe}
            title="Remember Me"
          />
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text>New here? Register</Text>
          </Pressable>
        </View>
        {error && <Text>{error}</Text>}

        <CustomButton title="Login" onPress={handleSubmit}></CustomButton>
      </View>
    </SafeAreaView>
  );
}

export default Login;
