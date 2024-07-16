import {create} from 'zustand';

const useStore = create((set) => ({
  profileData: JSON.parse(localStorage.getItem('user')) || null,
  isLoggedIn: false,
  setProfileData: (data) =>{
    console.log(data)
    set(prevData => ({...prevData,
        user: data.user,
    }))
    console.log('profiledata:', profileData)
  },
  setIsLoggedIn: (status) => {
    console.log('Setting login status:', status);
    set({ isLoggedIn: status });
  },
}));

export default useStore;
