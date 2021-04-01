import React, { Component } from 'react';
import DisplayHabitRender from './DisplayHabitsRender';

class DisplayHabitComp extends Component{

constructor(){
    super()
    this.state={
        habits:{},
        message:null
    }
    this.deleteHabit = this.deleteHabit.bind(this)
}

deleteHabit(habitId){
    fetch("/deleteHabit", {
        "method": "POST",
        "headers":{
            "content_type":"application/json",
        },
        "body": JSON.stringify({
            habitId : habitId
        })
      })
    .then(response => response.json())
    .then(output => {
        console.log(output)
        if (output.result){
            this.setState ({
                message: "Deleted habbit",
                habits:output.habits
            }) 
        }else{
            this.setState ({
                message: "Habit not deleted"
            })
        }
                            
    })
    .catch(e => console.log(e))
}

componentDidMount(){
    fetch("/fetchHabit", {
        "method": "GET",
        "headers":{
            "content_type":"application/json",
        }
      })
    .then(response => response.json())
    .then(output => {
        console.log(output) 
        if (Object.keys(output).length == 0){
            this.setState({
                habits:output,
                message:"No habits available..."
            })
        }else{
            this.setState({
                habits:output,
                message:null
            })
        }
                      
    })
    .catch(e => console.log(e))
}

render(){
   
        return <DisplayHabitRender 
        handleLogout={this.props.handleLogout} 
        habits={this.state.habits} 
        displayHabitForm={this.props.displayHabitForm}
        message={this.state.message}
        deleteHabit={this.deleteHabit}/>
    

}

}

export default DisplayHabitComp