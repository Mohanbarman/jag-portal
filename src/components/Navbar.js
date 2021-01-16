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


const Navbar = ({routes}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const {isAuthenticated} = useContext(authContext);

  const history = useHistory();
  const classes = navStyles();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth);
    });
  }, [])

  console.log(routes);

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
          {routes?.map((i, index) => (
            <ListItem button key={index} onClick={() =>  history.push(i.path)}>
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
