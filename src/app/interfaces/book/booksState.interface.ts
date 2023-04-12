import { I_Book } from './book.interface';

export interface I_BooksState {
  isLoading: boolean;
  books: I_Book[];
  error: string | null;
}
