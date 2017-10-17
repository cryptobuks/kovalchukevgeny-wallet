import { load } from 'redux-localstorage-simple';

import Constants from './../helpers/constants.js';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.lang) {
  initialState = {
    lang: 'eng',
  };
}

function transactions(state = initialState.lang, action) {
  switch (action.type) {
    case Constants.ACTIONS.CHANGE_LANGUAGE : {
      return action.lang;
    }
    default:
      return state;
  }
}

export default transactions;
