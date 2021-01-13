import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer } from '@material-ui/core';
import { navStyles } from "./NavbarStyles";
import {
  Button,
  IconButton,
  List,
  Divider,
  ListItem,
  ListItemText,
} from "@material-ui/core";


const Navbar = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const history = useHistory();
  const classes = navStyles();

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
        {routes.filter(i => i.path !== '/login').map(i => (
          <li key={i.path}>
            <Link to={i.path}>{i.label}</Link>
          </li>
        ))}

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

      <Drawer classes={classes} anchor="right" onClose={() => setIsDrawerOpen(false)} open={isDrawerOpen}>
        <List>
          {routes.map((i, index) => (
            <ListItem button key={i.label} onClick={() =>  history.push(i.path)}>
              <ListItemText className="text" primary={i.label} />
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
