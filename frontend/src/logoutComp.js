import React, { Component } from 'react';
import LoginComp from "./loginComp"

class LogoutComp extends Component{
    
    constructor(){
        super();
        this.state = {
            loggedIn: true
        }
        this.logout = this.logout.bind(this)
    }

    logout(){
         fetch("/logout", {
            "method": "GET",
            "headers":{
                "content_type":"application/json",
            }
          })
        .then(response => response.json())
        .then(output => {
            console.log(output.logout)                
            this.setState({
                loggedIn:!output.logout
            })     
        }).catch(e => console.log(e))

        
    }

    render(){
        if (this.state.loggedIn){
            return (
                <div>
                    <h1>Logged In</h1>
                    <button onClick={this.logout}>Log OUT</button>
                </div>
            )
        }else{
            return <LoginComp />
        }
        
    }
}

export default LogoutComp