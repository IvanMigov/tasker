import {FETCH_TODOS} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TODOS:
      return [...state, ...action.payload.data];
  }

  return state;
}
