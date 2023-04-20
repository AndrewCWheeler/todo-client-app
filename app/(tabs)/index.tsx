import { useEffect, useState } from 'react';
import { View } from '../../components/Themed';
import { ActivityIndicator, Alert, StyleSheet, FlatList } from 'react-native';
import ProjectItem from '../../components/ProjectItem';
import { useQuery, gql } from '@apollo/client';
import {
  selectAllProjects,
  setProjects,
} from '../features/project/projectSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

const MY_PROJECTS = gql`
  query myTaskLists {
    myTaskLists {
      id
      title
      createdAt
    }
  }
`;

export default function ProjectScreen() {
  const { projects, status } = useAppSelector(selectAllProjects);
  const dispatch = useAppDispatch();
  // const [currProjects, setCurrProjects] = useState([]);

  const { data, error, loading } = useQuery(MY_PROJECTS);

  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching project', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      dispatch(setProjects(data.myTaskLists));
    }
    console.log(data);
  }, [data]);

  return (
    <View style={styles.container}>
      {status === 'loading' ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={projects}
          renderItem={({ item }) => <ProjectItem project={item} />}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
