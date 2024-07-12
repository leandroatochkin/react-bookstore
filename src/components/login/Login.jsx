import React, {useState, useEffect} from 'react'
import style from './login.module.css'
import { GoogleLogin } from '@react-oauth/google'
import { DB_login_endpoint, DB_register_endpoint, DB_checkUser_endpoint } from '../../utils/utils'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const Login = ({isLoggedIn, setIsLoggedIn, setResponse, setProfileData}) => {
    const [newUserData, setNewUserData] = useState({
      });

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()


    const responseMessage = async (response) => {
        setResponse(response);
        setIsLoggedIn(true)
        const tokenData = jwtDecode(response.credential)
        const userData = {
            id: '',
            username: tokenData.name,
            password: tokenData.jti,
            email: tokenData.email,
            name: tokenData.name,
            phone: '',
            address: '',
            city: '',
            country: '',
            picture: tokenData.picture,
            terms: null,
            purchases: [],
            settings: []
            }

        setNewUserData(userData);
            // Check if user exists
    fetch(`${DB_checkUser_endpoint}/${tokenData.email}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.exists) {
            // User exists, log them in
            setProfileData(prevData => ({
              ...prevData,
              user: data.user
            }));
            setIsLoggedIn(true);
            navigate('/');
          } else {
            // User does not exist, register them
            fetch(DB_register_endpoint, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(userData)
            })
              .then(response => response.json())
              .then(data => {
                console.log('User created successfully!');
                setProfileData(prevData => ({
                  ...prevData,
                  user: data.user
                }));
                setIsLoggedIn(true);
                navigate('/')
              })
              .catch(error => {
                console.error('Error adding user:', error.message);
              });
          }
        })
        .catch(error => {
          console.error('Error checking user existence:', error.message);
        });
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
                setIsLoggedIn(true)
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