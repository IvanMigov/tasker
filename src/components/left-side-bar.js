import React from 'react';
import { Component } from 'react';
import listHorizontal from '../images/icons/list-1.svg';
import currentTodo from '../images/icons/material.svg';



export default class LeftSideBar extends Component {

  render() {
    return (
      <div className="td-left-bar" >
        <div className="td-left-bar-logo">

        </div>
        <div className="td-left-bar-content">
          <ul className="list-group">
            <li className="list-group-item active">
              <img src={listHorizontal} alt="All tasks"/>
            </li>
            <li className="list-group-item">
              <img src={currentTodo} alt="Progress"/>
            </li>
          </ul>
        </div>

      </div>
    );
  }
}
