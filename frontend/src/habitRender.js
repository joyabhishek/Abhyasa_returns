import React, { Component } from 'react';
import LogoutComp from "./logoutComp"

function HabitRender(props){
    console.log(props.reminder)
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
                    {props.errorMessage}
                    <p>Name</p>
                    <input type="text" name="hname" value={props.hname} onChange={props.handleChange}/>
                    <p>Goal</p>
                    <input type="number" name="goalmins" value={props.goalmins}  min="1" max="1440" onChange={props.handleChange}/>
                    <p>Color</p>
                    <input type="radio" name="color" value="red" checked={props.color === "red"} onChange={props.handleChange}/>Red
                    <input type="radio" name="color" value="green" checked={props.color === "green"} onChange={props.handleChange}/>Green
                    <input type="radio" name="color" value="blue" checked={props.color === "blue"} onChange={props.handleChange}/>Blue
                    <input type="radio" name="color" value="yellow" checked={props.color === "yellow"} onChange={props.handleChange}/>Yellow
                    <input type="radio" name="color" value="purple" checked={props.color === "purple"} onChange={props.handleChange}/>Purple
                    <p >Frequency</p>
                    <input type="checkbox" name="Mon"  checked={props.frequency.includes("Mon") }  onChange={props.handleFreq} />Mon
                    <input type="checkbox" name="Tue"  checked={props.frequency.includes("Tue")} onChange={props.handleFreq}/>Tue
                    <input type="checkbox" name="Wed" checked={props.frequency.includes("Wed")} onChange={props.handleFreq}/>Wed
                    <input type="checkbox" name="Thurs" checked={props.frequency.includes("Thurs")} onChange={props.handleFreq}/>Thu
                    <input type="checkbox" name="Fri"  checked={props.frequency.includes("Fri")} onChange={props.handleFreq}/>Fri
                    <input type="checkbox" name="Sat"  checked={props.frequency.includes("Sat")} onChange={props.handleFreq}/>Sat
                    <input type="checkbox" name="Sun"  checked={props.frequency.includes("Sun")} onChange={props.handleFreq}/>Sun
                    <p >Reminder</p>
                    <input type="time" name="reminder" value={props.reminder} onChange={props.handleChange}/>
                    <input type="button" value="Complete" onClick={props.habitCreate}/>
                    {props.hasHabits ? <p className="signup_reminder">Go to? <span onClick={props.showMyHabits}>my habits !</span> </p> : null}
                    <p className="signup_reminder">Wanna logout? <span onClick={props.handleLogout}>logout !</span> </p>
            </div>
        </div>
        )
    
}

export default HabitRender