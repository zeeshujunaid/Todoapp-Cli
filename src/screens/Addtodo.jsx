import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo } from '../redux/slicetodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Header from '../../components/Header';
import { ThemeContext } from '../../Theme/themecontext';
import PriorityPicker from '../../components/Priority';
import DatePicker from '../../components/Datepicker';

export default function Addtodo({ route, navigation }) {
  const dispatch = useDispatch();
  const { id } = route.params || {};
  const todos = useSelector(state => state.todos);

  const existingTodo = todos.find(todo => todo.id === id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(new Date());

  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  useEffect(() => {
    if (existingTodo) {
      setTitle(existingTodo.text);
      setDescription(existingTodo.description || '');
      setPriority(existingTodo.priority || 'Medium');
      setDueDate(
        existingTodo.dueDate ? new Date(existingTodo.dueDate) : new Date()
      );
    }
  }, [existingTodo]);

  const saveTodosToStorage = async todos => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving to AsyncStorage', error);
    }
  };

  const handleSubmit = async () => {
    if (title.trim() === '') {
      alert('Please enter a todo title');
      return;
    }

    if (existingTodo) {
      dispatch(updateTodo({ id, title, description, priority, dueDate }));
      const updatedTodos = todos.map(todo =>
        todo.id === id
          ? { ...todo, text: title, description, priority, dueDate }
          : todo
      );
      await saveTodosToStorage(updatedTodos);
    } else {
      const newTodo = {
        id: uuid.v4(),
        text: title,
        description,
        completed: false,
        priority,
        dueDate: dueDate.toISOString(),
      };
      dispatch(addTodo(newTodo));
      const updatedTodos = [...todos, newTodo];
      await saveTodosToStorage(updatedTodos);
    }

    setTitle('');
    setDescription('');
    navigation.navigate('Home');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <Text style={[styles.heading, { color: isDark ? '#fff' : '#000' }]}>
        {existingTodo ? 'Edit Todo' : 'Add Todo'}
      </Text>

      <TextInput
        placeholder="Enter Todo"
        placeholderTextColor={isDark ? '#ccc' : '#888'}
        style={[styles.input, { backgroundColor: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#000' }]}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Enter Description (optional)"
        placeholderTextColor={isDark ? '#ccc' : '#888'}
        style={[styles.input, { backgroundColor: isDark ? '#333' : '#fff', color: isDark ? '#fff' : '#000' }]}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Priority:</Text>
      <PriorityPicker priority={priority} setPriority={setPriority} />

      <Text style={[styles.label, { color: isDark ? '#fff' : '#000' }]}>Due Date:</Text>
      <DatePicker dueDate={dueDate} setDueDate={setDueDate} />

      <Button
        title={existingTodo ? 'Update Todo' : 'Add Todo'}
        onPress={handleSubmit}
        color={isDark ? '#bbb' : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    gap: 20,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
