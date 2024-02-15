import React, {useReducer} from 'react';
import {View, StyleSheet} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import Personal from './helpers/Personal';
import Organisation from './helpers/Organisation';
import Credentials from './helpers/Credentials';
import {COLORS} from '../../constants/colors';
import {ORG_SIGNUP_ACTIONS} from '../../constants';
import {FormState} from '../../enums/auth';
import {useCreateOrganisationMutation} from '../../api/endpoint/organizationEndpoint';

function OrgSignup({navigation}: any) {
  const [orgSignUp, {isLoading: isOrgLoading}] =
    useCreateOrganisationMutation();
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
      console.log(formData.logo);
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

      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <ProgressSteps
        activeStepIconBorderColor={COLORS.primaryColor}
        activeLabelColor={COLORS.primaryColor}
        activeStepNumColor={COLORS.primaryColor}
        completedProgressBarColor={COLORS.primaryColor}
        completedStepIconColor={COLORS.primaryColor}>
        <ProgressStep
          label="Personal"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}>
          <View style={{flex: 1}}>
            <Personal formData={formData} dispatch={dispatch} />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Organization"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}
          previousBtnStyle={styles.previousBtnStyle}
          previousBtnTextStyle={styles.previousBtnTextStyle}>
          <View>
            <Organisation formData={formData} dispatch={dispatch} />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Credentials"
          previousBtnStyle={styles.previousBtnStyle}
          previousBtnTextStyle={styles.previousBtnTextStyle}
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}
          onSubmit={handleSubmit}>
          <View>
            <Credentials formData={formData} dispatch={dispatch} />
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
