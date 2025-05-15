import { useEffect, useState } from "react";
import * as authService from '../services/authService';
import AuthedUserContext from "./AuthedUserContext";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const userData = await authService.refreshAccessToken();
                setUser(userData.user);
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.log('No active session:', error.message);
                }
                setUser(null);
            }
        };
        checkSession();
    }, []);

    const signup = async (formData) => {
        const userData = await authService.signup(formData);
        setUser(userData.user);

        return userData.user;
    };

    const signin = async (formData) => {
        const userData = await authService.signin(formData);
        setUser(userData.user);

        return userData.user;
    };

    const signout = () => {
        authService.signout();
        setUser(null);
    };

    return (
        <AuthedUserContext.Provider value={{ user, setUser, signup, signin, signout }}>
            {children}
        </AuthedUserContext.Provider>
    );
};

export default AuthProvider;