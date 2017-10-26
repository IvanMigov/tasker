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
import Progress   from './components/progress';
import LeftSideBar   from './components/left-side-bar';

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
          <Redirect exact={true} from='/' to='/todos'/>
        </Switch>
        <div className="td-progress-container">
          <Route path="/progress" component={LeftSideBar}/>
          <div className="td-progress-content">
            <Route path="/progress" component={Progress}/>
            <Route path="/progress/:ToDoId"  render={(props)=><EditToDoForm {...props} routeOnClose="/progress"/>} />
          </div>
        </div>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
