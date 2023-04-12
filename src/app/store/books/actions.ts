import { createAction, props } from '@ngrx/store';
import { I_Book } from 'src/app/interfaces/book/book.interface';

// trigger isLoading (Start)
export const getBooks = createAction('[Books] Get Books');

// if it is successed provide books array (End)
export const getBooksSuccess = createAction(
  '[Books] Get Books Success',
  props<{ books: I_Book[] }>()
);

// if it is failure provide error message (End)
export const getBooksFailure = createAction(
  '[Books] Get Books Failure',
  props<{ error: string }>()
);

// add new Book
export const addBook = createAction(
  '[Books] Add Book',
  props<{ title: string }>()
);

// remove Book
export const removeBook = createAction(
  '[Books] Remove Book',
  props<{ id: number }>()
);

// complete Book
export const completeBook = createAction(
  '[Books] Complete Book',
  props<I_Book>()
);
