import {useContext} from 'react';
import Navbar from "./Navbar";
import {authContext} from "../context/AuthContext";
import {authenticatedRoutes, unauthenticatedRoutes} from "../Routes";
import Footer from "./Footer";


const NotFound = () => {
  const {isAuthenticated} = useContext(authContext);
  return (
    <>
      <Navbar routes={isAuthenticated ? authenticatedRoutes : unauthenticatedRoutes}/>
      <div className='not-found-container'>
        <h1>404</h1>
        <p>Sorry page not found :(</p>
      </div>
      <Footer/>
    </>
  )
}

export default NotFound;
