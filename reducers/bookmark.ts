import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {Book} from '../types/Book';
import {BookmarkAction} from '../actions';

interface IBookmarkState {
  books: Map<string, Book>;
}

const initialState: IBookmarkState = {
  books: new Map(),
};

export interface IBookmarkReducer {
  bookmarkReducer: {
    books: Map<string, Book>;
  };
}

export const bookmarkSelector: TypedUseSelectorHook<IBookmarkReducer> =
  useSelector;

export default function bookmarkReducer(
  state: IBookmarkState = initialState,
  action: BookmarkAction,
) {
  const {books} = state;
  const {book} = action;
  const newBooks = new Map(JSON.parse(JSON.stringify(Array.from(books))));

  switch (action.type) {
    case 'ADD_BOOKMARK':
      newBooks.set(book.isbn13, book);
      return {...state, books: newBooks};
    case 'CANCEL_BOOKMARK':
      newBooks.delete(book.isbn13);
      return {...state, books: newBooks};
    default:
      return state;
  }
}
