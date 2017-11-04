import { load } from 'redux-localstorage-simple';

import Constants from './../helpers/constants.js';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.user || !initialState.user.settings || !initialState.user.settings) {
  initialState = {
    user: {
      settings: {
        pallet: {},
        theme: 'dark',
      },
    },
  };
}

function user(state = initialState.user, action = {}) {
  const user = { ...state };
  switch (action.type) {
    case Constants.ACTIONS.CHANGE_PALLET : {
      user.settings.pallet = action.pallet;
      return user;
    }
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
