import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const adminSlide = createSlice({
  name: "admin",
  initialState: { status: "loading", user: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "idle";
      })
  },
});

export const fetchUser = createAsyncThunk("cart/fetchUser", async () => {
  const res = await fetch(`http://localhost:3000/users`)
  let data = await res.json();
  return data;
});