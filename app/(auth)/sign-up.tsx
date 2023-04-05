import { StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { View, TextInput, Text } from '../../components/Themed';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useMutation, gql } from '@apollo/client';

const SIGN_UP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!, $name: String!) {
    signUp(input: { email: $email, password: $password, name: $name }) {
      token
      user {
        id
        name
      }
    }
  }
`;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // mutation[0]: A function to trigger the mutation
  // mutation[1]: result object from server
  // { data, error, loading }
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP_MUTATION);

  const onSubmit = () => {
    signUp({ variables: { name, email, password } })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const router = useRouter();
  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={setName}
        style={{
          // color: 'white',
          fontSize: 18,
          width: '100%',
          marginVertical: 25,
        }}
      />
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
        {loading && <ActivityIndicator />}
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
          Sign Up
        </Text>
      </Pressable>
      <Pressable
        disabled={loading}
        onPress={() => router.push('/(auth)/sign-in')}
        style={{
          // backgroundColor: '#e33062',
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 30,
        }}
      >
        <Text
          style={{
            color: '#e33062',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          Already have an account? Sign In
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
