import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import expandSidebar from "./ExpandSlice";
import dialog from "./DialogSlice";
import { persistReducer, createMigrate } from "redux-persist";
import cart from "./cartSlice";

const reducers = combineReducers({
  cart,
  expandSidebar,
  dialog,
});

const migrations = {
  0: (state) => {
    // Migration to transform incorrect cart array to cart object with cartItems
    if (Array.isArray(state.cart)) {
      return {
        ...state,
        cart: {
          cartItems: state.cart,
        },
      };
    }
    return state;
  },
  // Add other migrations if needed
};

const persistConfig = {
  key: "root",
  version: 1, // Increment for each migration
  storage,
  migrate: createMigrate(migrations, { debug: false }), // Set to true to see migration messages
  // Add a 'whitelist' or 'blacklist' if you want to choose what to persist
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

export default store;
