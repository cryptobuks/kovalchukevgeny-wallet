import { load } from 'redux-localstorage-simple';

import Constants from './../helpers/constants.js';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.categories || !initialState.categories.length) {
  initialState = {
    categories: [],
  };
}

function categories(state = initialState.categories, action) {
  let store = [...state];
  switch (action.type) {
    case Constants.ACTIONS.ADD_CATEGORY:
      return [
        ...state, {
          id: action.id,
          description: action.description,
          title: action.title,
          icon: action.icon,
          filter: action.filter,
          color: action.color,
        },
      ];
    case Constants.ACTIONS.UPDATE_CATEGORY:
      store = store.map(category => {
        const updatedCategory = category;
        if (category.id === action.id) {
          updatedCategory.description = action.description;
          updatedCategory.title = action.title;
          updatedCategory.icon = action.icon;
          updatedCategory.filter = action.filter;
          updatedCategory.color = action.color;
        }
        return category;
      });
      return store;
    case Constants.ACTIONS.CHANGE_ALL_CATEGORIES:
      return action.categories;
    case Constants.ACTIONS.DELETE_CATEGORY:
      return store.filter(category => category.id !== action.id);
    default:
      return state;
  }
}

export default categories;
