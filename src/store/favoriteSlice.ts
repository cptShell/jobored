import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SliceName, StorageKey } from '../common/enums/enums';

type FavoritesState = {
  favorites: Array<number>;
};

const favorites = JSON.parse(
  localStorage.getItem(StorageKey.FAVORITES) || '[]'
) as Array<number>;
const initialState: FavoritesState = { favorites };

const favoritesSlice = createSlice({
  name: SliceName.FAVORITES,
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<number>) {
      state.favorites = [...state.favorites].concat(action.payload);
      localStorage.setItem(
        StorageKey.FAVORITES,
        JSON.stringify(state.favorites)
      );
    },
    removeFavorite(state, action: PayloadAction<number>) {
      const targetIndex = state.favorites.indexOf(action.payload);
      if (targetIndex !== -1) {
        const newFavorites = [...state.favorites];
        newFavorites.splice(targetIndex, 1);
        state.favorites = newFavorites;
        localStorage.setItem(
          StorageKey.FAVORITES,
          JSON.stringify(state.favorites)
        );
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
