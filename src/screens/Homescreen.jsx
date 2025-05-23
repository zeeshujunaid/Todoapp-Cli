import React, {useContext, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteTodo, completeTodo, archiveOldTodos} from '../redux/slicetodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../../Theme/themecontext';
import Header from '../../components/Header';
import TodoCard from '../../components/Todocard';

export default function Home({navigation}) {
  const dispatch = useDispatch();

  // Filter out archived todos
  const todos = useSelector(state =>
    state.todos
      .filter(todo => !todo.archived)
      .sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
  );

  const {theme, toggleTheme} = useContext(ThemeContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    dispatch(archiveOldTodos());
  }, []);

  const handleDelete = async id => {
    try {
      dispatch(deleteTodo(id));
      const storedTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
      const updatedTodos = parsedTodos.filter(todo => todo.id !== id);
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error deleting todo from AsyncStorage:', error);
    }
  };

  const handleComplete = async id => {
    try {
      dispatch(completeTodo(id));

      const storedTodos = await AsyncStorage.getItem('todos');
      const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];

      const updatedTodos = parsedTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: true,
            completedAt: new Date().toISOString(),
          };
        }
        return todo;
      });

      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error completing todo:', error);
    }
  };

  const renderItem = ({item}) => (
    <TodoCard
      item={item}
      onDelete={handleDelete}
      onEdit={id => navigation.navigate('Addtodo', {id})}
      onComplete={handleComplete}
    />
  );

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? '#121212' : '#fff'},
      ]}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={[styles.emptyText, {color: isDark ? '#fff' : '#333'}]}>
            No todos yet
          </Text>
        }
        contentContainerStyle={
          todos.length === 0 ? styles.emptyContainer : styles.listContainer
        }
      />

      <TouchableOpacity
        style={[
          styles.floatingButton,
          {backgroundColor: isDark ? '#fff' : '#fff'},
        ]}
        onPress={() => navigation.navigate('Addtodo')}>
        <Text style={[styles.buttonText, {color: isDark ? '#fff' : '#000'}]}>
          ➕
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
