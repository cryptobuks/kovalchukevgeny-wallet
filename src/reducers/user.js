import { load } from 'redux-localstorage-simple';

import Constants from './../helpers/constants.js';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.theme) {
  initialState = {
    settings: {
      theme: 'dark',
    },
  };
}

function user(state = initialState, action) {
  switch (action.type) {
    case Constants.ACTIONS.CHANGE_THEME: {
      return {
        settings: {
          theme: action.theme,
        },
      };
    }
    default:
      return state;
  }
}

export default user;
