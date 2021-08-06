import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';

import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';

import store from './store';

import PrivateRoutes from './components/common/PrivateRoutes';

import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { logoutUser, setCurrentUser } from './actions/authAction';
import { clearCurrentProfile } from './actions/profileActions';
import EditProfile from './components/edit-profile/EditProfile';
import addExp from './components/add-Credentials/addExp';
import addEdu from './components/add-Credentials/addEdu';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile'
import NotFound from './components/not-found/NotFound';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PostItem from './components/posts/PostItem';
import News from './components/TechNews/News'


// check for token
if(localStorage.jwtToken){
  // set the header of auth
  setAuthToken(localStorage.jwtToken)
  // decode token and get user info
  const decoded = jwt_decode(localStorage.jwtToken)
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded))

  // check for expired token
  const currentTime = Date.now()/1000
  if(decoded.exp < currentTime){
    // Logout user
    store.dispatch(logoutUser());
    // TODO: clr current prof
    store.dispatch(clearCurrentProfile())
    // redirect to login
    window.location.href = '/login'
  }
}

class App extends Component{
  
  render(){
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/">
              <Landing />
            </Route>
            <div className="container">
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Switch>
                <PrivateRoutes component={Dashboard} exact path="/dashboard" />
              </Switch>
              <Switch>
                <PrivateRoutes component={CreateProfile} exact path="/create-profile" />
              </Switch>
              <Switch>
                <PrivateRoutes component={EditProfile} exact path="/edit-profile" />
              </Switch>
              <Switch>
                <PrivateRoutes component={addExp} exact path="/add-experience" />
              </Switch>
              <Switch>
                <PrivateRoutes component={addEdu} exact path="/add-education" />
              </Switch>
              <Route exact path="/profiles">
                <Profiles />
              </Route>
              <Route exact path="/profile/:handle" render={(props) =>  <Profile {...props} />} />
              <Switch>
                <PrivateRoutes component={Posts} exact path="/feed" />
              </Switch>
              <Switch>
                <PrivateRoutes component={Post} exact path="/post/:id" />
              </Switch>
              <Switch>
                <PrivateRoutes component={News} exact path="/news" />
              </Switch>
              <Route exact path="/not-found">
                <NotFound />
              </Route>
            </div>
            <footer><Footer /></footer>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
