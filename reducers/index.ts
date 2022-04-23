import {combineReducers} from 'redux';
import bookmarkReducer from './bookmark';
import loadingReducer from './loading';

const reducer = combineReducers({
  bookmarkReducer,
  loadingReducer,
});

export default reducer;
