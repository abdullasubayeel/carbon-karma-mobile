import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {apiSlice} from '../api/apiSlice';
import authSlice from '../api/auth/authSlice';

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['auth'],
// };
// const rootReducer = combineReducers({
//   [apiSlice.reducerPath]: apiSlice.reducer,
//   auth: authSlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(apiSlice.middleware),

//   devTools: true,
// });

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
// export const persistor = persistStore(store);
export default store;
