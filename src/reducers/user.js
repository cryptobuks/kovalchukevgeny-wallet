import { load } from 'redux-localstorage-simple';

import Constants from './../helpers/constants.js';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.user || !initialState.user.settings || !initialState.user.settings.pallet) {
  initialState = {
      user: {
          settings: {
            pallet: {}
        }
      }
  }
}

function user(state = initialState.user, action = {}) {
  let user = {...state};
  switch (action.type) {
    case Constants.ACTIONS.CHANGE_PALLET : {
      user.settings.pallet = action.pallet;
      return user;
    }
    default:
      return state;
  }
}

export default user;
