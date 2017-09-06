import axios from 'axios';
import {FETCH_TODOS} from './types';

export function fetchTodos() {
  const request = axios.get(' http://localhost:3004/todos');

  return {
    type: FETCH_TODOS,
    payload: request
  };
}
