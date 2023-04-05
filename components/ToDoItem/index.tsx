import { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Checkbox from '../Checkbox';

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

  const input = useRef<any>();

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
          blurOnSubmit
          onKeyPress={() => onKeyPress}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    padding: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#eee',
    marginLeft: 12,
  },
});
