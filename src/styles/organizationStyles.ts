import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const orgStyles = StyleSheet.create({
  //Headers
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: COLORS.lightGreen,
  },
  profileContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerImage: {
    height: 50,
    width: 50,
    borderRadius: 40,
    resizeMode: 'contain',
  },
  greenText: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.primaryColor,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.black,
  },

  iconContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  iconTile: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 20,
  },

  //ORG Dashboard Body

  dashboardBodyContainer: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 12,
  },

  wideContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 12,
  },
  small: {
    fontSize: 12,
    fontWeight: '400',
  },
  largeText: {
    fontSize: 32,
    fontWeight: '500',
    color: COLORS.black,
  },
  analyticsButton: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    borderRadius: 24,
    alignItems: 'center',
    gap: 9,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
  },
  analyticsText: {
    color: COLORS.primaryColor,
    fontSize: 12,
  },
  cardContainer: {
    gap: 12,
    flexDirection: 'row',
  },
  neutralityCard: {
    flex: 2,
    backgroundColor: '#C8DDCC',
    padding: 24,
    borderRadius: 12,
    elevation: 1,
    alignItems: 'center',
    gap: 4,
  },
  nonNeutralityCard: {
    flex: 2,
    backgroundColor: COLORS.ligthRed,
    padding: 24,
    borderRadius: 12,
    elevation: 1,
    alignItems: 'center',
    gap: 4,
  },
  empOrgCard: {
    flex: 1,
    backgroundColor: COLORS.grey,
    padding: 18,
    borderRadius: 12,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: '700',
    fontSize: 18,
    color: COLORS.black,
  },
  offsetCard: {
    flex: 1,
    backgroundColor: COLORS.lightBlue,
    padding: 18,
    borderRadius: 12,
    elevation: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailedGraph: {
    backgroundColor: COLORS.grey,
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
  },

  //Notifications
  notificationContainer: {
    backgroundColor: COLORS.grey,
    marginBottom: 12,
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    borderColor: COLORS.grey,
    borderWidth: 1,
  },

  //Profile
  profileBody: {
    padding: 12,
  },

  avatar: {
    height: 100,
    marginVertical: 12,
  },

  profileText: {
    gap: 4,
  },
  cardWrapper: {
    backgroundColor: COLORS.white,
    position: 'relative',
    alignItems: 'flex-start',
  },

  orgImage: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    height: 100,
    width: 100,
  },

  title: {
    fontSize: 24,
    fontWeight: '600',
    color: COLORS.primaryColor,
  },
  imageIcon: {
    height: 36,
    width: 36,
    margin: 'auto',
    resizeMode: 'contain',
  },

  //Update Profile
  updateImageContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  updateImageAvatar: {
    height: 120,
    width: 120,
    borderRadius: 12,
    resizeMode: 'contain',
  },
});
