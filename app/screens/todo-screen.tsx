import { useState, useEffect, createRef } from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { View, TextInput } from '../../components/Themed';
import { useHeaderHeight } from '@react-navigation/elements';
import ToDoItem from '../../components/ToDoItem';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useSearchParams } from 'expo-router';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { CREATE_TODO } from '../../mutations';
import { GET_PROJECT } from '../../queries';

type FlatListRefType = any;

interface TodoType {
  id: string | null | undefined;
  content: string | null;
  isCompleted: boolean;
}

export default function ToDoScreen() {
  const params = useSearchParams();
  const { id } = params;
  const headerHeight = useHeaderHeight();
  const flatListRef: FlatListRefType = createRef();
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState<TodoType[]>([]);

  const { data, error, loading } = useQuery(GET_PROJECT, {
    variables: { id: id },
  });

  const [createToDo, { data: createToDoData, error: createToDoError }] =
    useMutation(CREATE_TODO, { refetchQueries: [{ query: GET_PROJECT }] });

  useEffect(() => {
    if (data) {
      setTitle(data.getTaskList.title);
      setTodos(data.getTaskList.todos);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      Alert.alert('Error fetching project', error.message);
    }
  }, [error]);

  const createNewItem = () => {
    createToDo({
      variables: {
        content: '',
        taskListId: id,
      },
    });
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
        ref={flatListRef}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
        // onLayout={() => flatListRef.current.scrollToEnd({ animated: true })}
        extraScrollHeight={headerHeight + 24}
        data={todos}
        renderItem={({ item }) => (
          <ToDoItem todo={item} onSubmit={() => createNewItem()} />
        )}
        style={{ width: '100%', marginBottom: 60 }}
        keyExtractor={(item: any) => item.id}
      />

      <Pressable style={styles.button} onPress={() => createNewItem()}>
        {({ pressed }) => (
          <AntDesign
            name="pluscircle"
            size={60}
            color="#1DB954"
            style={{ opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={styles.bottomFade}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  title: {
    width: '100%',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'white',
    zIndex: 2,
  },
  bottomFade: {
    position: 'absolute',
    width: '100%',
    height: 60,
    bottom: 0,
  },
});
