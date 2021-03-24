import React, { Component } from 'react';
import LoginComp from './loginComp';
import LogoutComp from "./logoutComp"

class App extends Component{

    constructor(){
      super()
      this.state = {
        loggedIn: null
      }
      //this.loggedIn = this.loggedIn.bind(this)
    }

    componentDidMount(){
      fetch("/isUserLoggedIn", {
        "method": "GET",
        "headers":{
            "content_type":"application/json",
        }
      })
    .then(response => response.json())
    .then(output => {
        console.log(output.loggedIn)
        this.setState({
          loggedIn: output.loggedIn        
        }) 
    }).catch(e => console.log(e))
    }

    render(){
      if (this.state.loggedIn === null){
        return <h1>Fetching ...</h1>
      }else if(this.state.loggedIn){
          return <LogoutComp />
      }else{
        return <LoginComp />      
      }
    }
}

export default App;
