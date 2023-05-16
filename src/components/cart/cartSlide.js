import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const cartSlide = createSlice({
  name: "cart",
  initialState: { status: "loading", datasp: [] },
  reducers:{
    deleteCart:(state , action) => {
      state.datasp = state.datasp.filter((item) =>{
        if (item.id != action.payload.id) {
          return item
        }
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCarts.fulfilled, (state, action) => {
        state.datasp = action.payload.cart;
        state.status = "idle";
      })
  },
});

export const fetchCarts = createAsyncThunk("cart/fetchCarts", async () => {
  const res = await fetch(`http://localhost:5000/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Beaer ${localStorage.getItem("token")}`,
    }
  })
  let data = await res.json();
  return data;
});
