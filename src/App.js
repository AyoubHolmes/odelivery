import React, {Component} from 'react';
import './App.css';
import asyncComponent from './hoc/asyncComponent';
import { Route, Switch } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import firebase from './firebase';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const SignUp = asyncComponent(() => {
  return import('./Containers/SignUp/Signup')
});

const Login = asyncComponent(() => {
  return import('./Containers/Login/Login')
});

const Main = asyncComponent(() => {
  return import('./Containers/Main/Main')
});

const Client = asyncComponent(() => {
  return import('./Containers/Client/Client')
});




class App extends Component{

  state = {
    firebaseInitialized: false  
  }
  componentDidMount(){
    document.title = 'Odelivery';
    firebase.isInitialized().then(val => {
			this.setState({firebaseInitialized: val})
		})
  }

  render() {
    return this.state.firebaseInitialized !== false ? (
          <div className="App">
          <Switch>
              <Route path="/signup" exact component={SignUp} />
              <Route path="/login" exact component={Login} /> 
              <Route path="/main" component={Main} />
              <Route path="/admin" component={Client} />
              <Route path="/livreur" component={Client} />
              <Route path="/client" component={Client} />
            </Switch>
            <Redirect from="/" to="/main" />
          </div>
    ): <div id="loader"><CircularProgress /></div>;
  }  
}

export default App;