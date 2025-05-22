import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function Header({ isDark, toggleTheme }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.headerText, { color: isDark ? '#fff' : '#000' }]}>Todo List</Text>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
