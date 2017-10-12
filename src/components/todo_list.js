import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import * as actions from '../actions';
import TodoItemLong   from './todo_item_long';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


class ToDoList extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }
  constructor(props) {
    super(props);

    this.state = {
      activeTodo: props.match.params.ToDoId
    };
  }
  getClassName(id){
    let className = '';
    if(id && this.state.activeTodo){
      className = id.toString() === this.state.activeTodo.toString() ? 'td-active' : '';
    }
    return className;
  }
  setActive(id){
    this.setState({activeTodo: id});
    this.props.GetToDo(id);
  }
  moveTodo(dragIndex, hoverIndex) {
    // const { todos } = this.props;
    // const dragTodo = todos[dragIndex];
    console.log('dragIndex',dragIndex);
    console.log('hoverIndex',hoverIndex);
    this.props.reorderTodos(dragIndex,hoverIndex);


    // this.setState(update(this.state, {
    //   cards: {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, dragCard],
    //     ],
    //   },
    // }));
  }
  pinTodo(dragIndex, hoverIndex) {
    // const { todos } = this.props;
    // const dragTodo = todos[dragIndex];
    console.log('pinTodo dragIndex',dragIndex);
    console.log('pinTodo hoverIndex',hoverIndex);

    // this.setState(update(this.state, {
    //   cards: {
    //     $splice: [
    //       [dragIndex, 1],
    //       [hoverIndex, 0, dragCard],
    //     ],
    //   },
    // }));
  }

  renderTodo(todo,i) {
    return (
      <Link
        to={{ pathname: `/todos/${todo.id }`}}
        key={todo.id}
        className={this.getClassName(todo.id)}
      >
        <TodoItemLong
          todo={todo}
          fireOnClick = {this.setActive.bind(this)}
          index={i}
          id={todo.id}
          moveTodo={this.moveTodo.bind(this)}
          pinTodo={this.pinTodo.bind(this)}

        />
      </Link>
    );
  }

  render() {
    return (
      <div className="todo-list">
        {
          this.props.todos.map(this.renderTodo.bind(this))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    todos: state.todos

  };
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, actions)(ToDoList));
