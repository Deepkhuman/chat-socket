import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedInUser: null,
  isConnected: false,
  roomData: { room: null, receiver: null },
  messages: [],
  onlineUsers: [],
};

const appSlice = createSlice({
  name: "appstate",
  initialState,
  reducers: {
    setUser(state, action) {
      state.loggedInUser = action.payload;
    },
    logoutUser(state) {
      state.loggedInUser = null;
      state.isConnected = false;
      state.roomData = { room: null, receiver: null };
      state.messages = [];
    },
    setSocketConnection(state, action) {
      state.isConnected = action.payload;
    },
    setRoomData(state, action) {
      state.roomData = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
    setAllmsg(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});

export const {
  setUser,
  logoutUser,
  setSocketConnection,
  setRoomData,
  addMessage,
  setOnlineUsers,
  setAllmsg,
} = appSlice.actions;

export default appSlice.reducer;
