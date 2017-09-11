import axios from 'axios';
import {FETCH_TODOS,SET_CURRENT_TODO} from './types';

export function fetchTodos() {
  const request = axios.get(' http://localhost:3004/todos');

  return {
    type: FETCH_TODOS,
    payload: request
  };
}
export function SetToDo(todo) {
  return {
    type: SET_CURRENT_TODO,
    payload: todo
  };
}
