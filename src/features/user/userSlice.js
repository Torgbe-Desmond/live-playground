import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const registerUser = createAsyncThunk(
  "user/register",
  async (username, { rejectWithValue }) => {
    try {
      const res = await api.post("/users", { username });
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || "Registration failed");
    }
  }
);

const stored = JSON.parse(localStorage.getItem("liveShareUser") || "null");

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: stored?.userId || null,
    username: stored?.username || null,
    roomName: stored?.roomName || null,
    loading: false,
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.userId = null;
      state.username = null;
      state.roomName = null;
      localStorage.removeItem("liveShareUser");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userId = action.payload.userId;
        state.username = action.payload.username;
        state.roomName = action.payload.roomName;
        localStorage.setItem("liveShareUser", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
