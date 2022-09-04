/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {decrement, increment} from '../redux/actions/countActions';
import {store} from '../redux/store';

const CounterScreen = () => {
  const [count, setCount] = useState(store.getState().count);
  const getCount = () => {
    setCount(store.getState().count);
  };
  store.subscribe(getCount);
  return (
    <View>
      <View>
        <Text style={styles.sectionTitle}>Counter</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>{count.count}</Text>
        <Button title="Increase" onPress={() => store.dispatch(increment())} />
        <Button title="Decrease" onPress={() => store.dispatch(decrement())} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    backgroundColor: '#0096FF',
    width: 100,
    textAlign: 'center',
    color: '#ffffff',
    padding: 5,
  },
});

export default CounterScreen;
