import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import CounterReducer from './features/counter/counterSlice';
import AuthReducer from './(auth)/authSlice';
import ProjectReducer from './features/project/projectSlice';
import TodoModalReducer from './features/modals/todoModalSlice';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    auth: AuthReducer,
    project: ProjectReducer,
    todoModal: TodoModalReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
