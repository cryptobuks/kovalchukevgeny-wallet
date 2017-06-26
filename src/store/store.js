import {createStore, applyMiddleware} from 'redux';
import rootReducer from './../reducers/index';

const defaultState = {

};

const store = createStore(rootReducer, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
