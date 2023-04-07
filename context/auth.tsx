import { useRouter, useSegments } from 'expo-router';
import React from 'react';

interface User {
  id?: string | null | undefined;
  token?: string | null | undefined;
}

interface AuthContextType {
  signIn: () => void;
  signOut: () => void;
  user: User;
}
const AuthContext = React.createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  user: { id: null, token: null },
});

// This hook can be used to access the user info.
export function useAuth() {
  return React.useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User) {
  const segments = useSegments();
  const router = useRouter();

  React.useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace('/sign-in');
    } else if (user && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace('/');
    }
  }, [user, segments]);
}

export function Provider(props: any) {
  const [user, setAuth] = React.useState({
    id: null,
    token: null,
  });

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setAuth(props),
        signOut: () => setAuth(user),
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
