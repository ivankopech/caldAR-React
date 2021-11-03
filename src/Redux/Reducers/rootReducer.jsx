import { combineReducers } from 'redux';
import technicianReducer from './technicianReducer';

const rootReducer = combineReducers({
  technicians : technicianReducer,
});

export default rootReducer;
