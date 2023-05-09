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
      .addCase(fetchMoreTodos.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMoreTodos.fulfilled, (state, action) => {
        state.datasp = state.datasp.concat(action.payload);
      })
  },
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("http://localhost:3000/datasp");
  let data = await res.json();
  return data;
});
export const fetchMoreTodos = createAsyncThunk("todos/fetchMoreTodos", async (id) => {
  const res = await fetch(`http://localhost:5000/loadBook/${id}`);
  let data = await res.json();
  return data;
});


