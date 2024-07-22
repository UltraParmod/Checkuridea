// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import likeDislikeReducer from './LikeDislikeComponent';

export const store = configureStore({
  reducer: {
    likes: likeDislikeReducer,
  },
});
