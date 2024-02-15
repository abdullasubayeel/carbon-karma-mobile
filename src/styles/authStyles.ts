import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

const authStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
  },
  tagline: {
    fontWeight: '700',
    fontSize: 20,
    color: '#666',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: '100%',
    gap: 16,
  },
  illustration: {
    height: '30%',
    width: '100%',
    margin: 24,
    justifySelf: 'center',
  },
  helperTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export {authStyles};
