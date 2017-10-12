import React, { Component } from 'react';
import Content from './components/content';
import Header from './components/header';
import './App.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content/>
      </div>
    );
  }
}

export default App;
