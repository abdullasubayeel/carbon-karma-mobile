import {StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

const authStyles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
  },
  heading: {
    fontWeight: '800',
    fontSize: 28,
    color: '#666',
  },
  tagline: {
    fontWeight: '700',
    fontSize: 20,
    color: '#666',
  },
  formContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    width: '100%',
    gap: 8,
  },
  illustration: {
    height: '30%',
    width: '100%',
    margin: 24,
  },
  primaryText: {
    color: COLORS.primaryColor,
    fontWeight: '400',
    fontSize: 12,
  },
  helperTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lightText: {
    color: '#666',
    fontWeight: '400',
    alignItems: 'center',
  },

  authContainers: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginVertical: 8,
  },
  signupContainers: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  googleTile: {
    backgroundColor: '#F8E2E2',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  microsoftTile: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
  },
  forgotContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundColor,
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 28,
  },

  //   Forgot Password
});

export {authStyles};
