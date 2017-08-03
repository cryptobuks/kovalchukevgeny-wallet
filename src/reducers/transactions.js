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
        id: action.id,
        startDate: action.startDate,
        money: action.money,
        description: action.description,
        category: action.category
      }
    ];
    case 'DELETE_TRANSACTION' :
      return store.filter(transaction => transaction.id !== action.transactionId);
    default:
      return state;
  }
}

export default transactions;
