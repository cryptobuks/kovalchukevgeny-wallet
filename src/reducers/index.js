import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import transactions from './transactions';
import categories from './categories';
import course from './month-course';
import user from './user';

const rootReducer = combineReducers({
  transactions, categories, course, user, toastr: toastrReducer,
});

export default rootReducer;
