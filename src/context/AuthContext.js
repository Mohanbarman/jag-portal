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
    let p = localStorage.profile;
    if (p && p !== 'undefined') {
      setProfile(JSON.parse(p));
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [])

  useEffect(() => {
    if (!currentUser?.error) {
      localStorage['profile'] = JSON.stringify(currentUser.data?.currentUser);
      setProfile(currentUser?.data?.currentUser);
    }
    if (currentUser?.error?.message === 'You are not authorized for this action') {
      setIsAuthenticated(false);
      setProfile(undefined);
      localStorage.removeItem('profile');
      logout();
    }
  }, [currentUser])

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
