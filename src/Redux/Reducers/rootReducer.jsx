import { combineReducers } from 'redux';
import boilerReducer from './boilerReducer';

const rootReducer = combineReducers({
  boilers : boilerReducer,
});

export default rootReducer;