import { createContext } from 'react';
import { User } from '../types';

interface AuthedUserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    signup: (formData: any) => Promise<User>;
    signin: (formData: any) => Promise<User>;
    signout: () => void;
}

const AuthedUserContext = createContext<AuthedUserContextType>({
    user: null,
    setUser: () => {},
    signup: async () => ({} as User),
    signin: async () => ({} as User),
    signout: () => {},
});

export default AuthedUserContext;
