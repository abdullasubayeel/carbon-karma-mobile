import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useState} from 'react';
import {orgStyles} from '../../styles/organizationStyles';
import CustomTextField from '../../components/CustomTextField';
import CustomSelect from '../../components/CustomSelect';
import CustomButton from '../../components/CustomButton';
import {useSubmitSupportMutation} from '../../api/endpoint/organizationEndpoint';

const Support = () => {
  const [submitQuery, {isLoading: isSubmitLoading}] =
    useSubmitSupportMutation();
  const [email, setEmail] = useState('');
  const [companyName, setCompany] = useState('');
  const [topic, setTopic] = useState('');
  const [message, setMessage] = useState('');

  const placeholder = {
    label: 'Select topic concerned',
    value: null,
  };
  const topics = [
    {
      label: 'Offset',
      value: 'Offset',
    },
    {
      label: 'Employees',
      value: 'Employees',
    },
    {
      label: 'Questions',
      value: 'Questions',
    },
    {
      label: 'Organization',
      value: 'Organization',
    },
    {
      label: 'Karma Points',
      value: 'Karma Points',
    },
    {
      label: 'Voucher',
      value: 'Voucher',
    },
  ];

  const clearForm = () => {
    setEmail('');
    setCompany('');
    setTopic('');
    setMessage('');
  };

  const handleSubmit = async () => {
    try {
      const response = await submitQuery({
        email,
        companyName,
        topic,
        message,
      }).unwrap();

      if (response.message === 'Read Succesfully') {
        clearForm();
        ToastAndroid.show(
          'Your query Submitted successfully',
          ToastAndroid.SHORT,
        );
      }
    } catch (error: any) {
      console.log(error);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
  };
  return (
    <View style={orgStyles.exploreContainer}>
      <CustomTextField
        label="Email"
        placeholder="abc@gmail.com"
        onChangeText={(text: string) => setEmail(text)}
        value={email}
      />
      <CustomTextField
        label="Company Name"
        placeholder="XYZ Limited"
        onChangeText={(text: string) => setCompany(text)}
        value={companyName}
      />
      <CustomSelect
        label="Which topic best fit your needs? *"
        options={topics}
        placeholder={placeholder}
        setSelectedValue={setTopic}
        selectedValue={topic}
      />
      <CustomTextField
        label="How can we help?*"
        placeholder="We are facing..."
        onChangeText={(text: string) => setMessage(text)}
        value={message}
      />
      <CustomButton
        onPress={handleSubmit}
        title="Submit"
        isLoading={isSubmitLoading}
      />
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({});
