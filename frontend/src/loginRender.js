import React from 'react';

function LoginFormRender(props){

    return (
        <div className="container">
            <div className="left">
                <div className="left_content">
                    <h1>Habit tracker</h1>
                    <p>Please login</p>
                </div>
            </div>
            <div className="right">
                {props.errorMessage}
                <p>Username</p>
                <input type="text" name="username" value={props.username} onChange={props.handleChange}  />
                <p>Password</p>
                <input type="password" name="password" value={props.password} onChange={props.handleChange}  />
                <input type="button" value="Login" onClick={props.login}/>
                <p className="signup_reminder">Don't have an account? <span onClick={props.registerClick}>signup</span> !</p>
            </div>
        </div>
    )
}

export default LoginFormRender