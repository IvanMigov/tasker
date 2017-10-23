import React from 'react';
import { Component } from 'react';
import { NavLink  } from 'react-router-dom'
import listHorizontal from '../images/icons/list-1.svg';
import currentTodo from '../images/icons/material.svg';



export default class LeftSideBar extends Component {

  render() {
    return (
      <div className="td-left-bar">
        <div className="td-left-bar-logo">

        </div>
        <div className="td-left-bar-content">
          <ul className="list-group">
            <NavLink activeClassName="active" to='/todos'>
              <li className="list-group-item">
                <img src={listHorizontal} alt="All tasks"/>
              </li>
            </NavLink >
            <NavLink activeClassName="active" to='/progress'>
              <li className="list-group-item">
                <img src={currentTodo} alt="Progress"/>
              </li>
            </NavLink >
          </ul>
        </div>

      </div>
    );
  }
}
