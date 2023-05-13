import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavoritesState = {
  favorites: Array<string>;
};

const favorites =
  (localStorage.getItem('user-favorites') as unknown as Array<string>) || [];
const initialState: FavoritesState = { favorites };

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favorites.push(action.payload);
      localStorage.setItem('user-favorites', JSON.stringify(state.favorites));
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const targetIndex = state.favorites.indexOf(action.payload);
      if (targetIndex !== -1) state.favorites.splice(targetIndex, 1);
      localStorage.setItem('user-favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
