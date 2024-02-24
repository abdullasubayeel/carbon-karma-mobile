import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {orgStyles} from '../../../styles/organizationStyles';
import CustomTextField from '../../../components/CustomTextField';
import CustomButton from '../../../components/CustomButton';
import CustomSelect from '../../../components/CustomSelect';
import {countriesData} from '../../../constants/countriesData';
import CustomImagePicker from '../../../components/CustomImagePicker';
import {useUpdateProfileMutation} from '../../../api/endpoint/organizationEndpoint';
import {globalStyles} from '../../../styles/global';
import AuthContext from '../../../context/AuthProvider';

const dummy = require('../../../assets/images/transport.png');
const UpdateProfile = ({route}: any) => {
  const {profileData} = route.params;
  const {auth} = useContext(AuthContext);
  const [updateProfile, {isLoading: isUpdateLoading}] =
    useUpdateProfileMutation();
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(
    profileData.location,
  );
  const [fullName, setFullName] = useState(profileData.fullname);
  const [phone, setPhone] = useState(profileData.Phone);
  const [email, setEmail] = useState(profileData.email);
  const [about, setAbout] = useState(profileData.about);
  const [selectedImage, setSelectedImage] = useState<any>(profileData.profile);

  const formattedOptions = countriesData.map(option => ({
    label: option.name,
    value: option.name,
  }));

  //   const [keyboardStatus, setKeyboardStatus] = useState(false);
  //   const scrollRef = useRef(null);
  //   useEffect(() => {
  //     const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
  //       setKeyboardStatus(true);
  //     });
  //     const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
  //       setKeyboardStatus(false);
  //     });

  //     return () => {
  //       showSubscription.remove();
  //       hideSubscription.remove();
  //     };
  //   }, []);

  const handelUpdate = async () => {
    try {
      const response = await updateProfile({
        fullname: fullName,
        location: selectedLocation,
        phone: phone,
        email: email,
        about: about,
        empId: auth._id,
        logo: selectedImage.uri,
      }).unwrap();
    } catch (error) {
      setError('Something went wrong');
      console.log('Error:', error);
    }
  };

  return (
    <View style={orgStyles.profileBody}>
      <View style={orgStyles.updateImageContainer}>
        <Image
          source={selectedImage ? {uri: selectedImage} : dummy}
          style={orgStyles.updateImageAvatar}></Image>
        <View style={{justifyContent: 'center'}}>
          <Text style={orgStyles.nameText}>Update your profile picture</Text>
          <Text style={orgStyles.small}>Accepted Formats: PNG and JPG</Text>
          <CustomImagePicker
            label="Organization Logo"
            setSelectedAssets={(assets: any) => setSelectedImage(assets[0])}
          />
        </View>
      </View>

      <CustomTextField
        placeholder="John Doe"
        label="Full Name *"
        value={fullName}
        onChangeText={(text: string) => setFullName(text)}
      />
      <CustomTextField
        placeholder="abc@gmail.com"
        label="Email *"
        keyboardType="mail"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
      />
      <CustomTextField
        placeholder="12345 12345"
        label="Phone Number *"
        keyboardType="numeric"
        value={phone}
        onChangeText={(text: string) => setPhone(text)}
      />
      <CustomSelect
        setSelectedValue={setSelectedLocation}
        selectedValue={selectedLocation}
        placeholder={'Choose your country'}
        options={formattedOptions}
        label={'Country'}
      />

      <CustomTextField
        placeholder="I am a developer at ..."
        label="About"
        value={about}
        onChangeText={(text: string) => setAbout(text)}
      />
      {error && (
        <View style={globalStyles.errorContainer}>
          <Text style={globalStyles.errorText}>{error}</Text>
        </View>
      )}
      <CustomButton
        onPress={handelUpdate}
        title="Update"
        isLoading={isUpdateLoading}></CustomButton>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({});
