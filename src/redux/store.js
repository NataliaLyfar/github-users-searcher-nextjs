import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { middleware } from "./middleware";
import { searchSlice, usersSlice } from "./githubUsers/githubUsersSlice";
import { githubUsersApi } from "./githubUsers/githubUsersApi";

const githubUsersPersistConfig = {
  key: "users",
  storage,
  whiteList: ["users"],
};

export const store = configureStore({
  reducer: {
    [githubUsersApi.reducerPath]: githubUsersApi.reducer,
    [usersSlice.name]: persistReducer(
      githubUsersPersistConfig,
      usersSlice.reducer
    ),
    [searchSlice.name]: searchSlice.reducer,
  },
  middleware,
});

export const persistor = persistStore(store);
