import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const bodySlide = createSlice({
  name: 'filter',
  initialState: { status: 'loading', datasp: [], database: [], search: '', copy: [], searcharr: [] },
  reducers: {
    searchSp: (state, action) => {
      state.search = action.payload.search;
    },
    status: (state, action) => {
      state.datasp = state.datasp.filter((item) => {
        if (item.id == action.payload.id) {
          item.status = false;
          return item;
        }
        return item;
      });
    },
    status1: (state, action) => {
      state.database = state.database.filter((item) => {
        if (item.id == action.payload.id) {
          item.status = false;
          return item;
        }
        return item;
      });
    },
    copy: (state, action) => {
      state.copy = action.payload.data;
    },
    enter: (state, action) => {
      state.searcharr = state.copy;
    },
    afterborrow: (state, action) => {
      state.datasp = state.datasp.filter((item) => {
        if (item.id == action.payload.id) {
          item.hanmuon = action.payload.hanmuon;
          return item;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoreTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMoreTodos.fulfilled, (state, action) => {
        if (action.payload.length > 0) {
          state.status = 'idle';
          state.datasp = state.datasp.concat(action.payload).filter((item) => item);
        } else {
          state.status = 'stop';
          state.datasp = state.datasp.concat(action.payload).filter((item) => item);
        }
      })
      .addCase(fetchDatabase.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDatabase.fulfilled, (state, action) => {
        state.database = action.payload;
        state.status = 'idle';
      });
  },
});

export const fetchMoreTodos = createAsyncThunk('todos/fetchMoreTodos', async (id) => {
  if (id == 'stop') {
    return [];
  } else {
    const res = await fetch(`http://localhost:5000/loadBook/${id}`);
    let data = await res.json();
    return data;
  }
});
export const fetchDatabase = createAsyncThunk('todos/fetchDatabase', async () => {
  const res = await fetch('http://localhost:3000/database');
  let data = await res.json();
  return data;
});
