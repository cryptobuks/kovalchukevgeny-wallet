import { load } from 'redux-localstorage-simple';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.lang) {
  initialState = {
    lang: 'eng'
  };
}

function transactions(state = initialState.lang, action) {
  let store = [...state];
  switch (action.type) {
    case 'CHANGE_LANGUAGE' :
    return store = action.lang;
    default:
      return state;
  }
}

export default transactions;
