import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../services';

export const bodySlide = createSlice({
  name: 'filter',
  initialState: { status: 'loading', datasp: [], database: [], search: '', copy: [], searcharr: [], hanmuon: "all" , star:"all"},
  reducers: {
    searchSp: (state, action) => {
      state.search = action.payload.search;
    },
    status: (state, action) => {
      state.datasp = state.datasp.filter((item) => {
        if (item.id == action.payload.id) {
          item.status = false;
          item.hanmuon = action.payload.hanmuon
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
      state.database = state.database.filter((item) => {
        if (item.id == action.payload.id) {
          item.hanmuon = action.payload.hanmuon;
          return item;
        }
        return item;
      });
    },
    updatetym: (state, action) => {
      state.database = state.database.filter((item) => {
        if (item.id == action.payload.id) {
          item.tym.push(action.payload.iduser);
          return item;
        } else {
          return item;
        }
      });
    },
    updatetymsp: (state, action) => {
      state.datasp = state.datasp.filter((item) => {
        if (item.id == action.payload.id) {
          item.tym.push(action.payload.iduser);
          return item;
        } else {
          return item;
        }
      });
    },
    updatetymsp1: (state, action) => {
      state.datasp = state.datasp.filter((item) => {
        if (item.id === action.payload.id) {
          item.tym = item.tym.filter((item1) => item1 !== action.payload.iduser);
        }
        return item;
      });
    },
    updatetym1: (state, action) => {
      state.database = state.database.filter((item) => {
        if (item.id === action.payload.id) {
          item.tym = item.tym.filter((item1) => item1 !== action.payload.iduser);
        }
        return item;
      });
    },
    trangthaisach: (state, action) => {
        state.hanmuon = action.payload.status
    },
    trangthaistar: (state, action) => {
 
        state.star = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoreTodos.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchMoreTodos.fulfilled, (state, action) => {
        state.datasp = action.payload;
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
  let endpoint = {}
  if (id.search) {
    endpoint = {
      search:id.search
   }
  }
  if (id.author) {
    endpoint = {
      author:id.author.toLowerCase()
   }
  }
  console.log(endpoint);
    const res = await fetch(`http://localhost:5000/loadBook/${id.id}`, {
      method: 'POST',
      body: JSON.stringify(endpoint),
      headers:{
        'Content-Type': 'application/json',
      }
    });
    let data = await res.json();
    console.log(data);
    return data;

});
export const fetchDatabase = createAsyncThunk('todos/fetchDatabase', async () => {
  const res = await fetch('http://localhost:3000/database');
  let data = await res.json();
  return data;
});
