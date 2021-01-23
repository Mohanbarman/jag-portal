import React, {createContext, useEffect, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import {LOGIN, LOGOUT, CURRENT_USER} from "../graphql/profileSchemas";

const authContext = createContext();


const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [profile, setProfile] = useState(undefined)
  const [login] = useMutation(LOGIN);
  const [logout] = useMutation(LOGOUT);
  const currentUser = useQuery(CURRENT_USER);

  useEffect(() => {
    let p = localStorage.getItem("profile");
    if (p) {
      setProfile(JSON.parse(p));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [])

  useEffect(() => {
    if (!currentUser.loading && isAuthenticated) {
      localStorage['profile'] = JSON.stringify(currentUser.data?.currentUser);
      setProfile(currentUser.data?.currentUser);
    }
  }, [currentUser, isAuthenticated])

  return <authContext.Provider value={{
    isAuthenticated,
    setIsAuthenticated,
    profile,
    setProfile,
    login,
    logout,
  }} {...props} />
}

export {AuthProvider, authContext};
