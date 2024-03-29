import React, {useContext, useEffect, useState} from 'react';
import {
  Button,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useLoginMutation} from '../../api/auth/authApiSlice';
import {authStyles} from '../../styles/authStyles';
import CustomTextField from '../../components/CustomTextField';
import CustomButton from '../../components/CustomButton';
import CustomCheckbox from '../../components/CustomCheckbox';

import Icon from 'react-native-vector-icons/AntDesign';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import PasswordField from '../../components/PasswordField';
import AuthContext from '../../context/AuthProvider';
const illustration = require('../../assets/images/ck-illustration.png');
import SplashScreen from 'react-native-splash-screen';
import {storeAsyncData} from '../../utilities/asyncStorage';
import {useDispatch} from 'react-redux';
import {loginAction} from '../../api/auth/authSlice';

function Login({navigation}: any) {
  const dispatch = useDispatch();
  const {setAuth} = useContext(AuthContext);
  const [login, {isLoading: isLoginLoading}] = useLoginMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // return navigation.navigate('OrgDashboard');
    console.log('anything');
    await login({
      email,
      password,
      remember_me: true,
    })
      .unwrap()
      .then((res: any) => {
        console.log('loginnnn resss', res);
        if (res?.user.role === 'head') {
          setAuth(res.user);
          storeAsyncData('user', JSON.stringify(res.user));
        } else if (res?.user.role === 'employee') {
          const userData = {
            ID: res?.user.all.organisationID,
            _id: res.user.all._id,
            email: res?.user.email,
            refresh_token: res?.user.refresh_token,
            role: res?.user.role,
            token: res?.user.token,
          };
          setAuth(userData);
          storeAsyncData('user', JSON.stringify(userData));
        }
        dispatch(
          loginAction({
            email: res.user.email,
            accessToken: res.user.token,
          }),
        );

        if (res?.user?.role === 'employee') {
          navigation.navigate('EmpDashboard');
        } else if (res?.user?.role === 'head') {
          navigation.navigate('OrgDashboard');
        }
      })
      .catch((err: any) => {
        console.log('Error:', err);
        setError(err?.data?.message || err?.data?.error);
      });
  };

  useEffect(() => {
    setError('');
  }, [email, password]);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={authStyles.loginContainer}>
      <Image
        style={authStyles.illustration}
        source={illustration}
        resizeMode="contain"
        alt="Illustration"></Image>
      <Text style={authStyles.tagline}>"Protect Earth: Our Only Home!"</Text>
      <Text>#saveEarth</Text>
      <View style={authStyles.formContainer}>
        <CustomTextField
          label="Email"
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}></CustomTextField>
        <PasswordField
          label="Password"
          placeholder="Password"
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          textContentType="password"></PasswordField>

        <View style={authStyles.helperTextContainer}>
          <CustomCheckbox
            setRememberMe={setRememberMe}
            rememberMe={rememberMe}
            title="Remember Me"
          />
          <Pressable onPress={() => navigation.navigate('Forgot')}>
            <Text style={authStyles.primaryText}>Forgot Password?</Text>
          </Pressable>
        </View>
        {error && <Text>{error}</Text>}

        <CustomButton
          isLoading={isLoginLoading}
          title="Login"
          onPress={handleSubmit}></CustomButton>
      </View>
      <Text>or</Text>

      <View style={authStyles.authContainers}>
        <TouchableOpacity style={authStyles.googleTile}>
          <Icon name="google" size={18} color={'#C93F10'} />
        </TouchableOpacity>
        <TouchableOpacity style={authStyles.microsoftTile}>
          <FAIcon name="microsoft" size={18} color={'#335DA7'} />
        </TouchableOpacity>
      </View>
      <View style={authStyles.signupContainers}>
        <Text style={authStyles.lightText}>Don't have an account?{'  '}</Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={authStyles.primaryText}>Sign up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default Login;
