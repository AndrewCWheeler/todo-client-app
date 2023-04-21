import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

export interface TodoModalState {
  addTodoModalVisible: boolean;
  editTodoModalVisible: boolean;
}

const initialState: TodoModalState = {
  addTodoModalVisible: false,
  editTodoModalVisible: false,
};

export const todoModalSlice = createSlice({
  name: 'todoModal',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAddTodoModalVisible: (state) => {
      console.log('Triggered setAddTodoModalVisible');
      state.addTodoModalVisible = true;
    },
    setAddTodoModalHidden: (state) => {
      state.addTodoModalVisible = false;
    },
    setEditTodoModalVisible: (state) => {
      state.editTodoModalVisible = true;
    },
    setEditTodoModalHidden: (state) => {
      state.editTodoModalVisible = false;
    },
  },
});

export const {
  setAddTodoModalVisible,
  setAddTodoModalHidden,
  setEditTodoModalVisible,
  setEditTodoModalHidden,
} = todoModalSlice.actions;

export const selectTodoModal = (state: RootState) => state.todoModal;

export default todoModalSlice.reducer;
