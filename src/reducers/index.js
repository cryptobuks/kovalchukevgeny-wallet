import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import transactions from './transactions';
import categories from './categories';
import lang from './languages';
import course from './month-course';

const rootReducer = combineReducers({
  transactions, categories, lang, course, toastr: toastrReducer
});

export default rootReducer;
