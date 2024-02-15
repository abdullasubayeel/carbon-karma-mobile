import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomTextField from '../../../components/CustomTextField';
import CustomSelect from '../../../components/CustomSelect';
import {sectorOptions} from '../../../constants/sectorOptions';
import CustomImagePicker from '../../../components/CustomImagePicker';
import {ORG_SIGNUP_ACTIONS} from '../../../constants';
import {FormAction, FormState} from '../../../enums/auth';

interface OrganisationProps {
  formData: FormState;
  dispatch: React.Dispatch<FormAction>;
}
const Organisation = ({formData, dispatch}: OrganisationProps) => {
  const placeholder = {
    label: 'Select an option...',
    value: '',
  };

  return (
    <View style={{flex: 1}}>
      <CustomTextField
        label="Organisation Name"
        placeholder="ABC Enterprises"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.organisationName, payload: text})
        }
        value={formData.organisationName}></CustomTextField>
      <CustomTextField
        label="Number Of Employees"
        placeholder="No of Employees"
        keyboardType="numeric"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.employeeCount, payload: text})
        }
        value={formData.employeeCount}></CustomTextField>

      <CustomTextField
        label="Company Address"
        placeholder="Address"
        onChangeText={(text: string) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.address, payload: text})
        }
        value={formData.address}></CustomTextField>
      <CustomSelect
        label="Sector"
        setSelectedValue={(text: any) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.sector, payload: text})
        }
        selectedValue={formData.sector}
        placeholder={placeholder}
        options={sectorOptions}
      />
      <CustomImagePicker
        label="Organization Logo"
        setSelectedAssets={(assets: any) =>
          dispatch({type: ORG_SIGNUP_ACTIONS.logo, payload: assets[0]})
        }
      />
    </View>
  );
};

export default Organisation;

const styles = StyleSheet.create({});
