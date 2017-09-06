import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class ToDoList extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }

  renderTodo(todo) {
    return (
      <div className="card card-block" key={todo.id}>
        <h4 className="card-title">{todo.title}</h4>
        <p className="card-text">{todo.description}</p>
      </div>
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
