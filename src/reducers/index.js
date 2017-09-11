import { combineReducers } from 'redux';
import todosReducer from './todos';
import currentTodo from './current_todo';

const rootReducer = combineReducers({
  todos: todosReducer,
  todo: currentTodo

});

export default rootReducer;
