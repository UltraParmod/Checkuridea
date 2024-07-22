// src/features/likeDislikeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const likeDislikeSlice = createSlice({
  name: 'likes',
  initialState: { likes: 0, dislikes: 0 },
  reducers: {
    like: (state) => {
      state.likes += 1;
    },
    dislike: (state) => {
      state.dislikes += 1;
    },
  },
});

export const { like, dislike } = likeDislikeSlice.actions;
export default likeDislikeSlice.reducer;
