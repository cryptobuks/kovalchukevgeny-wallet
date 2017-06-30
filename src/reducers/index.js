import { combineReducers } from 'redux';
import transactions from './transactions';

const rootReducer = combineReducers({ transactions });

export default rootReducer;
