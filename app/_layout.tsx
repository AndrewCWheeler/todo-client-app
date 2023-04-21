import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useColorScheme, Pressable, Alert } from 'react-native';
// import { Provider } from '../context/auth';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { useAppSelector } from '../app/hooks';
import { selectUser, selectToken } from '../app/(auth)/authSlice';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <Provider store={store}>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </Provider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  // const user = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      router.replace('/(tabs)');
    } else router.replace('/(auth)/sign-in');
  }, [token]);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(auth)/sign-in"
            options={{
              title: 'Sign In',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen name="(auth)/sign-up" options={{ title: 'Sign Up' }} />
          <Stack.Screen
            name="(tabs)"
            options={{
              title: 'Projects',
              headerShown: false,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="screens/todo-screen"
            options={{
              title: 'ToDo',
              headerShown: true,
              // headerRight: () => (
              //   <Pressable onPress={() => Alert.alert('Create New ToDo')}>
              //     {({ pressed }) => (
              //       <AntDesign
              //         name="plus"
              //         size={24}
              //         color={Colors[colorScheme ?? 'light'].text}
              //         style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              //       />
              //     )}
              //   </Pressable>
              // ),
            }}
          />

          <Stack.Screen
            name="modal"
            options={{ headerShown: false, presentation: 'modal' }}
          />
        </Stack>
      </ThemeProvider>
    </ApolloProvider>
  );
}
