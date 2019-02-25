import {Action} from '@ngrx/store';
import {Book, Books} from '../../models/books.model';

export namespace BOOK_ACTION {
  export const ADD_BOOK = 'ADD_BOOK';
  export const UPDATE_BOOK = 'UPDATE_BOOK';
  export const LOAD_BOOKS = 'LOAD_BOOKS';
  // export const SEARCH_BOOKS = 'SEARCH_BOOKS'; // for future search
}

export type BooksAction = AddBook | UpdateBook | LoadBooks;

export class AddBook implements Action {
  readonly type = BOOK_ACTION.ADD_BOOK;

  constructor(public payload: Book) {
  }
}

export class UpdateBook implements Action {
  readonly type = BOOK_ACTION.UPDATE_BOOK;

  constructor(public payload: Book) {
  }
}

export class LoadBooks implements Action {
  readonly type = BOOK_ACTION.LOAD_BOOKS;

  constructor(public payload: Books[]) {
  }
}

// export class SearchBook implements Action {  // FOR IMPLEMENT SORT BY NAME
//   readonly type = BOOK_ACTION.SEARCH_BOOKS;
//
//   constructor(public payload: string) {
//   }
// }



