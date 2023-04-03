import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Text, View } from '../../components/Themed';
import ToDoItem from '../../components/ToDoItem';

export default function TabOneScreen() {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>

      <FlatList
        data={todos}
        renderItem={({ item }) => <ToDoItem todo={item} />}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
});
