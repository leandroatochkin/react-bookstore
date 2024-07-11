import React from 'react'
import style from './login.module.css'
import { GoogleLogin } from '@react-oauth/google'


const Login = ({isLoggedIn, setIsLoggedIn, setResponse}) => {
    const responseMessage = (response) => {
        setResponse(response);
        setIsLoggedIn(true)
    };
    const errorMessage = (error) => {
        console.log(error);
    };
    

  return (
    <div className={style.container}>
        <div className={style.login}>
            <div className={style.title}>Welcome Back!</div>
            <fieldset className={style.fieldset}>
                <legend>username or email</legend>
                <input type="text" placeholder="username or email" />
            </fieldset>
            <fieldset className={style.fieldset}>
                <legend>password</legend>
                <input type="password" placeholder="password" />
            </fieldset>
            <div><button className={style.button}>login</button></div>
            <h3>or</h3>
            <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage} 
            scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
            />
        </div>
    </div>
  )
}

export default Login