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
    case 'CHANGE_TRANSACTION' :
    store = store.map(transaction => {
      if(transaction.id === action.id) {
        transaction.startDate = action.startDate;
        transaction.money = action.money;
        transaction.description = action.description;
        transaction.category = action.category;
        // TODO: do not add this in store
        transaction.active = undefined;
        transaction.isEdit = undefined;
      }
      return transaction;
    });
    return store;
    case 'DELETE_TRANSACTION' :
      return store.filter(transaction => transaction.id !== action.transactionId);
    default:
      return state;
  }
}

export default transactions;
