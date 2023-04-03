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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    root: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
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
