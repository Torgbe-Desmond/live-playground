import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    currentRoom: null,
    roomSize: 0,
    peopleConnected: [],
    isConnected: false,
  },
  reducers: {
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },

    // Set the entire list (used when newly joining)
    addToRoom: (state, action) => {
      state.peopleConnected = Array.isArray(action.payload)
        ? action.payload
        : [];
    },

    // Add a single person (used when someone else joins)
    addNewPersonToRoom: (state, action) => {
      const newUser = action.payload;
      if (!newUser?.userId) return;

      const exists = state.peopleConnected.some(
        (u) => u.userId === newUser.userId,
      );

      if (!exists) {
        state.peopleConnected.push(newUser);
      }
    },

    setRoomSize: (state, action) => {
      state.roomSize = action.payload;
    },

    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },

    removeLeftUser: (state, action) => {
      const { userId } = action.payload;
      state.peopleConnected = state.peopleConnected.filter(
        (p) => p.userId !== userId,
      );
    },

    leaveRoom: (state) => {
      state.currentRoom = null;
      state.roomSize = 0;
      state.peopleConnected = [];
      state.isConnected = false;
    },

    // Optional: Clear room data
    resetRoom: (state) => {
      state.peopleConnected = [];
      state.roomSize = 0;
    },
  },
});

export const {
  addNewPersonToRoom,
  setCurrentRoom,
  addToRoom,
  removeLeftUser,
  setRoomSize,
  setConnected,
  leaveRoom,
  resetRoom,
} = roomSlice.actions;

export default roomSlice.reducer;
