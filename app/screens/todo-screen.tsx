import { useState, useEffect, createRef } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { View, TextInput } from '../../components/Themed';
import { useHeaderHeight } from '@react-navigation/elements';
import ToDoItem from '../../components/ToDoItem';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useSearchParams } from 'expo-router';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { useAppSelector } from '../hooks';
import { selectAllProjects } from '../features/project/projectSlice';

interface TodoType {
  id: string | null | undefined;
  content: string | null;
  isCompleted: boolean;
}

const GET_PROJECT = gql`
  query getTaskList($id: ID!) {
    getTaskList(id: $id) {
      id
      title
      createdAt
      todos {
        id
        content
        isCompleted
      }
    }
  }
`;

const CREATE_TODO = gql`
  mutation createToDo($content: String, $taskListId: ID!) {
    createToDo(content: $content, taskListId: $taskListId) {
      id
      content
      createdAt
      taskList {
        id
        progress
        todos {
          id
          content
          isCompleted
        }
      }
    }
  }
`;

export default function ToDoScreen() {
  const params = useSearchParams();
  const { id } = params;
  const headerHeight = useHeaderHeight();
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<TodoType[]>([]);
  const { projects } = useAppSelector(selectAllProjects);

  const defaultTodo = {
    id: null,
    content: '',
    isCompleted: false,
  };

  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });

  const [createToDo, { data: createToDoData, error: createToDoError }] =
    useMutation(CREATE_TODO, { refetchQueries: [{ query: GET_PROJECT }] });

  useEffect(() => {
    let project = projects.filter((p) => p.id === id);
    console.log(project);
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching project', error.message);
    }
  }, [error]);

  useEffect(() => {
    console.log(data);
    console.log(`todos length: ${data?.getTaskList.todos.length}`);
    if (data) {
      setTitle(data.getTaskList.title);
      if (data.getTaskList.todos.length === 0) {
        let newTodos = [...todos];
        newTodos.push(defaultTodo);
        console.log(newTodos);
        console.log(newTodos.length);
        setTodos(newTodos);
      }
      setTodos(data.getTaskList.todos);
    }
  }, [data]);

  const createNewItem = () => {
    createToDo({
      variables: {
        content: '',
        taskListId: id,
      },
    });

    // const newTodos = [...todos];
    // newTodos.splice(atIndex, 0, {
    //   id: id,
    //   content: '',
    //   isCompleted: false,
    // });
    // setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={setTitle}
        placeholder={'Title'}
      />
      <KeyboardAwareFlatList
        extraScrollHeight={headerHeight}
        data={todos}
        renderItem={({ item }) => (
          <ToDoItem todo={item} onSubmit={() => createNewItem()} />
        )}
        style={{ width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 12,
  },
  title: {
    width: '100%',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
