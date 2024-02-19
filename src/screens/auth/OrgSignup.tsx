import React, {useReducer, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Personal from './helpers/Personal';
import Organisation from './helpers/Organisation';
import Credentials from './helpers/Credentials';
import {COLORS} from '../../constants/colors';
import {ORG_SIGNUP_ACTIONS} from '../../constants';
import {FormState} from '../../enums/auth';
import {useCreateOrganisationMutation} from '../../api/endpoint/organizationEndpoint';
import Verify from './helpers/Verify';

const logo = require('../../assets/images/ck-logo.png');

function OrgSignup({navigation}: any) {
  const [orgSignUp, {isLoading: isOrgLoading}] =
    useCreateOrganisationMutation();

  const [activeStep, setActiveStep] = useState(0);
  function reducer(state: any, action: any): FormState {
    switch (action.type) {
      case ORG_SIGNUP_ACTIONS.fullname:
        return {...state, fullname: action.payload};
      case ORG_SIGNUP_ACTIONS.location:
        return {...state, location: action.payload};
      case ORG_SIGNUP_ACTIONS.phone:
        return {...state, phone: action.payload};
      case ORG_SIGNUP_ACTIONS.email:
        return {...state, email: action.payload};
      case ORG_SIGNUP_ACTIONS.organisationName:
        return {...state, organisationName: action.payload};
      case ORG_SIGNUP_ACTIONS.designation:
        return {...state, designation: action.payload};
      case ORG_SIGNUP_ACTIONS.password:
        return {...state, password: action.payload};
      case ORG_SIGNUP_ACTIONS.employeeCount:
        return {...state, employeeCount: action.payload};
      case ORG_SIGNUP_ACTIONS.sector:
        return {...state, sector: action.payload};
      case ORG_SIGNUP_ACTIONS.address:
        return {...state, address: action.payload};
      case ORG_SIGNUP_ACTIONS.logo:
        return {...state, logo: action.payload};
      default:
        return state;
    }
  }

  const initialState = {
    fullname: '',
    location: '',
    phone: '',
    email: '',
    organisationName: '',
    designation: '',
    password: '',
    employeeCount: '',
    sector: '',
    address: '',
    logo: {},
  };

  const [formData, dispatch] = useReducer(reducer, initialState);

  const getBlob = async (fileUri: string) => {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  };
  const handleSubmit = async () => {
    try {
      const form = new FormData();
      const imageBody = await getBlob(formData?.logo?.uri ?? '');
      form.append('fullname', formData.fullname);
      form.append('location', formData.location);
      form.append('phone', formData.phone);
      form.append('email', formData.email);
      form.append('organisationName', formData.organisationName);
      form.append('designation', formData.designation);
      form.append('password', formData.password);
      form.append('employeeCount', formData.employeeCount);
      form.append('sector', formData.sector);
      form.append('address', formData.address);
      form.append('logo', {
        ...formData.logo,
        orginalname: formData.logo?.fileName,
      });

      const response = await orgSignUp(form).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          paddingTop: 12,
        }}>
        <Image
          source={logo}
          alt="Logo"
          resizeMode="contain"
          style={{width: 200, height: 34}}
        />
      </View>

      <ProgressSteps
        activeStepIconBorderColor={COLORS.primaryColor}
        activeLabelColor={COLORS.primaryColor}
        activeStepNumColor={COLORS.primaryColor}
        completedProgressBarColor={COLORS.primaryColor}
        completedStepIconColor={COLORS.primaryColor}
        activeStep={activeStep}
        setActiveStep={setActiveStep}>
        <ProgressStep
          removeBtnRow={true}
          label="Verify"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}>
          <View style={{flex: 1}}>
            <Verify
              formData={formData}
              dispatch={dispatch}
              setActiveStep={setActiveStep}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Personal"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}
          previousBtnStyle={styles.previousBtnStyle}
          previousBtnTextStyle={styles.previousBtnTextStyle}
          removeBtnRow={true}>
          <View style={{flex: 1}}>
            <Personal
              formData={formData}
              dispatch={dispatch}
              setActiveStep={setActiveStep}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Organization"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}
          previousBtnStyle={styles.previousBtnStyle}
          previousBtnTextStyle={styles.previousBtnTextStyle}
          removeBtnRow={true}>
          <View>
            <Organisation
              formData={formData}
              dispatch={dispatch}
              setActiveStep={setActiveStep}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Credentials"
          previousBtnStyle={styles.previousBtnStyle}
          previousBtnTextStyle={styles.previousBtnTextStyle}
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}
          removeBtnRow={true}
          onSubmit={handleSubmit}>
          <View>
            <Credentials
              formData={formData}
              dispatch={dispatch}
              setActiveStep={setActiveStep}
            />
          </View>
        </ProgressStep>
      </ProgressSteps>
    </View>
  );
}

const styles = StyleSheet.create({
  nextBtnStyle: {
    flex: 1,
    backgroundColor: COLORS.primaryColor,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  nextBtnTextStyle: {
    color: COLORS.white,
    fontSize: 16,
  },
  previousBtnStyle: {
    flex: 1,
    backgroundColor: COLORS.borderColor,
    borderRadius: 6,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  previousBtnTextStyle: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default OrgSignup;
