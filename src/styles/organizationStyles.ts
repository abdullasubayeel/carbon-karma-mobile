import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';

export const orgStyles = StyleSheet.create({
  //Headers
  headerContainer: {
    width: Dimensions.get('window').width * 0.94,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
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
    gap: 8,
  },
  iconTile: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 20,
  },

  //ORG Dashboard Body

  dashboardBodyContainer: {
    backgroundColor: COLORS.lightGreen,
    padding: 12,
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
    fontSize: 40,
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
  },
  empOrgCard: {
    flex: 1,
    backgroundColor: COLORS.ligthRed,
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
});
