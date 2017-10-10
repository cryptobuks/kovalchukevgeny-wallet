import { load } from 'redux-localstorage-simple';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.lang) {
  initialState = {
    lang: 'eng',
  };
}

function transactions(state = initialState.lang, action) {
  switch (action.type) {
    case 'CHANGE_LANGUAGE' : {
      return action.lang;
    }
    default:
      return state;
  }
}

export default transactions;
