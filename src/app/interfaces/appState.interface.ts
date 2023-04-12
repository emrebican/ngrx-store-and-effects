import { I_BooksState } from './book/booksState.interface';
import { I_PostsState } from './post/postsState.interface';

export interface I_AppState {
  posts: I_PostsState;
  books: I_BooksState;
}
