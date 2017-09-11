import React from 'react';
import { Component } from 'react';
import LeftSideBar   from './left-side-bar';
import ToDoList   from './todo_list';
import EditToDo   from './edit-todo';



export default class Content extends Component {

  render() {
    return (
      <div className="td-content" >
        <LeftSideBar/>
        <ToDoList/>
      </div>
    );
  }
}
