import { combineReducers } from 'redux';
import transactions from './transactions';
import categories from './categories';
import lang from './languages';

const rootReducer = combineReducers({ transactions, categories, lang });

export default rootReducer;
