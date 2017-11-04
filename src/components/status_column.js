import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import TodoItemColumn   from './todo_item_column';
import { Droppable } from 'react-beautiful-dnd';

// const getListStyle = (isDraggingOver) => {
//
//   // console.log('args',isDraggingOver);
//   return {
//     borderColor: isDraggingOver ? '#3b73af' : 'transparent',
//     background: isDraggingOver ? '#f3f9f4' : '#f5f5f5',
//
//     // padding: "5px"
//     // width: 250,
//   }
// };



class StatusColumn extends Component {

  getListStyle(isDraggingOver) {
    const notTheSource =  this.props.droppableId && this.props.column.value !== this.props.droppableId
    return {
      borderColor: notTheSource ? '#3b73af' : 'transparent',
      background: isDraggingOver && notTheSource ? '#f3f9f4' : '#f5f5f5',
    }
  }
  getClassName() {
    return `td-column td-${this.props.column.value}`;
  }
  getTodoView(todo,i) {
    return (
      <TodoItemColumn
        index={i}
        key={todo.id}
        todo={todo}
      />
    );
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <Droppable droppableId={this.props.column.value} key={this.props.column.value}>
          {(provided, snapshot) => (
            <div
              className="td-column-list"
              ref={provided.innerRef}
              style={this.getListStyle.bind(this)(snapshot.isDraggingOver)}
            >
              {
                this.props.todos.map(this.getTodoView.bind(this))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

StatusColumn = connect(
  null,
  actions
)(StatusColumn);

export default StatusColumn