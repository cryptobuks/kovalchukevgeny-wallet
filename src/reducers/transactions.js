import { load } from 'redux-localstorage-simple';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.transactions || !initialState.transactions.length) {
  initialState = {
    transactions: [],
  };
}

function transactions(state = initialState.transactions, action) {
  let store = [...state];
  switch (action.type) {
    case 'ADD_TRANSACTION' :
      return [
        ...state, {
          id: action.id,
          date: action.date,
          money: action.money,
          description: action.description,
          category: action.category,
        },
      ];
    case 'CHANGE_TRANSACTION' :
      store = store.map(transaction => {
        const newTransaction = transaction;
        if (transaction.id === action.id) {
          newTransaction.date = action.date;
          newTransaction.money = action.money;
          newTransaction.description = action.description;
          newTransaction.category = action.category;
          // TODO: do not add this in store
          newTransaction.active = undefined;
          newTransaction.isEdit = undefined;
        }
        return transaction;
      });
      return store;
    case 'DELETE_TRANSACTION' :
      return store.filter(transaction => transaction.id !== action.id);
    default:
      return state;
  }
}

export default transactions;
