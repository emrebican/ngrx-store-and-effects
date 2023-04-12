import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, from, map, of, switchMap, withLatestFrom } from 'rxjs';

import { BooksService } from 'src/app/services/books.service';
import { latestBookSelector } from './selectors';

import * as BooksActions from './actions';
import { I_AppState } from 'src/app/interfaces/appState.interface';
import { I_Book } from 'src/app/interfaces/book/book.interface';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<I_AppState>,
    private booksService: BooksService
  ) {}

  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getBooks),
      switchMap(() => {
        return this.booksService.getBooks().pipe(
          map((books: I_Book[]) => BooksActions.getBooksSuccess({ books })),
          catchError((error) =>
            of(BooksActions.getBooksFailure({ error: error.message }))
          )
        );
      })
    )
  );

  saveBooks$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BooksActions.addBook),
        withLatestFrom(this.store.select(latestBookSelector)),
        switchMap(([action, book]) => {
          return from(this.booksService.saveBooks(book));
        })
      ),
    { dispatch: false }
  );

  removeBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BooksActions.removeBook),
        switchMap((action) => {
          return from(this.booksService.removeBook(action.id));
        })
      ),
    { dispatch: false }
  );

  completeBook$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BooksActions.completeBook),
        switchMap((action) => {
          return from(
            this.booksService.completeBook({
              id: action.id,
              title: action.title,
              completed: !action.completed
            })
          );
        })
      ),
    { dispatch: false }
  );
}
