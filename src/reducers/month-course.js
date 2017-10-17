import { load } from 'redux-localstorage-simple';
import moment from 'moment';

import Constants from './../helpers/constants.js';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.course) {
  initialState = {
    course: [],
  };
}

function course(state = initialState.course, action) {
  const store = [...state];
  switch (action.type) {
    case Constants.ACTIONS.ADD_MONTH_COURSE :
      if (!store.find(course => moment(course.date).format('YYYY-MM') === moment(action.date).format('YYYY-MM'))) {
        return [
          ...store, {
            date: action.date,
            course: action.course,
          },
        ];
      }
      return store.map(course => {
        const newCourse = course;
        if (moment(course.date).format('YYYY-MM') === moment(action.date).format('YYYY-MM')) {
          newCourse.course = action.course;
        }
        return newCourse;
      });
    default:
      return state;
  }
}

export default course;
