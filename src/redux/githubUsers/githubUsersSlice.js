import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      return { items: [...state.items, action.payload] };
    },
    deleteItem: (state, action) => {
      return {
        items: state.items.filter((user) => user.userLogin !== action.payload),
      };
    },
  },
});

export const searchSlice = createSlice({
  name: "search",
  initialState: { value: "" },
  reducers: {
    changeSearch(state, action) {
      state.value = action.payload;
    },
  },
});

export const { addItem, deleteItem } = usersSlice.actions;
export const { changeSearch } = searchSlice.actions;
export const itemsReducer = usersSlice.reducer;
export const searchReducer = searchSlice.reducer;
