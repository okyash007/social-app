import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")),
    userSlider: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setUserSlider: (state) => {
      state.userSlider = !state.userSlider;
    },
  },
});

export const { setUser, setUserSlider } = appSlice.actions;

export default appSlice.reducer;
