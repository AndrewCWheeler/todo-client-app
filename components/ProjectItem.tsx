import {
  Pressable,
  useColorScheme,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useEffect } from 'react';
import { Text, View } from './Themed';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useSearchParams, useRouter } from 'expo-router';
import * as Progress from 'react-native-progress';
import { DELETE_TASKLIST } from '../mutations';
import { useMutation } from '@apollo/client';
import { MY_PROJECTS } from '../queries';

interface ProjectItemProps {
  project: {
    id: string | null | undefined;
    title: string | null | undefined;
    createdAt: string | null | undefined;
  };
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const scheme = useColorScheme();
  const params = useSearchParams();
  const router = useRouter();
  const { id = project.id } = params;

  const [deleteTaskList, { data, error, loading }] = useMutation(
    DELETE_TASKLIST,
    {
      variables: { id: id },
      refetchQueries: [{ query: MY_PROJECTS }, 'myTaskLists'],
    }
  );
  const callDeleteTaskList = () => {
    deleteTaskList();
  };
  useEffect(() => {
    if (error) {
      Alert.alert(`Error attempting to delete project: ${error.message}`);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      console.log('Successful Deletion!');
    }
  }, [data]);

  const onPress = () => {
    router.push({ pathname: '/screens/todo-screen', params: { id } });
  };
  return (
    <View style={styles.root}>
      <View style={styles.itemContainer}>
        <Pressable onPress={onPress} style={styles.row}>
          <View style={styles.contentRow}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                size={36}
                color={scheme === 'dark' ? 'white' : 'black'}
              />
            </View>
            <View style={styles.projectInfo}>
              <View style={styles.row}>
                <Text style={styles.title}>{project.title}</Text>

                {/* <Text style={styles.time}>{project.createdAt}</Text> */}
              </View>
              <View style={styles.progress}>
                <Progress.Bar progress={0.3} width={200} color="#1DB954" />
              </View>
            </View>
          </View>
        </Pressable>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Pressable onPress={() => callDeleteTaskList()} style={styles.dots}>
            {/* <AntDesign name="delete" size={24} color="red" /> */}
            <MaterialCommunityIcons
              name="dots-horizontal"
              size={24}
              color={scheme === 'dark' ? 'white' : 'black'}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default ProjectItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 69,
    marginTop: 3,
    borderBottomColor: '#3e3e3e',
    borderBottomWidth: 0.5,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 9,
  },
  progress: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    margin: 3,
  },
  root: {
    flexDirection: 'row',
    width: '100%',
    root: 10,
    margin: 3,
  },
  iconContainer: {
    width: 51,
    height: 51,
    backgroundColor: '#404040',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  dots: {
    display: 'flex',
    alignSelf: 'center',
  },
  time: {
    color: 'darkgrey',
  },
});
