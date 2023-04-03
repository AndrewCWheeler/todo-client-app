import { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Checkbox from '../Checkbox';

interface ToDoItemProps {
  todo: {
    id: string;
    content: string;
    isCompleted: boolean;
  };
}

const ToDoItem = ({ todo }: ToDoItemProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [content, setContent] = useState('');
  useEffect(() => {
    if (!todo) {
      return;
    }
    setIsChecked(todo.isCompleted);
    setContent(todo.content);
  }, [todo]);

  return (
    <View style={styles.container}>
      <Checkbox
        isChecked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
        }}
      />
      <TextInput
        value={content}
        onChangeText={setContent}
        style={styles.textInput}
        multiline
      />
    </View>
  );
};

export default ToDoItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
    padding: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#eee',
    marginLeft: 12,
  },
});
