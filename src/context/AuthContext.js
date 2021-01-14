import React, { createContext, useState } from 'react';
import { demoProfile } from '../Content';


const authContext = createContext();

const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [profile, setProfile] = useState(demoProfile)

    return <authContext.Provider value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
    }} {...props} />
}

export { AuthProvider, authContext };
