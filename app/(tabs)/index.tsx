import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import ToDoItem from '../../components/ToDoItem';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <ToDoItem />
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
