import {Book} from '../types/Book';

export enum ActionTypes {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  CANCEL_BOOKMARK = 'CANCEL_BOOKMARK',
  IS_LOADING = 'IS_LOADING',
}

interface IActionAddBookmark {
  type: ActionTypes.ADD_BOOKMARK;
  book: Book;
}

interface IAtionCancelBookmark {
  type: ActionTypes.CANCEL_BOOKMARK;
  book: Book;
}

interface ILoading {
  type: ActionTypes.IS_LOADING;
  loading: boolean;
}

export type BookmarkAction = IActionAddBookmark | IAtionCancelBookmark;
export type LoadingAction = ILoading;
