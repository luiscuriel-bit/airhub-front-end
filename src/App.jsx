import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createContext, useState } from 'react';
import * as authService from './services/authService';
import HomePage from './components/Home/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Shared/Navbar';
import { Signup } from './pages/Signup/Signup';
import { Signin } from './pages/Signin/Signin';

export const AuthedUserContext = createContext(null); // Context for user authentication

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <AuthedUserContext.Provider value={user}>
      <Router>
        <Navbar />
        

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/signin" element={<Signin setUser={setUser} />} />
          <Route path="/auth/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </Router>
    </AuthedUserContext.Provider>
  );
};

export default App;
