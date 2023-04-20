import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { verifyToken } from './authAPI';

// Define a type for the slice state
interface AuthState {
  user: {
    id: string | null | undefined;
    name: string | null | undefined;
  };
  token: string | null | undefined;
  status: 'idle' | 'loading' | 'failed';
}

// Define the initial state using that type
const initialState: AuthState = {
  user: {
    id: null,
    name: null,
  },
  token: null,
  status: 'idle',
};

export const authenticate = createAsyncThunk('(auth)/verifyToken', async () => {
  const response = await verifyToken();
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user.id = user.id;
      state.user.name = user.name;
      state.token = token;
    },
    logOut: (state, action) => {
      state.user.id = null;
      state.user.name = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.token = action.payload;
        state.status = 'idle';
      })
      .addCase(authenticate.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { login, logOut } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
