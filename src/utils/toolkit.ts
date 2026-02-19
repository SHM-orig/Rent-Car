import { configureStore, createSlice } from "@reduxjs/toolkit";
import { userApi } from "./api";

const slice = createSlice({
  name: "user",
  initialState: {
    user: { name: "", phone: 0, email: "", password: "", role: "" },
    users: [],
    current: null,
    checkPass: false, 
  },
  reducers: {
    getName: (state, action) => {
      state.user.name = action.payload;
    },
    getPhone: (state, action) => {
      state.user.phone = action.payload;
    },
    getEmail: (state, action) => {
      state.user.email = action.payload;
    },
    getPassword: (state, action) => {
      if (action.payload.length >= 8) {
        state.user.password = action.payload;
        state.checkPass = false
      } else {
        state.checkPass = true;
      }
    },
    getRole: (state, action) => {
      state.user.role = action.payload;
    },
  },
});

export const store = configureStore({
  reducer: {
    user: slice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (gDM) => gDM().concat(userApi.middleware),
});

export const actions = { ...slice.actions };
