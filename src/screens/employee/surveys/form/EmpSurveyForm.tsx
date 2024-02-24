import React, {useReducer, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';

import {COLORS} from '../../../../constants/colors';

import Electricity from './Electricity';

import {globalStyles} from '../../../../styles/global';
import Commute from './Commute';
import Household from './Household';

const logo = require('../../../../assets/images/ck-logo.png');

function EmpSurveyForm({navigation, route}: any) {
  const {monthName, year, stepper} = route.params;
  const [activeStep, setActiveStep] = useState(stepper ? stepper : 0);

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
        <View style={globalStyles.row}>
          <Text style={{fontSize: 16, color: '#888', fontWeight: '600'}}>
            Organization Survey : {monthName}/{year}
          </Text>
        </View>
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
          label="Commute"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}>
          <View style={{flex: 1}}>
            <Commute
              monthName={monthName}
              year={year}
              setActiveStep={setActiveStep}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Electricity"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}
          previousBtnStyle={styles.previousBtnStyle}
          previousBtnTextStyle={styles.previousBtnTextStyle}
          removeBtnRow={true}>
          <View style={{flex: 1}}>
            <Electricity
              monthName={monthName}
              year={year}
              setActiveStep={setActiveStep}
            />
          </View>
        </ProgressStep>

        <ProgressStep
          label="Household"
          nextBtnStyle={styles.nextBtnStyle}
          nextBtnTextStyle={styles.nextBtnTextStyle}
          previousBtnStyle={styles.previousBtnStyle}
          previousBtnTextStyle={styles.previousBtnTextStyle}
          removeBtnRow={true}>
          <View>
            <Household
              monthName={monthName}
              year={year}
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

export default EmpSurveyForm;
