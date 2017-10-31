import React from 'react';
import {connect} from 'react-redux';
import { Component } from 'react';
import * as actions from '../actions';
import StatusColumn   from './status_column';
import { DragDropContext } from 'react-beautiful-dnd';

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



class Progress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      droppableId: null
    };
  }
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
      <StatusColumn
        column = {column}
        todos = {this.getColumnTodos(column.value)}
        key = {column.value}
        droppableId = {this.state.droppableId}
      />
    );
  }
  getIndexAfterDrop(column,index){
    const todos = this.props.todos,
      todosInColumn = this.getColumnTodos(column);
    let placeBefore = true;

    if (index) {
      placeBefore = false;
    }

  }
  onDragStart(result){
    this.setState({droppableId: result.source.droppableId});
    console.log('onDragStart',result);
  }
  onDragEnd(result){
    console.log('onDragEnd',result);
    if(result.destination){
      const id = result.draggableId,
        toDoStatus = result.destination.droppableId,
        todo = this.props.todos.find((todo)=>{return todo.id === id});

      this.setState({droppableId: null});


      this.props.saveToDoWithoutChangimgState({...todo,...{toDoStatus}},()=>{
        this.props.fetchTodos()
      });
    }


  }
  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd.bind(this)}
        onDragStart={this.onDragStart.bind(this)}

      >
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