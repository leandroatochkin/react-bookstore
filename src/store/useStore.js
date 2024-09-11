import {create} from 'zustand';

const books = create((set) => ({
  books: [],
  setBooks: ()=> set((state)=>({counter: state.counter + 1}))
 }));

export default useStore;
