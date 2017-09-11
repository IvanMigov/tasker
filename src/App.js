import React, { Component } from 'react';
import Content from './components/content';
import Header from './components/header';
import './App.css';

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
