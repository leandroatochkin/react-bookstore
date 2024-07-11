import React, {useState, useEffect} from 'react'
import style from './login.module.css'
import { GoogleLogin } from '@react-oauth/google'
import { DB_login_endpoint } from '../../utils/utils'


const Login = ({isLoggedIn, setIsLoggedIn, setResponse, setProfileData}) => {
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    useEffect(()=>{
        console.log(loginData)
    }, [loginData])

    const responseMessage = (response) => {
        setResponse(response);
        setIsLoggedIn(true)
    };
    const errorMessage = (error) => {
        console.log(error);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
          ...prevData,
          [name]: value
        }));
    };

    const handleLogin = async () => {
        try{
            fetch(DB_login_endpoint,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify(loginData)
              })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setProfileData(prevData => ({
                    ...prevData,
                   user: data.user
                }))
            })
    } catch(e){
        console.log(e)
    }
}
    

  return (
    <div className={style.container}>
        <div className={style.login}>
            <div className={style.title}>Welcome Back!</div>
            <fieldset className={style.fieldset}>
                <legend>email</legend>
                <input type="text" placeholder="email" name='email' onChange={handleInputChange}/>
            </fieldset>
            <fieldset className={style.fieldset}>
                <legend>password</legend>
                <input type="password" placeholder="password" name='password'onChange={handleInputChange}/>
            </fieldset>
            <div><button className={style.button} onClick={handleLogin}>login</button></div>
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