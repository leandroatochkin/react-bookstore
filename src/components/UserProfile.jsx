import React, {useEffect, useState} from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google'

const UserProfile = () => {
    // const [ user, setUser ] = useState([]);
    // const [ profile, setProfile ] = useState([]);

    // const login = useGoogleLogin({
    //     onSuccess: (codeResponse) => setUser(codeResponse),
    //     onError: (error) => console.log('Login Failed:', error)
    // });

    // useEffect(
    //     () => {
    //         if (user) {
    //                 fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })  
    //                 .then((res) => {
    //                     setProfile(res.data);
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     },
    //     [ user ]
    // );

    // const handleLogOut = () => {
    //     googleLogout();
    //     setProfile(null);
    // };


  return (
    <div>
            {/* <h2>React Google Login</h2>
            <br />
            <br />
            <button onClick={handleLogOut}>Log out</button>
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
                
            )} */}
        </div>
    );
  
}

export default UserProfile