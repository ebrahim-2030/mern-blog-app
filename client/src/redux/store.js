// import core redux toolkit methods and helpers
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import user reducer
import userReducer from "./user/userSlice";
// import persist methods and storage engine    
import {persistReducer, persistStore} from "redux-persist";
// uses localStorage as default
import storage from "redux-persist/lib/storage"
// import theme reducer
import themeReducer from "./theme/themeSlice";


// combine all reducers into a root reducer
const rootReducer  = combineReducers({
    user: userReducer,
    theme: themeReducer
});

// configuration for redux-persist
const persistConfig = {
    key: 'root',
    storage,
    version: 1

};

// create a persisted reducer using config
const persistedReducer = persistReducer(persistConfig, rootReducer);


// configure redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});


// create and export the persistor
export const persistor = persistStore(store)