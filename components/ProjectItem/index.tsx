import { Pressable, useColorScheme } from 'react-native';
import React from 'react';
import styles from './styles';
import { Text, View } from '../../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSearchParams, useRouter } from 'expo-router';
import { ProjectType } from '../../types';

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

  const onPress = () => {
    router.push({ pathname: '/screens/todo-screen', params: { id } });
  };
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="clipboard-edit-outline"
          size={24}
          color={scheme === 'dark' ? 'white' : 'black'}
        />
      </View>
      <View style={styles.project}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.time}>{project.createdAt}</Text>
      </View>
    </Pressable>
  );
};

export default ProjectItem;
