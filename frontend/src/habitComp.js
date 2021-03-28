import React, { Component } from 'react';
import LogoutComp from "./logoutComp"
import HabitRender from "./habitRender"

class HabitComp extends Component{

    constructor(){
        super()
        var d = new Date();
        this.state = {
            hname:"",
            goalmins:"",
            color:"red",
            reminder : d.getHours() +":" +d.getMinutes(),
            frequency: [],
            errorMessage:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleFreq = this.handleFreq.bind(this)
        this.habitCreate  = this.habitCreate.bind(this)
    }

    handleChange(event){
        //Make sure nmbers are entered for field 
        const {name, value} = event.target
        console.log(name, value)
        this.setState({
            [name] : value
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
                    errorMessage: output.msg
                })                     
        })
        .catch(e => console.log(e))
    }

    render(){
        return <HabitRender 
            hname={this.state.hname}
            goalmins = {this.state.goalmins}
            color={this.state.color}
            reminder ={this.state.reminder}
            frequency={this.state.frequency}
            errorMessage={this.state.errorMessage}
            handleChange = {this.handleChange}
            handleFreq = {this.handleFreq}
            habitCreate = {this.habitCreate}
        />
    }
}

export default HabitComp