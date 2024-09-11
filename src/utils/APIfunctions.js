import { index } from "./endpointIndex"
import { saveUser } from "./utils"
import { jwtDecode } from 'jwt-decode'
import { v4 } from "uuid"

const uuid = v4()


/*----------------------FAVORITES------------------------*/

export const loadFavs = async (user, setBooks) =>{
    if (user && user.favs && user.favs.length > 0) {
      const fetchBooks = async () => {
        const favs = user.favs.map(id => `${id}`).join(',');
        try {
          const endpoint = `${index.favorites}?ids=${favs}`
          const response = await fetch(endpoint);
          const data = await response.json();
          setBooks(data);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchBooks();
    }
}

export const removeFav = async (user, book) => {

    fetch(`${index.delete_fav}`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            email: user.email,
            book_id: book.id
            })
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err=>console.log(err))
}

export const addFav = async (user, book, state,  setState) => {

    if(!user) return
      setState(!state)
          fetch(`${index.add_to_favs}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                email: user.email,
                book_id: book.id
                })
          })
          .then(res => res.json())
          .then(data => console.log(data))
          .catch(err=>console.log(err))
}

/*----------------------LOGIN & REGISTER------------------------*/

export const registerUser = async (newUserData, terms, setProfileData, setIsLoggedIn, setMsgModal) => {
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
        saveUser(newUserData) // Navigate to user profile after registration
      })
      .catch(error => {
        console.error('Error adding user:', error.message);
        setMsgModal ? setMsgModal(true) : null;
      });
}

export const loginUser = async ( loginData, setOpenErrorModal, setInputError, setProfileData, setIsLoggedIn) => {
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
          
                setProfileData(prevData => ({
                    ...prevData,
                   user: data.user
                }))
                if(!response.ok) return
                setIsLoggedIn(true)
                saveUser(data.user)
    } catch(e){
        console.log(e)
    }
}

export const submitNewUser = async (newUserData, setMessage, setOpenModal) => {
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
          setMessage('User created successfully!');
          setOpenModal(true);
        })
        .catch(error => {
          console.error('Error adding user:', error.message);
          setMessage('Error creating user!');
          setOpenModal(true);
        });
}

export const deleteUser = async(user, setErrorMsg, setOpenModal) => {
  fetch(`${index.delete_user}/${user._id}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error deleting user:', error.message);
      setErrorMsg('Error deleting user. Try Again Later.')
      setOpenModal(true)
    });
}

export const updateUser = async(user, updatedData, setErrorMsg, setOpenModal) => {
  fetch(`${index.update_user}/${user._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(updatedData)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const updatedProfile = { ...user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(updatedProfile));
    })
    .catch(error => {
      console.error('Error updating user:', error.message);
      setErrorMsg('Error updating user. Try Again Later.')
      setOpenModal(true)
    });
}

export const decodeGoogleResponse = (response, setNewUserData, setProfileData, setIsLoggedIn, navigate, setNewUserDataState, setOpenModal, setError, setMsgModal) => {
  const tokenData = jwtDecode(response.credential);
    const userData = {
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
      settings: [],
      favs: [],
    };

    setNewUserData(userData);

    // Check if user exists
    fetch(`${index.check_user}/${tokenData.email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists) {
          // User exists, log them in
          setProfileData((prevData) => ({
            ...prevData,
            user: data.user,
          }));
          saveUser(data.user);
          navigate('/')
          setIsLoggedIn(true);
          
        } else {
          setNewUserDataState(userData); // Set new user data state for use in useEffect
          setOpenModal(true);
        }
      })
      .catch((error) => {
        console.error('Error checking user existence:', error.message);
        setError ? setError("There's an error with our server. Please, try again later.") : null
        setMsgModal ? setMsgModal(true) : null
      });
}

/*----------------------BOOKS------------------------*/

export const  fetchBooks = async (setData, setError, setLoading) => {
  try {
    const response = await fetch(index.books);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    setData(result);
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
  }
};
