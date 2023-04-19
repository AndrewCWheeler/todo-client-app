import AsyncStorage from '@react-native-async-storage/async-storage';

export const verifyToken = async () => {
  // implement a call to graphQL to authenticate the token returns a user
  // otherwise it is expired.
  // **************

  // add API call here

  // **************
  let token = await AsyncStorage.getItem('token');
  return token;
};
