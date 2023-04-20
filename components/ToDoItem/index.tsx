import { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
  TextInput,
} from 'react-native';
import { Text, View } from '../Themed';
import Checkbox from '../Checkbox';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, gql } from '@apollo/client';

const UPDATE_TODO = gql`
  mutation updateToDo($id: ID!, $content: String, $isCompleted: Boolean) {
    updateToDo(id: $id, content: $content, isCompleted: $isCompleted) {
      id
      createdAt
      content
      taskList {
        id
        title
        todos {
          id
          content
          isCompleted
        }
      }
    }
  }
`;

interface ToDoItemProps {
  todo: {
    id: string;
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

  useEffect(() => {
    // get focus on input
    if (input.current) {
      input?.current?.focus();
    }
  }, [input]);

  const onKeyPress = ({ nativeEvent }: any) => {
    console.log(nativeEvent);
    if (nativeEvent.key === 'Backspace' && content === '') {
      // Delete item
      console.warn('Delete item');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 0}
      style={{ flex: 1 }}
    >
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
                name="pricetag-outline"
                size={12}
                color={scheme === 'dark' ? 'orange' : 'black'}
              />

              <Text style={{ fontSize: 12, marginLeft: 3 }}>Category</Text>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    // alignItems: 'flex-start',
    height: 60,
    borderBottomColor: '#3e3e3e',
    borderBottomWidth: 0.5,
    padding: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#eee',
    marginLeft: 9,
    textAlignVertical: 'top',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 3,
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
