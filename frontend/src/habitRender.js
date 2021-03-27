import React, { Component } from 'react';
import LogoutComp from "./logoutComp"

class HabitRender extends Component{

    constructor(){
        super()
        var d = new Date();
        this.state = {
            hname:"Name of habit",
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
        console.log(this.state)
        return (
            <div className="container">
            <div className="left_habit">
                <div className="left_content">
                    <h1>New Habit</h1>
                    <p>Lets fill the form and 
                        get started with our 
                        habit formation</p>
                </div>
            </div>
            <div className="right_habit">
                    <p>Name</p>
                    <input type="text" name="hname" value={this.state.hname} onChange={this.handleChange}/>
                    <p>Goal</p>
                    <input type="number" name="goalmins" value={this.state.goalmins}  min="1" max="1440" onChange={this.handleChange}/>
                    <p>Color</p>
                    <input type="radio" name="Color" value="red" checked={this.state.color === "red"} onChange={this.handleChange}/>Red
                    <input type="radio" name="Color" value="green" checked={this.state.color === "green"} onChange={this.handleChange}/>Green
                    <input type="radio" name="Color" value="blue" checked={this.state.color === "blue"} onChange={this.handleChange}/>Blue
                    <input type="radio" name="Color" value="yellow" checked={this.state.color === "yellow"} onChange={this.handleChange}/>Yellow
                    <input type="radio" name="Color" value="purple" checked={this.state.color === "purple"} onChange={this.handleChange}/>Purple
                    <p >Frequency</p>
                    <input type="checkbox" name="Mon"  checked={this.state.frequency.includes("Mon") }  onChange={this.handleFreq} />Mon
                    <input type="checkbox" name="Tue"  checked={this.state.frequency.includes("Tue")} onChange={this.handleFreq}/>Tue
                    <input type="checkbox" name="Wed" checked={this.state.frequency.includes("Wed")} onChange={this.handleFreq}/>Wed
                    <input type="checkbox" name="Thurs" checked={this.state.frequency.includes("Thurs")} onChange={this.handleFreq}/>Thu
                    <input type="checkbox" name="Fri"  checked={this.state.frequency.includes("Fri")} onChange={this.handleFreq}/>Fri
                    <input type="checkbox" name="Sat"  checked={this.state.frequency.includes("Sat")} onChange={this.handleFreq}/>Sat
                    <input type="checkbox" name="Sun"  checked={this.state.frequency.includes("Sun")} onChange={this.handleFreq}/>Sun
                    <p >Reminder</p>
                    <input type="time" name="reminder" id="reminder" value={this.state.reminder} onChange={this.handleChange}/>
                    <input type="button" value="Complete" onClick={this.habitCreate}/>
            </div>
        </div>
        )
    }
}

export default HabitRender