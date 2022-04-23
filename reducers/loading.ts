import {useSelector, TypedUseSelectorHook} from 'react-redux';
import {LoadingAction} from '../actions';

export interface LoadingState {
  loading: boolean;
}

const initialState: LoadingState = {
  loading: false,
};

export interface IBookmarkReducer {
  loadingReducer: {
    loading: boolean;
  };
}

export const loadingSelector: TypedUseSelectorHook<IBookmarkReducer> =
  useSelector;

export default function loadingReducer(
  state: LoadingState = initialState,
  action: LoadingAction,
) {
  switch (action.type) {
    case 'IS_LOADING':
      return {...state, loading: !state.loading};
    default:
      return state;
  }
}
