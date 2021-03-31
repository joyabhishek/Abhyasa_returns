import React, { Component } from 'react';
import LogoutComp from "./logoutComp"
import HabitRender from "./habitRender"
import LoginComp from './loginComp';
import DisplayHabitRender from './DisplayHabitsRender'
import DisplayHabitComp from './DisplayHabitComp';

class HabitComp extends Component{

    constructor(){
        super()
        var d = new Date();
        this.state = {
            hname:"",
            goalmins:"",
            color:"red",
            reminder : String(d.getHours()).padStart(2,'0')  +":" +String(d.getMinutes()).padStart(2,'0'),
            frequency: [],
            errorMessage:"",
            hasHabits:null,
            logout:false,
            addHabit:null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleFreq = this.handleFreq.bind(this)
        this.habitCreate  = this.habitCreate.bind(this)
        this.handleLogout  = this.handleLogout.bind(this)
        this.showHabitsForm  = this.showHabitsForm.bind(this)
        this.showMyHabits = this.showMyHabits.bind(this)
    }

    handleLogout(){
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
                logout:output.logout
            })     
        }).catch(e => console.log(e))
    }

    handleChange(event){
        //Make sure nmbers are entered for field 
        const {name, value} = event.target
        console.log(name, value)
        this.setState({
            [name] : value
        })
        
    }

    componentDidMount(){
        fetch("/hasHabit",{
            "methods": "GET",
            "headers":{
                "content_type": "application/json",
            }
        })
        .then( response => response.json())
        .then(output => {
            console.log(output.hasHabits)
            this.setState({                
                hasHabits : output.hasHabits
            })
        })
    }

    handleFreq(event){
        //Make sure nmbers are entered for field 
        const {name} = event.target
        console.log(name)
        this.setState((pState) => {
        
        if (pState.frequency.includes(name)){
            pState.frequency.splice(pState.frequency.indexOf(name,1))
            return {frequency : [...pState.frequency]}
        }else{
            return {frequency : [...pState.frequency, name]}
        }
    })
    }


    showHabitsForm(){
        var d = new Date();
        this.setState({
            addHabit:true,
            hname:"",
            goalmins:"",
            color:"red",
            reminder : String(d.getHours()).padStart(2,'0')  +":" +String(d.getMinutes()).padStart(2,'0'),
            frequency: [],
            errorMessage:"",
        })
    }

    showMyHabits(){
        this.setState({
            addHabit:false
        })
    }

    habitCreate(){
        fetch("/addHabit", {
            "method": "POST",
            "headers":{
                "content_type":"application/json",
            },
            "body": JSON.stringify({
                name : this.state.hname,
                color : this.state.color,
                reminder : this.state.reminder,
                days : this.state.frequency,
                mins : this.state.goalmins
            })
          })
        .then(response => response.json())
        .then(output => {
            console.log(output)

            this.setState ({
                    hasHabits: output.result,
                    errorMessage: output.msg
                })                     
        })
        .catch(e => console.log(e))
    }

    render(){
        let content;
        if (this.state.logout){
            console.log("Calling login comp");
            content = <LoginComp />
        }else{
            if (this.state.hasHabits === null) {
                content =  <h1>Fetching ...</h1>
            }else{
                if (this.state.hasHabits){
                    if (!this.state.addHabit){
                        content = <div>
                        <DisplayHabitComp 
                        handleLogout = {this.handleLogout} 
                        displayHabitForm = {this.showHabitsForm}/>                        
                    </div>
                    }else{
                        content = <HabitRender 
                        hname={this.state.hname}
                        goalmins = {this.state.goalmins}
                        color={this.state.color}
                        reminder ={this.state.reminder}
                        frequency={this.state.frequency}
                        errorMessage={this.state.errorMessage}
                        handleChange = {this.handleChange}
                        handleFreq = {this.handleFreq}
                        habitCreate = {this.habitCreate}
                        handleLogout = {this.handleLogout}
                        showMyHabits = {this.showMyHabits}
                        hasHabits = {this.state.hasHabits}
                        /> 
                    }                    
                }else{
                    content = <HabitRender 
                    hname={this.state.hname}
                    goalmins = {this.state.goalmins}
                    color={this.state.color}
                    reminder ={this.state.reminder}
                    frequency={this.state.frequency}
                    errorMessage={this.state.errorMessage}
                    handleChange = {this.handleChange}
                    handleFreq = {this.handleFreq}
                    habitCreate = {this.habitCreate}
                    handleLogout = {this.handleLogout}
                    showMyHabits = {this.showMyHabits}
                    hasHabits = {this.state.hasHabits}
                    />
                }
            } 
        }
       
        return(
            <div>                
                {content}
            </div>          
        )        
    }
}

export default HabitComp