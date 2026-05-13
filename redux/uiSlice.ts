import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
  mobileSidebarOpen: boolean;
}

const getInitialSidebarState = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("sidebarOpen");
    if (saved !== null) {
      return saved === "true";
    }
    return window.innerWidth >= 1024;
  }
  return true;
};

const initialState: UIState = {
  sidebarOpen: getInitialSidebarState(),
  mobileSidebarOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarOpen", String(state.sidebarOpen));
      }
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("sidebarOpen", String(action.payload));
      }
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    setMobileSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen, toggleMobileSidebar, setMobileSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;