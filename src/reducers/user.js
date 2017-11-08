import { load } from 'redux-localstorage-simple';

import Constants from './../helpers/constants.js';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.user || !initialState.user.settings) {
  initialState = {
    user: {
      settings: {
        pallet: {
          name: 'volta',
          alias: 'volta',
          background: '#842448',
          startColor: '#c04848',
          endColor: '#480048',
        },
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
      user.settings.theme = action.theme;
      return user;
    }
    default:
      return state;
  }
}

export default user;
