import React, { Component } from 'react'
import './App.css';
import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom"
import Home from "./views/Layout/Index"
import Login from "./views/Login/Index"
import { authLogin } from './utils/auth';

export default class App extends Component {
  render() {
    
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/" exact render={(props)=>{
              return <Redirect to="/index"></Redirect>
            }}></Route>

            <Route path="/index" render={(props)=>{
              if(!authLogin()){
                return <Redirect to="/login"></Redirect>
                // return <Login {...props}></Login>
              }else{
                return <Home {...props}></Home>
              }
            }}></Route>

            <Route path="/login" render={(props)=>{
              if(authLogin()){
                return <Redirect to="/index/home"></Redirect>
              }else{
                return <Login {...props}></Login>
              }
            }}></Route>

          </Switch>
        </Router>
        
      </div>
    )
  }
}
