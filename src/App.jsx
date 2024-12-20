import { createContext, useState } from 'react';
import './App.css'
import * as authService from './services/authService';
import { Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup/Signup';
import { Signin } from './pages/Signin/Signin';
import { NewFlight } from './pages/Flights/NewFlight/NewFlight';

export const AuthedUserContext = createContext(null); // Set the initial value of the context to null

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={{ user }}>
      {user && <button onClick={handleSignout}>Sign Out</button>}

      {user ? <p>Signed in</p> : <p>Not signed in</p>}

      <Routes>
        <Route path='/auth/signup' element={<Signup setUser={setUser} />}></Route>
        <Route path='/auth/signin' element={<Signin setUser={setUser} />}></Route>
        <Route path='/flights/new' element={<NewFlight />}></Route>
      </Routes>
    </AuthedUserContext.Provider>
  );
};

export default App;
