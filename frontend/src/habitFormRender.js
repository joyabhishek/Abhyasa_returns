import React from 'react';

function HabitFormRender(){
    return (
        <div className="container">
            <div className="left_habit">
                <div className="left_content">
                    <h1>New Habit</h1>
                    <p>Lets create a new habit ...</p>
                </div>
            </div>
            <div className="right_habit">
                    <p>Name</p>
                    <input type="text" placeholder="Name of habit" />
                    <p>Goal</p>
                    <input type="text" placeholder="Mins of practise" />
                    <p>Color</p>
                    <input type="radio" name="Color" id="red" />Red
                    <input type="radio" name="Color" id="green"/>Green
                    <input type="radio" name="Color" id="blue"/>Blue
                    <input type="radio" name="Color" id="yellow"/>Yellow
                    <input type="radio" name="Color" id="purple"/>Purple
                    <p >Frequency</p>
                    <input type="checkbox" name="Mon" id="Mon"/>Mon
                    <input type="checkbox" name="Mon" id="Mon"/>Tue
                    <input type="checkbox" name="Mon" id="Mon"/>Wed
                    <input type="checkbox" name="Mon" id="Mon"/>Thu
                    <input type="checkbox" name="Mon" id="Mon"/>Fri
                    <input type="checkbox" name="Mon" id="Mon"/>Sat
                    <input type="checkbox" name="Mon" id="Mon"/>Sun
                    <p >Reminder</p>
                    <input type="datetime-local" name="reminder" id="reminder"/>
                    <input type="button" value="Complete"/>
            </div>
        </div>
    )
}

export default HabitFormRender