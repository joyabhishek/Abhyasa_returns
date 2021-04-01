import React from 'react';

function DisplayHabitRender(props){


    let habitsHtml = Object.keys(props.habits).map(habitInfo => {
        let styles = {
            borderLeft: '10px solid '+ props.habits[habitInfo].color,
        }
        return(
            <div className="habit" style={styles} key={props.habits[habitInfo].id} >
                <div>
                    <p>Name: {props.habits[habitInfo].name}</p>
                    <p>Reminder: {props.habits[habitInfo].reminder}</p>
                    <p>Days: {props.habits[habitInfo].days}</p>
                    <p>Goal: {props.habits[habitInfo].mins} mins</p>
                </div>
                <button className="habitDeleteButton" onClick={() => {props.deleteHabit(props.habits[habitInfo].id)}}>Delete</button>
            </div>
            
        )
    })

    return(
        <div className="myHabitcontainer">
        <div className="heading">
            <h2>My Habits</h2>
            <button onClick={props.displayHabitForm}>Add Habit +</button>
        </div>
        <div className="habits">
            {props.message?<p>{props.message}</p> : null}
            {habitsHtml}
            <p className="signup_reminder">Wanna logout? <span onClick={props.handleLogout}>logout</span> !</p>
        </div>
    </div>
    )
}

export default DisplayHabitRender