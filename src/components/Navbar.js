import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";

import {
  Button,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/Inbox';
import { Drawer } from '@material-ui/core';


const Navbar = () => {
  const history = useHistory();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const routes = [
    {
      label: 'Home',
      path: '/',
    },
    {
      label: 'Contact',
      path: '/contact',
    },
    {
      label: 'About',
      path: '/about'
    },
    {
      label: 'Registration',
      path: '/registration',
    },
    {
      label: 'Login',
      path: '/login',
    }
  ]

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    })
  }, [])

  // Desktop nav bar
  const desktopNav = (
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/registration">Registration</Link>
        </li>
        <li>
          <Button onClick={() => {
            history.push('/login')
          }} className="btn-primary" variant="contained" color="primary">
            Login
          </Button>
        </li>
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

      <Drawer anchor="right" onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen}>
        <List>
          {['Contact', 'About', 'Registration', 'Login'].map((text, index) => (
            <ListItem button key={text} onClick={() => {

            }}>
              <ListItemText className="text" primary={text} />
            </ListItem>
          ))}
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
