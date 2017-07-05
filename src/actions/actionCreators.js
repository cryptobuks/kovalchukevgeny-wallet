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

// add category
export function addCategory(categoryId, categoryDescription, categoryTitle) {
  return {
    type: 'ADD_CATEGORY',
    categoryId,
    categoryDescription,
    categoryTitle
  };
}

// delete category
export function deleteCategory(categoryId) {
  return {
    type: 'DELETE_CATEGORY',
    categoryId
  };
}
