
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiAgent } from '../apiAgent';


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
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${apiAgent.login}`, {
        email: userData.email,
        password: userData.password,
      }, {
        withCredential: true
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      )
      console.log(res.data);
      return res.data
    } catch (error) {
      return rejectWithValue(err)
    }
  }
)


const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: {},
    isLogin: false,
    loading: false,
    pending: false,
    error: null
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      //SIGN UP
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
          userId: action.payload.user._id
        }
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false,
          state.isLogin = true
  })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { } = authSlice.actions;
export default authSlice.reducer;
