import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const homeSlide = createSlice({
  name: 'home',
  initialState: { status: 'loading',manga:[], ault:[],  young:[], kids: [], database: [], search: '', copy: [], searcharr: [] },
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
      state.kids = state.kids.filter((item) => {
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
      .addCase(fetchKids.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchKids.fulfilled, (state, action) => {
        state.database = state.database.concat(action.payload)
        state.kids = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchYoung.fulfilled, (state, action) => {
        state.database = state.database.concat(action.payload)
        state.young = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchAult.fulfilled, (state, action) => {
        state.database = state.database.concat(action.payload)
        state.manga = action.payload;
        state.status = 'idle';
      })
      .addCase(fetchManga.fulfilled, (state, action) => {
        state.database = state.database.concat(action.payload)
        state.ault = action.payload;
        state.status = 'idle';
      })
  },
});

export const fetchKids = createAsyncThunk('todos/fetchKids', async () => {
  const res = await fetch('http://localhost:3000/kids');
  let data = await res.json();
  return data;
});
export const fetchYoung = createAsyncThunk('todos/fetchYoung', async () => {
    const res = await fetch('http://localhost:3000/young');
    let data = await res.json();
    return data;
  });
  export const fetchAult = createAsyncThunk('todos/fetchAult', async () => {
    const res = await fetch('http://localhost:3000/ault');
    let data = await res.json();
    return data;
  });
  export const fetchManga = createAsyncThunk('todos/fetchManga', async () => {
    const res = await fetch('http://localhost:3000/manga');
    let data = await res.json();
    return data;
  });
