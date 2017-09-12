import axios from 'axios';
import {FETCH_TODOS,FETCH_TODO_BY_ID} from './types';

const requestUrl = 'http://localhost:3004/todos';

export function fetchTodos() {
  const request = axios.get(requestUrl);

  return {
    type: FETCH_TODOS,
    payload: request
  };
}
export function GetToDo(id) {
  const request = axios.get(`${requestUrl}/${id}`);

  return {
    type: FETCH_TODO_BY_ID,
    payload: request
  };
}
