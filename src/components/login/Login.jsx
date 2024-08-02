import React, {useState, useEffect} from 'react'
import style from './login.module.css'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import {index} from '../../utils/endpointIndex.js'
import { useNavigate } from 'react-router-dom'
import TOSmodal from '../../utils/TOSmodal'
import { saveUser } from '../../utils/utils'
import SimpleMessage from '../../utils/SimpleMessage'



const Login = ({isLoggedIn, setIsLoggedIn, setResponse, setProfileData, setNewUserData}) => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [openModal, setOpenModal] = useState(false);
    const [terms, setTerms] = useState(false);
    const [newUserData, setNewUserDataState] = useState(null);
    const [openErrorModal, setOpenErrorModal] = useState(false)
    const [inputError, setInputError] = useState(false)

    useEffect(() => {
      if (!terms || !newUserData) return
      const registerUser = async () => {
        fetch(index.register, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            ...newUserData,
            terms: true,
          })
        })
          .then(response => response.json())
          .then(data => {
            setProfileData(prevData => ({
              ...prevData,
              user: newUserData
            }));
            setIsLoggedIn(true);
            saveUser(newUserData, navigate) // Navigate to user profile after registration
          })
          .catch(error => {
            console.error('Error adding user:', error.message);
          });
        }
        registerUser()
      }
      , [terms, newUserData]);
      
    useEffect(()=>{console.log(loginData)},[loginData])

    const deny_acceptFunction = (accept_deny) => {
      setOpenModal(false);
      setTerms(accept_deny);
    };

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
    fetch(`${index.check_user}/${tokenData.email}`, {
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
          setNewUserDataState(userData); // Set new user data state for use in useEffect
          setOpenModal(true);
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
            const response = await fetch(index.login,{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify(loginData)
              })

              if (!response.ok) {
                // Handle response errors (e.g., status codes 400, 401, 500, etc.)
                console.error('Login failed:', response.statusText);
                setOpenErrorModal(true)
                setInputError(true)
                return;
            }

            const data = await response.json();
            console.log(data);
          
                setProfileData(prevData => ({
                    ...prevData,
                   user: data.user
                }))
                if(!response.ok) return
                setIsLoggedIn(true)
                navigate('/')
            
    } catch(e){
        console.log(e)
    }
}
    

  return (
    <div className={style.container}>
        <div className={style.login}>
            <div className={style.title}>Welcome Back!</div>
            <fieldset className={inputError ? style.fieldsetError : style.fieldset}>
                <legend className={inputError ? style.legendError : ''}>email</legend>
                <input type="text" placeholder="email" name='email' onChange={handleInputChange} className={style.inputCorrect}/>
            </fieldset>
            <fieldset className={inputError ? style.fieldsetError : style.fieldset}>
                <legend className={inputError ? style.legendError : ''}>password</legend>
                <input type="password" placeholder="password" name='password'onChange={handleInputChange} className={style.inputCorrect}/>
            </fieldset>
            <div><button className={style.button} onClick={handleLogin}>login</button></div>
            <h3>or</h3>
            <div className={style.loginBtnContainer}>
            <GoogleLogin 
            onSuccess={responseMessage} 
            onError={errorMessage} 
            scope="https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
            />
            </div>
        </div>
        {openModal && <TOSmodal deny_acceptFunction={deny_acceptFunction} />}
        {openErrorModal && <SimpleMessage message={'Incorrect email or password'} setFunction={setOpenErrorModal}/>}
    </div>
  )
}

export default Login