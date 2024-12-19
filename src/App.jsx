import { createContext, useState } from 'react';
import './App.css'
import * as authService from './services/authService';
import { Link, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Signin } from './pages/Signin/Signin';

export const AuthedUserContext = createContext({user: null, token: null }) ; // Set the initial value of the context to null

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const [token, setToken] = useState(localStorage.getItem('token')); //for conditional rendering. This ensures its always revalidated.

  const handleSignout = () => {
    authService.signout();
    setUser(null);
    setToken(null); //this will clear the token state
    localStorage.removeItem('token');  //ensures the token is fully cleared. we can re-fetch from localStorage after setUser(null).
  };

  return (
    <AuthedUserContext.Provider value={{user, token}}>
      <Link to="/auth/signin">Sign In</Link>
      <Link to="/auth/signup">Sign Up</Link>
      {user && <button onClick={handleSignout}>Sign Out</button>} 

      {user ? <p>Signed in</p> : <p>Not signed in</p>}

      <Routes>
        
        <Route path='/auth/signup' element={<Signup setUser={setUser} />}></Route>
        <Route path='/auth/signin' element={<Signin setUser={setUser} />}></Route>
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;

/* token is now part of useState variable so it can update dynamically.
added logic so that handleSignout clears user and token.
"Sign Out will only show if the user is authenticated" <- From chatGPT*/