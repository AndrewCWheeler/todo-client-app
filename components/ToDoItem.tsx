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
  };
  onSubmit: () => void;
}

const ToDoItem = ({ todo, onSubmit }: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState('');
  const scheme = useColorScheme();
  const input = useRef<any>();
  const { id } = todo;

  const [updateItem] = useMutation(UPDATE_TODO);

  const callUpdateItem = () => {
    updateItem({
      variables: {
        id: todo.id,
        content,
        isCompleted: isChecked,
      },
    });
  };

  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  const [deleteItem, { data: deletedData, error: deletedError, loading }] =
    useMutation(DELETE_TODO, {
      variables: { id: id },
      refetchQueries: [
        { query: GET_PROJECT, variables: { id: id } },
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

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.row}>
          <Checkbox
            isChecked={isChecked}
            onPress={() => {
              setIsChecked(!isChecked);
            }}
          />
          <TextInput
            ref={input}
            value={content}
            onChangeText={setContent}
            style={styles.textInput}
            multiline
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
            {loading ? (
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
    paddingVertical: 6,
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
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
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
