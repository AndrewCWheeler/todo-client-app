import { useState } from 'react';
import { StyleSheet, FlatList, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import ToDoItem from '../../components/ToDoItem';

let id = '4';

export default function ProjectsScreen() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([
    {
      id: '1',
      content: 'Buy milk',
      isCompleted: false,
    },
    {
      id: '2',
      content: 'Buy cereal',
      isCompleted: false,
    },
    {
      id: '3',
      content: 'Pour milk',
      isCompleted: false,
    },
  ]);

  const createNewItem = (atIndex: number) => {
    const newTodos = [...todos];
    newTodos.splice(atIndex, 0, {
      id: id,
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        value={title}
        onChangeText={setTitle}
        placeholder={'Title'}
      />

      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <ToDoItem todo={item} onSubmit={() => createNewItem(index + 1)} />
        )}
        style={{ width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
