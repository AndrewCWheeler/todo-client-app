import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const URI = API_URL;

const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('token');
  console.log(`token from authLink: ${token}`);

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  uri: URI,
  cache: new InMemoryCache(),
});
