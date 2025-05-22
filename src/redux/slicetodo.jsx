import { createSlice } from "@reduxjs/toolkit";

const Todoslice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    updateTodo: (state, action) => {
      const { id, title, description, priority, dueDate } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = title;
        todo.description = description || '';
        todo.priority = priority || 'Medium';
        todo.dueDate = dueDate || new Date().toISOString();
      }
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      return state.filter((todo) => todo.id !== id);
    },
    setTodos: (state, action) => {
      return action.payload;
    }
  },
});

export const { addTodo, updateTodo, deleteTodo, setTodos } = Todoslice.actions;
export default Todoslice.reducer;
