import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const surveyStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  centeredText: {
    textAlign: 'center',
  },
  circleBtn: {padding: 4, borderRadius: 12},
  surveyContainer: {
    // backgroundColor: COLORS.lightGreen,
  },
  surveyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 12,
    backgroundColor: COLORS.white,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  surveyContent: {padding: 20, gap: 16},
  surveyDetailsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
    borderColor: COLORS.borderColor,
    borderWidth: 1,

    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  boldText: {
    fontWeight: '500',
    color: COLORS.black,
  },
  smallText: {
    fontSize: 10,
    fontWeight: '400',
  },
  largeText: {
    fontSize: 22,
    fontWeight: '500',
    color: COLORS.black,
  },
  lightText: {
    fontWeight: '400',
    color: COLORS.black,
  },
  emissionTile: {
    padding: 22,
  },
});
