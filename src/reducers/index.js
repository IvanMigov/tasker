import { combineReducers } from 'redux';
import todosReducer from './todos';
import currentTodo from './current_todo';

const rootReducer = combineReducers({
  todos: todosReducer,
  todos: currentTodo

});

export default rootReducer;
