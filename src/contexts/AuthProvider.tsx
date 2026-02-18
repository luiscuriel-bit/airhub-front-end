import { useEffect, useState, ReactNode } from "react";
import * as authService from '../services/authService';
import AuthedUserContext from "./AuthedUserContext";
import { User } from "../types";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const userData = await authService.refreshAccessToken();
                setUser(userData);
            } catch (error: any) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkSession();
    }, []);

    if (loading) return <div className="h-screen flex items-center justify-center">Cargando...</div>;

    const signup = async (formData: any) => {
        const userData = await authService.signup(formData);
        setUser(userData);
        return userData;
    };

    const signin = async (formData: any) => {
        const userData = await authService.signin(formData);
        setUser(userData);
        return userData;
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
