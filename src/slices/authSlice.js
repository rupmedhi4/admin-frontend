import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiAgent } from '../apiAgent';
import Cookies from 'js-cookie';

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${apiAgent.signup}`,
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Cookies.set('adminJwt', response.data.token, {
        path: '/',
        secure: true,
        sameSite: 'None',
        expires: 14,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiAgent.login}`,
        {
          email: userData.email,
          password: userData.password,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      Cookies.set('adminJwt', res.data.token, {
        path: '/',
        secure: true,
        sameSite: 'None',
        expires: 14,
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${apiAgent.logout}`,
        {},
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: {},
    isLogin: false,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
          userId: action.payload.user._id,
        };
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.data?.message || 'Signup failed';
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLogin = true;
        state.user = {
          name: action.payload.user.name,
          email: action.payload.user.email,
          userId: action.payload.user._id,
        };
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.data?.message || 'Login failed';
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isLogin = false;
        state.user = {};
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.data?.message || 'Logout failed';
      });
  },
});

export default authSlice.reducer;
