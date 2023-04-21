import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  useColorScheme,
  TextInput,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { Text, View } from './Themed';
import Checkbox from './Checkbox';
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO, DELETE_TODO } from '../mutations';
import { GET_PROJECT } from '../queries';

interface ToDoItemProps {
  todo: {
    id: string | null | undefined;
    content: string;
    isCompleted: boolean;
    taskList: {
      id: string;
    };
  };
  onSubmit: () => void;
}

const ToDoItem = ({ todo, onSubmit }: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(todo?.isCompleted);
  const [content, setContent] = useState(todo?.content);
  const [load, setLoad] = useState(0);
  const scheme = useColorScheme();
  const input = useRef<any>();
  const { id } = todo;
  const { taskList } = todo;
  // const [createdDate, setCreatedDate] = useState<string>('');

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  const [
    deleteItem,
    { data: deletedData, error: deletedError, loading: deletedLoading },
  ] = useMutation(DELETE_TODO, {
    variables: { id: id },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: taskList.id } },
      'getTaskList',
    ],
  });

  useEffect(() => {
    if (deletedError) {
      Alert.alert(`Error trying to delete item: ${deletedError.message}`);
    }
  }, [deletedError]);

  useEffect(() => {
    // get focus on input
    if (input.current) {
      input?.current?.focus();
    }
  }, [input]);

  const onKeyPress = ({ nativeEvent }: any) => {
    if (nativeEvent.key === 'Backspace' && content === '') {
      // Delete item
      console.warn('Delete item');
    }
  };
  const [
    updateCheckedItem,
    {
      data: updateCheckData,
      error: updateCheckError,
      loading: updateCheckLoading,
    },
  ] = useMutation(UPDATE_TODO, {
    variables: {
      id: id,
      content,
      isCompleted: isChecked,
    },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: taskList.id } },
      'getTaskList',
    ],
  });
  const [
    updateItem,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_TODO, {
    variables: {
      id: id,
      content,
      isCompleted: isChecked,
    },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: taskList.id } },
      'getTaskList',
    ],
  });
  useEffect(() => {
    const updateChecked = async () => {
      try {
        await updateCheckedItem();
      } catch (error) {
        Alert.alert(`Error trying to update item`);
      }
    };

    updateChecked();
  }, [load]);

  const callUpdateItem = () => {
    updateItem();
  };

  const handleCheckedUpdate = () => {
    setIsChecked(!isChecked);
    load === 0 ? setLoad(1) : setLoad(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Checkbox isChecked={isChecked} onPress={handleCheckedUpdate} />
          <TextInput
            ref={input}
            value={content}
            onChangeText={setContent}
            style={[styles.textInput, isChecked && styles.textInputCompleted]}
            onSubmitEditing={onSubmit}
            onEndEditing={callUpdateItem}
            blurOnSubmit
            onKeyPress={(e) => onKeyPress(e)}
          />
        </View>
        <View style={styles.smallRow}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View
              style={{ paddingLeft: 33, display: 'flex', flexDirection: 'row' }}
            >
              <Ionicons
                style={styles.calendarIcon}
                name="calendar-outline"
                size={12}
                // color={scheme === 'dark' ? 'lightgreen' : 'black'}
              />
              <Text style={styles.text}>3:00 PM</Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons
                style={{ marginLeft: 12 }}
                name="pricetag-outline"
                size={12}
                color={scheme === 'dark' ? 'orange' : 'black'}
              />

              <Text style={{ fontSize: 12, marginLeft: 3 }}>Category</Text>
            </View>
          </View>
          <Pressable onPress={() => deleteItem()}>
            {deletedLoading ? (
              <ActivityIndicator />
            ) : (
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={24}
                color={scheme === 'dark' ? 'white' : 'black'}
              />

              // <AntDesign name="delete" size={15} color="red" />
            )}
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    border: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    height: 60,
    borderBottomColor: '#3e3e3e',
    borderBottomWidth: 0.5,
    paddingTop: 3,
    // paddingBottom: 6,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#eee',
    marginLeft: 9,
    textAlignVertical: 'top',
    width: '100%',
  },
  textInputCompleted: {
    textDecorationLine: 'line-through',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    width: '85%',
  },
  smallRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 12,
    marginLeft: 3,
    color: '#4ffa7b',
  },
  calendarIcon: {
    color: '#4ffa7b',
  },
});
