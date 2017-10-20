import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import './index.css';
import './css/main.css';
import './App.css';
import Content from './components/content';
import Header from './components/header';
import Modal from './components/modal';
import EditToDoForm   from './components/edit-todo';

import reducers from './reducers';
import Async from './middlewares/async';

import registerServiceWorker from './registerServiceWorker';


const createStoreWithMiddleware = applyMiddleware(Async)(createStore);
const store = createStoreWithMiddleware(reducers);
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
          <Header/>
          <Modal/>
          <Switch>
            <Redirect from='/todos/0' to='/todos'/>
            <Route path="/todos/:ToDoId" component={Content(EditToDoForm)}/>
            <Route path="/todos" component={Content()}/>
            <Redirect from='/' to='/todos'/>
          </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
