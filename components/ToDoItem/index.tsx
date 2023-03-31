import { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Checkbox from '../Checkbox';

const ToDoItem = () => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <View style={styles.container}>
      <Checkbox
        isChecked={isChecked}
        onPress={() => {
          setIsChecked(!isChecked);
        }}
      />
      <TextInput style={styles.textInput} multiline />
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
