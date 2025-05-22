import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {deleteTodo} from '../redux/slicetodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getPriorityStyles from '../../helper/prioritystyle';

export default function Home({navigation}) {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

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

  const renderItem = ({item}) => {
    const {backgroundColor, textColor} = getPriorityStyles(item.priority);

    return (
      <View style={[styles.todoCard, {backgroundColor}]}>
        <View style={styles.todoTextContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 5,backgroundColor:"white",borderRadius:5,width:112}}>
            <Text style={[styles.todoId, {color: textColor}]}>
              #{item.priority}
            </Text>
            <Text style={[styles.todoId, {color: textColor}]}>
              {'  '}
              {new Date(item.dueDate).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          </View>
          <Text style={[styles.todoTitle, {color: textColor}]}>
            {item.text}
          </Text>
          {item.description ? (
            <Text style={[styles.todoDescription, {color: textColor}]}>
              {item.description}
            </Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.actionButton}>
            <Text style={styles.actionText}>🗑️</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Addtodo', {id: item.id})}
            style={styles.actionButton}>
            <Text style={styles.actionText}>📝</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Todo List</Text>

      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No todos yet</Text>}
        contentContainerStyle={
          todos.length === 0 ? styles.emptyContainer : styles.listContainer
        }
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Addtodo')}>
        <Text style={styles.buttonText}>➕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f7d980',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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
    color: '#333',
    marginTop: 20,
  },
  todoCard: {
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoId: {
    fontSize: 12,
    marginBottom: 5,
    marginRight: 5,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  todoDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  buttonContainer: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  actionButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 5,
  },
  actionText: {
    fontSize: 16,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
