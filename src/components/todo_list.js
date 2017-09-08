import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TodoItemLong   from './todo_item_long';

class ToDoList extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }

  renderTodo(todo) {
    return (
      <TodoItemLong todo={todo}/>
    );
  }

  render() {
    return (
      <div className="todo-list">
        {
          this.props.todos.map(this.renderTodo)
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps, actions)(ToDoList);
