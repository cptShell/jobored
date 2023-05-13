import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoriteSlice';
import { enableMapSet } from 'immer';

enableMapSet();

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
