import { useEffect, useState } from 'react';
import { View } from '../../components/Themed';
import { ActivityIndicator, Alert, StyleSheet, FlatList } from 'react-native';
import ProjectItem from '../../components/ProjectItem';
import { useQuery } from '@apollo/client';
import { MY_PROJECTS } from '../../queries';

export default function ProjectScreen() {
  const [projects, setProjects] = useState([]);
  const { data, error, loading } = useQuery(MY_PROJECTS);

  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching project', error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setProjects(data.myTaskLists);
    }
    console.log(data);
  }, [data]);

  return (
    <View style={styles.container}>
      {loading ? (
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
