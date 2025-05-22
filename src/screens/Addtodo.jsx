import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo, updateTodo} from '../redux/slicetodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import getPriorityStyles from '../../helper/prioritystyle'; 

export default function Addtodo({route, navigation}) {
  const dispatch = useDispatch();
  const {id} = route.params || {};
  const todos = useSelector(state => state.todos);

  const existingTodo = todos.find(todo => todo.id === id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (existingTodo) {
      setTitle(existingTodo.text);
      setDescription(existingTodo.description || '');
      setPriority(existingTodo.priority || 'Medium');
      setDueDate(existingTodo.dueDate ? new Date(existingTodo.dueDate) : new Date());
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
      dispatch(updateTodo({id, title, description, priority, dueDate}));
      const updatedTodos = todos.map(todo =>
        todo.id === id
          ? {...todo, text: title, description, priority, dueDate}
          : todo,
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
    <View style={styles.container}>
      <Text style={styles.heading}>
        {existingTodo ? 'Edit Todo' : 'Add Todo'}
      </Text>

      <TextInput
        placeholder="Enter Todo"
        style={[styles.input, {backgroundColor: '#fff'}]}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Enter Description (optional)"
        style={[styles.input, {backgroundColor: '#fff'}]}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Priority:</Text>
      <View style={[styles.dropdown, {backgroundColor: getPriorityStyles()}]}>
        <Picker
          selectedValue={priority}
          onValueChange={itemValue => setPriority(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      <Text style={styles.label}>Due Date:</Text>
      <Button
        title={dueDate.toDateString()}
        onPress={() => setShowDatePicker(true)}
      />

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDueDate(selectedDate);
          }}
        />
      )}

      <Button
        title={existingTodo ? 'Update Todo' : 'Add Todo'}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
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
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});
