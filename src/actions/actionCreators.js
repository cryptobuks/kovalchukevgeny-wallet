// add transaction
export function addTransaction(startDate, money, transactionTitle, category) {
  return {
    type: 'ADD_TRANSACTION',
    startDate,
    money,
    transactionTitle,
    category
  };
}
