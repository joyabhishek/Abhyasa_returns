import React from 'react';

function DisplayHabitRender(props){


    let habitsHtml = Object.keys(props.habits).map(habitInfo => {
        let styles = {
            borderLeft: '10px solid '+ props.habits[habitInfo].color,
        }
        return(
            <div className="habit" style={styles}>
                <p>Name: {props.habits[habitInfo].name}</p>
                <p>Reminder: {props.habits[habitInfo].reminder}</p>
                <p>Days: {props.habits[habitInfo].days}</p>
                <p>Mins: {props.habits[habitInfo].mins}</p>
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
            {habitsHtml}
            <p className="signup_reminder">Wanna logout? <span onClick={props.handleLogout}>logout</span> !</p>
        </div>
    </div>
    )
}

export default DisplayHabitRender