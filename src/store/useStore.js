import {create} from 'zustand';

const useStore = create((set)=>({
    profileData: null,
    setProfileData: (data) => set({ profileData: data }),
    isLoggedIn: false,
    setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}))

export default useStore