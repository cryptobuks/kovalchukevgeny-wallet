import { combineReducers } from 'redux';
import transactions from './transactions';
import categories from './categories';

const rootReducer = combineReducers({ transactions, categories });

export default rootReducer;
