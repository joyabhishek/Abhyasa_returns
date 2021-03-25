import React from 'react';

function RegisterFormRender(props){

    return (
        <div className="container">
            <div className="left">
                <div className="left_content">
                    <h1>Habit tracker</h1>
                    <p>Please Register</p>
                </div>
            </div>
            <div className="right">
                {props.errorMessage}
                <p>Firstname</p>
                <input type="text" name="firstname" value={props.firstname} onChange={props.handleChange} />
                <p>Lastname</p>
                <input type="text" name="lastname" value={props.lastname} onChange={props.handleChange}/>
                <p>Username</p>
                <input type="text" name="username" value={props.username} onChange={props.handleChange}/>
                <p>Password</p>
                <input type="password" name="password" value={props.password} onChange={props.handleChange}/>
                <p>Confirm Password</p>
                <input type="password" name="confirmpassword" value={props.confirmpassword} onChange={props.handleChange}/>
                <input type="button" value="Register" onClick={props.register}/>
                <p className="signup_reminder">Already have an account? <span onClick={props.loginClick}>login</span> !</p>
            </div>
        </div>
    )
}

export default RegisterFormRender