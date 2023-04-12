import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  map,
  of,
  from,
  mergeMap,
  switchMap,
  catchError,
  withLatestFrom
} from 'rxjs';
import { Store } from '@ngrx/store';

import * as PostsActions from './actions';
import { PostsService } from 'src/app/services/posts.service';
import { I_AppState } from 'src/app/interfaces/appState.interface';
import { latestPostSelector, postsSelector } from './selectors';
import { HttpClient } from '@angular/common/http';

// Effects make possible to work with async operations in ngrx
@Injectable()
export class PostsEffects {
  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PostsActions.getPosts),
      mergeMap(() => {
        return this.postsService.getPosts().pipe(
          map((posts) => PostsActions.getPostsSuccess({ posts })),
          catchError((error) =>
            of(PostsActions.getPostsFailure({ error: error.message }))
          )
        );
      })
    )
  );

  savePosts$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.addPost),
        withLatestFrom(this.store.select(latestPostSelector)),
        switchMap(([action, post]) => {
          console.log('SAVE ACTION', action);
          console.log('SAVE POST', post);

          return from(this.postsService.savePosts(post));
        })
      ),
    { dispatch: false }
  );

  deletePost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.deletePost),
        switchMap((action) => {
          console.log('DELETE ACTION', action);

          return from(this.postsService.deletePost(action.id));
        })
      ),
    { dispatch: false }
  );

  updatePost$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PostsActions.updatePost),
        switchMap((action) => {
          console.log('UPDATE ACTION', action);

          return from(
            this.postsService.updatePost({ id: action.id, title: action.title })
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private postsService: PostsService,
    private store: Store<I_AppState>
  ) {}
}
