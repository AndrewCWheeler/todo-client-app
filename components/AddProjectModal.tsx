import { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { TextInput, View, Text } from './Themed';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector } from '../app/hooks';
import { CREATE_TASKLIST } from '../mutations';
import { MY_PROJECTS } from '../queries';
import { selectUser } from '../app/(auth)/authSlice';
import { useMutation } from '@apollo/client';

export default function AddProjectModal({ path }: { path: string }) {
  const [project, setProject] = useState('');
  const user = useAppSelector(selectUser);
  // const { id } = user;
  const router = useRouter();

  const [addProject, { data, error, loading }] = useMutation(CREATE_TASKLIST, {
    variables: { title: project },
    refetchQueries: [{ query: MY_PROJECTS }, 'myTaskLists'],
  });

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  useEffect(() => {
    if (error) {
      Alert.alert(`Error adding Project: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    console.log('called useEffect');
    if (data) {
      setProject('');
      router.push('/(tabs)');
    }
  }, [data]);

  const callAddProject = () => {
    console.log(project);
    addProject();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.inputContainer}>
          <TextInput
            autoFocus
            style={styles.input}
            placeholder="Project Name"
            value={project}
            onChangeText={setProject}
            multiline
          />
          {loading ? (
            <View>
              <ActivityIndicator />
            </View>
          ) : (
            <Pressable onPress={() => callAddProject()}>
              {({ pressed }) => (
                <View style={[styles.button, pressed && styles.pressed]}>
                  <Text style={styles.buttonText}>Add</Text>
                </View>
              )}
            </Pressable>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
    paddingHorizontal: 24,
  },
  inputContainer: {
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    fontSize: 24,
    borderBottomColor: '#e33062',
    borderBottomWidth: 0.5,
    textAlign: 'center',
    paddingVertical: 6,
    marginBottom: 30,
  },

  button: {
    display: 'flex',
    flexDirection: 'row',
    width: 120,
    height: 45,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e33062',
    alignSelf: 'center',
    borderRadius: 6,
  },
  buttonText: {
    margin: 'auto',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.5,
  },
});
