function transactions(state = [], action) {
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
    ]
    default:
      return state;
  }
}

export default transactions;
