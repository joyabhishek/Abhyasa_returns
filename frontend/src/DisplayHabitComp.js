import React, { Component } from 'react';
import DisplayHabitRender from './DisplayHabitsRender';

class DisplayHabitComp extends Component{

constructor(){
    super()
    this.state={
        habits:{}
    }
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
        this.setState({
            habits:output
        })              
    })
    .catch(e => console.log(e))
}

render(){
    return <DisplayHabitRender 
    handleLogout={this.props.handleLogout} 
    habits={this.state.habits} 
    displayHabitForm={this.props.displayHabitForm}/>
}

}

export default DisplayHabitComp