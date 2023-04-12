import { createReducer, on } from '@ngrx/store';

import * as PostsActions from './actions';
import { I_PostsState } from 'src/app/interfaces/post/postsState.interface';

const initialState: I_PostsState = {
  posts: [],
  isLoading: false,
  error: null
};

export const postsReducer = createReducer(
  initialState,

  // isLoading = true
  on(PostsActions.getPosts, (state) => ({ ...state, isLoading: true })),

  // getPosts Success
  on(PostsActions.getPostsSuccess, (state, action) => ({
    ...state,
    posts: action.posts,
    isLoading: false
  })),

  // getPosts Failure
  on(PostsActions.getPostsFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  })),

  // add post
  on(PostsActions.addPost, (state, { title }) => ({
    ...state,
    posts: [
      ...state.posts,
      { title: title, id: new Date().getTime().toString() }
    ]
  })),

  // remove post
  on(PostsActions.deletePost, (state, { id }) => ({
    ...state,
    posts: state.posts.filter((p) => p.id !== id)
  })),

  // update post
  on(PostsActions.updatePost, (state, post) => ({
    ...state,
    posts: state.posts.map((p) => (p.id === post.id ? post : p))
  }))
);
