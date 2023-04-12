import { createAction, props } from '@ngrx/store';
import { I_Post } from 'src/app/interfaces/post/post.interface';

export const getPosts = createAction('[Posts] Get Posts');

export const getPostsSuccess = createAction(
  '[Posts] Get Posts Success',
  props<{ posts: I_Post[] }>()
);

export const getPostsFailure = createAction(
  '[Posts] Get Posts Failure',
  props<{ error: string }>()
);

export const addPost = createAction(
  '[Posts] Add Post',
  props<{ title: string }>()
);

export const deletePost = createAction(
  '[Posts] Delete Post',
  props<{ id: string }>()
);

export const updatePost = createAction('[Posts] Update Post', props<I_Post>());
