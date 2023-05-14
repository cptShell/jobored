import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritesState = {
  favorites: Array<string>;
};

const favorites = JSON.parse(
  localStorage.getItem('user-favorites') || '[]'
) as Array<string>;
const initialState: FavoritesState = { favorites };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favorites = [...state.favorites].concat(action.payload);
      localStorage.setItem('user-favorites', JSON.stringify(state.favorites));
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const targetIndex = state.favorites.indexOf(action.payload);
      if (targetIndex !== -1) {
        const newFavorites = [...state.favorites];
        newFavorites.splice(targetIndex, 1);
        state.favorites = newFavorites;
        localStorage.setItem('user-favorites', JSON.stringify(state.favorites));
      }
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
