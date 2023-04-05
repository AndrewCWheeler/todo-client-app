import { Pressable } from 'react-native';
import React from 'react';
import styles from './styles';
import { Text, View } from '../../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useSearchParams, useRouter } from 'expo-router';

interface ProjectItemProps {
  project: {
    id: string;
    title: string;
    createdAt: string;
  };
}

interface Nav {
  path: string[];
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const navigation = useNavigation();
  const params = useSearchParams();
  const router = useRouter();
  const { id = project.id } = params;

  const onPress = () => {
    router.push({ pathname: '/todo-screen', params: { id } });
  };
  return (
    <Pressable onPress={onPress} style={styles.root}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="file-outline" size={24} color="grey" />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.title}>{project.title}</Text>
        <Text style={styles.time}>{project.createdAt}</Text>
      </View>
    </Pressable>
  );
};

export default ProjectItem;
