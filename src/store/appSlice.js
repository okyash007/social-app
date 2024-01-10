import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    userSlider: false,
    chats: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setUserSlider: (state) => {
      state.userSlider = !state.userSlider;
    },
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    addChats: (state, action) => {
      state.chats = [...state.chats, action.payload];
    },
  },
});

export const { setUser, setUserSlider, setChats, addChats } = appSlice.actions;

export default appSlice.reducer;
