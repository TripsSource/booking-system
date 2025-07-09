import { createSlice } from "@reduxjs/toolkit";

interface ThemeCustomize {
  toggleSideBar: boolean;
  toggleRtl: boolean;
}

const initialState: ThemeCustomize = {
  toggleSideBar: false,
  toggleRtl: false,
};

const ThemeCustomize = createSlice({
  name: "ThemeCustomize",
  initialState,
  reducers: {
    setToggleSideBar: (state) => {
      state.toggleSideBar = !state.toggleSideBar;
    },
    responsiveSideBar: (state, action) => {
      state.toggleSideBar = action.payload;
    },
    setToggleRtl: (state) => {
      state.toggleRtl = !state.toggleRtl;
    },
  },
});

export const { setToggleSideBar, setToggleRtl, responsiveSideBar } =
  ThemeCustomize.actions;

export default ThemeCustomize.reducer;
