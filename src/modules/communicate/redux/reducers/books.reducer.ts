import {BOOK_ACTION, BooksAction} from '../actions/books.action';
import {Book} from '../../models/books.model';


const initialState = {
  books: []
};

export function BooksReducer(state = initialState, action: BooksAction) {

  switch (action.type) {
    case BOOK_ACTION.ADD_BOOK: {
      return {
        ...state,
        books: [...state.books, action.payload]
      };
    }

    case BOOK_ACTION.UPDATE_BOOK : {
      return {
        ...state,
        books: [...state.books.filter((book: Book) => book.id !== action.payload.id), action.payload]
      };
    }

    case BOOK_ACTION.LOAD_BOOKS: {
      return {
        ...state,
        books: [...action.payload]
      };
    }

    default:
      return state;
  }
}
