import { Pressable } from 'react-native';
import { View, Text, TextInput } from '../../components/Themed';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '../../context/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();
  const onSubmit = () => {
    // submit
    signIn();
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
    </View>
  );
};

export default SignIn;
