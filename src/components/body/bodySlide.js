import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const bodySlide = createSlice({
  name: "filter",
  initialState: { status: "loading", datasp: [] , search:""},
  reducers:{
    searchSp:(state , action) => {
      state.search = action.payload.search
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.datasp = action.payload;
        state.status = "idle";
      })
  },
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("http://localhost:3000/datasp");
  let data = await res.json();
  return data;
});
export const fetchOption = createAsyncThunk(
  "todos/fetchTodos",
  async (option) => {
    const res = await fetch(`https://api-1den8.onrender.com/${option}`);
    let data = await res.json();
    return data;
  }
);

