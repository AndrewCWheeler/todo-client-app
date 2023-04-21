// ProjectItem.tsx
import {
  Pressable,
  useColorScheme,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useEffect, useState } from 'react';
import { Text, View } from './Themed';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useSearchParams, useRouter } from 'expo-router';
import * as Progress from 'react-native-progress';
import { DELETE_TASKLIST } from '../mutations';
import { useMutation } from '@apollo/client';
import { MY_PROJECTS } from '../queries';
import moment from 'moment';

interface ProjectItemProps {
  project: {
    id: string | null | undefined;
    title: string | null | undefined;
    createdAt: string;
    progress: number;
  };
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const scheme = useColorScheme();
  const params = useSearchParams();
  const router = useRouter();
  const { id = project.id } = params;
  const [createdDate, setCreatedDate] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [deleteTaskList, { data: deletedData, error, loading }] = useMutation(
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
    if (deletedData) {
      console.log('Successful Deletion!');
    }
  }, [deletedData]);

  useEffect(() => {
    let timestamp = project.createdAt;
    console.log(typeof project.progress);
    // *** Date Diff
    // const now = moment();
    // const days = now.diff(moment(Number(timestamp)), 'days');
    // const daysAgo = `${days}d`;
    // console.log(daysAgo);
    // *** Future Day (add x days)
    const futureDate = moment(Number(timestamp))
      .add(7, 'days')
      .format('MM-DD-YY');
    const date = moment(Number(timestamp)).format('MM-DD-YY');
    setCreatedDate(date);
    setDueDate(futureDate);
    // console.log(`Project: ${project.createdAt}`);
    // console.log(`Formatted Date: ${createdDate}`);
  }, []);

  const onPress = () => {
    router.push({ pathname: '/screens/todo-screen', params: { id } });
  };
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Pressable onPress={onPress} style={styles.row}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="clipboard-edit-outline"
                size={27}
                color={scheme === 'dark' ? 'white' : 'black'}
              />
            </View>
            <View style={styles.projectInfo}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{project.title}</Text>

                <Text style={styles.time}>{createdDate}</Text>
              </View>
              <View style={styles.row}>
                <Progress.Bar
                  progress={project.progress}
                  width={200}
                  color="#1DB954"
                />
                {/* <Text style={styles.time}>{dueDate}</Text> */}
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
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 6,
    borderBottomColor: '#3e3e3e',
    borderBottomWidth: 0.5,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 5,
  },
  projectInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  iconContainer: {
    width: 39,
    height: 39,
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
    fontSize: 9,
  },
});
