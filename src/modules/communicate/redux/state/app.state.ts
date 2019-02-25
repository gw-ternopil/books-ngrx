import {Book} from '../../models/books.model';

export interface AppState {
  booksPage: {
    books: Book[]
  };
}
