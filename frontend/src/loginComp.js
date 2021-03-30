import React, { Component } from 'react';
import LoginFormRender from "./loginRender"
import RegisterComp from './registerComp';
import LogoutComp from "./logoutComp";
import HabitComp from "./habitComp"

class LoginComp extends Component{
    constructor(){
        super();
        this.state = {         
            username: "",
            password: "",
            errorMessage:"",
            showRegister:false,
            showLogin:true
        }
        this.registerClick = this.registerClick.bind(this)
        this.login = this.login.bind(this)     
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        var {name, value} = event.target
        this.setState({[name]: value})
    }

    login(){
        fetch("/login", {
            "method": "POST",
            "headers":{
                "content_type":"application/json",
            },
            "body": JSON.stringify({
              username: this.state.username,
              password: this.state.password
            })
          })
        .then(response => response.json())
        .then(output => {
            console.log(output)
            if (output.login){
                this.setState( {
                    showLogin: false
                })
            }else{
                this.setState ({
                    showLogin: true,
                    errorMessage: output.msg
                })
            }          
        })
        .catch(e => console.log(e))
    }

    registerClick(){
        this.setState({
            showLogin:false,
            showRegister:true
        })
    }
    
    render(){
            console.log("Am i getting called ?")
            if (this.state.showLogin){
                return(
                    <LoginFormRender 
                    username={ this.state.username}
                    password={ this.state.password} 
                    login={this.login}
                    registerClick={this.registerClick}
                    errorMessage = {this.state.errorMessage}
                    handleChange= {this.handleChange}
                    />
                )
            }else if (this.state.showRegister){
                return (
                    <RegisterComp />
                )
            }else{
                return <HabitComp />
            }
        

    }
}

export default LoginComp