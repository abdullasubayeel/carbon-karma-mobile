import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const globalStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  heading: {
    fontWeight: '600',
    color: COLORS.black,
    fontSize: 18,
  },
  title: {
    fontWeight: '600',
    color: COLORS.primaryColor,
    fontSize: 16,
  },

  card: {
    borderRadius: 12,
    // borderWidth: 1,
    borderColor: COLORS.borderColor,
    padding: 20,
    elevation: 1,
    backgroundColor: COLORS.white,
    marginVertical: 8,
    position: 'relative',
  },
  errorContainer: {
    borderRadius: 4,
    backgroundColor: COLORS.ligthRed,
    padding: 12,
  },
  errorText: {
    color: COLORS.red,
  },
  successContainer: {
    borderRadius: 4,
    backgroundColor: COLORS.lightGreen,
    padding: 12,
  },
  successText: {
    color: COLORS.primaryColor,
  },
});
