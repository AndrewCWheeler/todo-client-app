import React, { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { View, Text, TextInput } from '../../../components/Themed';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
// import styles from './Counter.module.css';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <View>
      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => dispatch(decrement())}>
          <Text>-</Text>
        </Pressable>
        <Text style={styles.countStyle}>{count}</Text>
        <Pressable onPress={() => dispatch(increment())} style={styles.button}>
          <Text>+</Text>
        </Pressable>
      </View>
      <View style={styles.row}>
        <TextInput
          style={styles.textBox}
          value={incrementAmount}
          onChangeText={(text) => setIncrementAmount(text)}
        />
        <Pressable
          style={styles.button}
          onPress={() => dispatch(incrementByAmount(incrementValue))}
        >
          <Text>Add Amount</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(incrementAsync(incrementValue))}
        >
          <Text>Add Async</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => dispatch(incrementIfOdd(incrementValue))}
        >
          <Text>Add If Odd</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countStyle: {
    fontSize: 24,
    paddingHorizontal: 9,
    marginTop: 3,
  },
  button: {
    paddingBottom: 3,
    margin: 3,
    padding: 6,
    backgroundColor: 'blue',
    borderRadius: 1,
  },
  textBox: {
    fontSize: 18,
    padding: 3,
    width: 33,
    textAlign: 'center',
    marginRight: 3,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
