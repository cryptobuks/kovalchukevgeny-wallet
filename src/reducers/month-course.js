import { load } from 'redux-localstorage-simple';
import moment from 'moment';

let initialState = load({ namespace: 'e-wallet' });

if (!initialState || !initialState.course) {
  initialState = {
    course: [],
  };
}

function course(state = initialState.course, action) {
  const store = [...state];
  switch (action.type) {
    case 'ADD_MONTH-COURSE' :
      if (!store.find(course => moment(course.date).format('YYYY-MM') === moment(action.date).format('YYYY-MM'))) {
        return [
          ...store, {
            date: action.date,
            course: action.course,
          },
        ];
      }
      return store.map(course => {
        if (moment(course.date).format('YYYY-MM') === moment(action.date).format('YYYY-MM')) {
          course.course = action.course;
        }
        return course;
      });
    default:
      return state;
  }
}

export default course;
