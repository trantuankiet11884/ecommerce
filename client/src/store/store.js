import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app/appSlice.js";
import productSlice from "./products/productSlice.js";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userSlice from "./user/userSlice.js";

const configPersitUser = {
  key: "shop/user",
  storage,
};

const userConfig = {
  ...configPersitUser,
  whiteList: ["isLoggedIn", "token", "current"],
};

export const store = configureStore({
  reducer: {
    appReducer: appSlice,
    products: productSlice,
    user: persistReducer(userConfig, userSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
