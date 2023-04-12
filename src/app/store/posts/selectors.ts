import { createSelector, createFeatureSelector } from '@ngrx/store';
import { I_AppState } from 'src/app/interfaces/appState.interface';
import { I_PostsState } from 'src/app/interfaces/post/postsState.interface';

// What is Selectors: This is the way how we can select properties from our state

// We can create our own SelectFeature
export const selectFeature = (state: I_AppState) => state.posts;

export const isLoadingSelector = createSelector(
  selectFeature,
  (state) => state.isLoading
);

export const postsSelector = createSelector(
  selectFeature,
  (state) => state.posts
);

export const latestPostSelector = createSelector(
  selectFeature,
  (state) => state.posts[state.posts.length - 1]
);

export const errorSelector = createSelector(
  selectFeature,
  (state) => state.error
);

// We can use createFeatureSelector method

/* export const isLoadingSelector = createSelector(
  createFeatureSelector('posts'),
  (state: I_PostsState) => state.isLoading
);

export const postsSelector = createSelector(
  createFeatureSelector('posts'),
  (state: I_PostsState) => state.posts
);

export const errorSelector = createSelector(
  createFeatureSelector('posts'),
  (state: I_PostsState) => state.error
); */
