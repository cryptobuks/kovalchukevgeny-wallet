import { combineReducers } from 'redux';
import transactions from './transactions';
import categories from './categories';
import lang from './languages';
import course from './month-course';

const rootReducer = combineReducers({ transactions, categories, lang, course });

export default rootReducer;
