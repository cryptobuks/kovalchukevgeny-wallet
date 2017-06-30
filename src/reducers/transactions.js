import { load } from 'redux-localstorage-simple';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.transactions || !initialState.transactions.length) {
  initialState = {
    transactions: []
  };
}

function transactions(state = initialState.transactions, action) {
  let store = [...state];
  switch (action.type) {
    case 'ADD_TRANSACTION' :
    return [
      ...state, {
        startDate: action.startDate,
        money: action.money,
        transactionTitle: action.transactionTitle,
        category: action.category
      }
    ];
    default:
      return state;
  }
}

export default transactions;
