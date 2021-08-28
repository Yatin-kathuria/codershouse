import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    phone: "",
    hash: "",
    otp: null,
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    setOtp: (state, action) => {
      const { phone, hash, otp } = action.payload;
      state.otp = { phone, hash, otp };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setOtp } = authSlice.actions;

export default authSlice.reducer;
