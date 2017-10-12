import {FETCH_TODOS,REORDER_TODOS} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TODOS:
      return [...action.payload.data];
    case REORDER_TODOS:
      // debugger;
      const {dragIndex,hoverIndex} = action.payload;
      let todos = [...state];
      let element = todos[dragIndex];
      todos.splice(dragIndex, 1);
      todos.splice(hoverIndex, 0, element);
      return todos;
    default:
      return state;
  }

}
