import React, { Component } from 'react';
import RegisterFormRender from "./registerRender"
import LoginComp from "./loginComp"

class RegisterComp extends Component{
    constructor(){
        super();
        this.state = {
            
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            confirmpassword: "",
            errorMessage:"",
            showRegister:true,
            showLogin:false
        }
        
        this.register = this.register.bind(this)        
        this.loginClick = this.loginClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        var {name, value} = event.target
        this.setState({[name]: value})
    }


    loginClick(){
        this.setState({
            showLogin:true,
            showRegister:false
        })
    }

    register(){
        console.log(this.state.firstname,this.state.lastname,this.state.username,this.state.password,this.state.confirmpassword)
        //var errorMessageList = this.validateUserInput(this.state.firstname,this.state.lastname,this.state.username,this.state.password,this.state.confirmpassword)
        
            fetch("/register", {
                "method": "POST",
                "headers":{
                    "content_type":"application/json",
                },
                "body": JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    username: this.state.username,
                    password: this.state.password,
                    confirmpassword: this.state.confirmpassword
                })
              })
            .then(response => response.json())
            .then(output => {
                this.setState({
                    showRegister: !output.result,
                    showLogin: output.result,
                    errorMessage: output.msg
                })
            })
    }
    
    render(){

        if (this.state.showLogin){
            return <LoginComp />
        }
        if (this.state.showRegister){
            return (
                <RegisterFormRender 
                firstname= {this.state.firstname}
                lastname= {this.state.lastname}
                username={ this.state.username}
                password={ this.state.password} 
                confirmpassword={ this.state.confirmpassword} 
                errorMessage = {this.state.errorMessage}
                handleChange= {this.handleChange}
                register={this.register}
                loginClick={this.loginClick} 
                />
            )
        }
    }
}

export default RegisterComp