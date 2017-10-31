import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import StatusColumn   from './status_column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';


const progressStatus = [
  {
    value: 'ToDo',
    label: 'ToDo'
  },
  {
    value: 'InProgress',
    label: 'In Progress'
  },
  {
    value: 'Done',
    label: 'Done'
  },

];
const filterStatus = 'InProgress';
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: "5px",
  width: 250,
});



class Progress extends Component {
  componentWillMount() {
    this.props.fetchTodos();
  }
  getColumnTodos(column){
    return this.props.todos.filter((todo)=>{
      return  todo.status ===  filterStatus && todo.toDoStatus ===  column
    });
  }
  getColumnView(column){
    return (
      <Droppable droppableId={column.value} key={column.value}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            <StatusColumn
              column = {column}
              todos = {this.getColumnTodos(column.value)}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
  onDragEnd(result){
    console.log('onDragEnd',result);
  }
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
        <div className="td-progress" >
          {
            progressStatus.map(this.getColumnView.bind(this))
          }
        </div>
      </DragDropContext>
    );
  }
}
function mapStateToProps(state) {
  return {
    todos: state.todos
  };
}

Progress = connect(
  mapStateToProps,
  actions
)(Progress);

export default Progress