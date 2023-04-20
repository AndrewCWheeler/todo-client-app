import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  project: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3,
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    root: 10,
    margin: 3,
  },
  iconContainer: {
    width: 36,
    height: 36,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  time: {
    color: 'darkgrey',
  },
});

export default styles;
