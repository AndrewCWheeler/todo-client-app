import { useState, useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Alert, useColorScheme } from 'react-native';
import { View, Text, TextInput } from '../../components/Themed';
import { useRouter } from 'expo-router';
import { useMutation, gql } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Counter } from '../features/counter/Counter';
import { useAppDispatch } from '../hooks';
import { login } from './authSlice';

const SIGN_IN_MUTATION = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('Invalid credentials. Try again');
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      // save token
      AsyncStorage.setItem('token', data.signIn.token)
        .then(() => {
          dispatch(
            login({
              user: {
                id: data.signIn.id,
                name: data.signIn.name,
                email: data.signIn.email,
              },
              token: data.signIn.token,
            })
          );
        })
        .catch((err) => console.log(err));
    }
  }, [data]);

  const onSubmit = () => {
    // submit
    signIn({ variables: { email, password } });
  };
  const router = useRouter();
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={setEmail}
        style={{
          // color: 'white',
          fontSize: 18,
          width: '100%',
          marginVertical: 25,
        }}
      />

      <TextInput
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{
          // color: 'white',
          fontSize: 18,
          width: '100%',
          marginVertical: 25,
        }}
      />
      <Pressable
        onPress={onSubmit}
        style={{
          backgroundColor: '#e33062',
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          Sign In
        </Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/(auth)/sign-up')}
        style={{
          // backgroundColor: '#e33062',
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Text style={{ color: '#e33062', fontSize: 18, fontWeight: 'bold' }}>
          Don't have an account? Sign Up
        </Text>
      </Pressable>
      {/* <Counter /> */}
    </View>
  );
};

export default SignIn;
