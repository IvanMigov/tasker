import {FETCH_TODO_BY_ID} from '../actions/types';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_TODO_BY_ID:
      return action.payload.data;
  }

  return state;
}
