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
    },

    completeTodo: (state, action) => {
      const id = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
        todo.completedAt = new Date().toISOString(); // full date+time
      }
    },

    archiveOldTodos: (state) => {
      const now = new Date();
      state.forEach(todo => {
        if (todo.completed && !todo.archived) {
          const completedTime = new Date(todo.completedAt);
          const diffInHours = (now - completedTime) / (1000 * 60 * 60);
          if (diffInHours >= 24) {
            todo.archived = true;
          }
        }
      });
    }
  },
});

export const {
  addTodo,
  updateTodo,
  deleteTodo,
  setTodos,
  completeTodo,
  archiveOldTodos
} = Todoslice.actions;

export default Todoslice.reducer;
