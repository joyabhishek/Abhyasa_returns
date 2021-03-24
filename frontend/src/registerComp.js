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
            errorMessage:[],
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

    userExists(username){
        return fetch("/userexists", {
            "method": "POST",
            "headers":{
                "content_type":"application/json",
            },
            "body": JSON.stringify({
              username: username
            })
          })
        .then(response => response.json())
        .then(output => {
            console.log(output)
            return output.Exists
            
        }) 
    }

    validateUserInput(firstname,    lastname,    username,    password,    confirmpassword){
        var errorMessageList = []
        if (firstname === "" || lastname === "" || username==="" || password === "" || confirmpassword ===""){
            errorMessageList.push('All the fields are compulsory')
        }else if(this.userExists(username)){
            errorMessageList.push(username + ' username already taken')
        }else if(! (password === confirmpassword)){
            errorMessageList.push('Password and confirm password are not similar')
        }
        return errorMessageList
    }

    loginClick(){
        this.setState({
            showLogin:true,
            showRegister:false
        })
    }

    register(){
        console.log(this.state.firstname,this.state.lastname,this.state.username,this.state.password,this.state.confirmpassword)
        var errorMessageList = this.validateUserInput(this.state.firstname,this.state.lastname,this.state.username,this.state.password,this.state.confirmpassword)
        if(errorMessageList.length === 0){
            fetch("/register", {
                "method": "POST",
                "headers":{
                    "content_type":"application/json",
                },
                "body": JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    username: this.state.username,
                    password: this.state.password
                })
              })
            .then(response => response.json())
            .then(output => {
                this.setState({
                    showRegister: !output.register,
                    showLogin: output.register
                })
            })
        }else{
            this.setState({
                errorMessage : [...errorMessageList]
            })
        }

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