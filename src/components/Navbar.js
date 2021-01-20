import React, {useContext, useEffect, useState} from 'react';
import Logo from '../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer } from '@material-ui/core';
import { navStyles } from "./NavbarStyles";
import { authContext } from "../context/AuthContext";
import {
  Button,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import {utilsContext} from "../context/UtilsContext";


const Navbar = ({routes}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {isAuthenticated, setIsAuthenticated, setProfile} = useContext(authContext);
  const { setModalState } = useContext(utilsContext);

  const history = useHistory();
  const classes = navStyles();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, [])

  console.log(routes);

  const _handleLogout = () => {
    setIsAuthenticated(false);
    setProfile(undefined);

    // Display modal
    setModalState({
      isOpen: true,
      severity: 'error',
      content: 'Logged out successfully.'
    })

    // redirect to home page
    history.push('/');
  }

  // Desktop nav bar
  const desktopNav = (
      <ul>
        {routes?.filter(i => i.path !== '/login').map(i => (
            <li key={i.path}>
              <Link to={i.path}>{i.label}</Link>
            </li>
        ))}

        {!isAuthenticated &&
          <li>
            <Button onClick={() => {
              history.push('/login')
            }} className="btn-primary" variant="contained" color="primary">
              Login
            </Button>
          </li>
        }

        {
          isAuthenticated && (
            <Button
              className='btn-primary'
              variant='contained'
              color='primary'
              onClick={_handleLogout}
            >
              Logout
            </Button>
          )
        }
      </ul>
  )

  // Mobile nav bar
  const mobileNav =  (
    <>
      <IconButton onClick={() => {
        setIsDrawerOpen(p => !p);
      }} color="inherit" >
        <MenuIcon/>
      </IconButton>

      <Drawer
        classes={classes}
        anchor="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
      >
        <List>
          {routes?.map((i, index) => (
            <ListItem button key={index} onClick={() =>  history.push(i.path)}>
              <ListItemText className="text" primary={i.label} />
            </ListItem>
          ))}
          {isAuthenticated && (
            <ListItem button onClick={_handleLogout}>
              <ListItemText className="text" primary="Logout"/>
            </ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
    </>
  );

  return(
    <div className="nav-wrapper">
      <div className="logo-wrapper">
        <img src={Logo} alt=""/>
      </div>
      {screenWidth > 1100 ? desktopNav : mobileNav}
    </div>
  )
}

export default Navbar;
