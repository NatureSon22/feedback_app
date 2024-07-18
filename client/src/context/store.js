import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";
import feedSlice from "./slice/feedSlice";

// Combine the reducers
const appReducer = combineReducers({
  user: userSlice,
  feedbacks: feedSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  storage.removeItem("persist:root");
  return appReducer(state, action);
};

// Configure the persistence
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, appReducer);

// Configure the store with middleware to handle non-serializable actions
const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { persistor, rootReducer };
export default store;
